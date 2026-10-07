import { createHash } from "node:crypto";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

import type { ContactEnquirySubmission } from "~/types";

/**
 * How long an identical enquiry is treated as a repeat of one already stored.
 * The window is also encoded in `INSERT_CONTACT_ENQUIRY_STATEMENT`.
 */
const DUPLICATE_ENQUIRY_WINDOW_IN_MINUTES = 10;

/** Enquiry kind written by the contact journey; slice 7 adds its own value. */
const CONTACT_ENQUIRY_TYPE = "contact";

/**
 * Backoff before the second and third write attempts. Connections to the
 * database sometimes time out on a slow network path; a short pause is
 * usually enough for the next attempt to complete, and a visitor never sees
 * a failure that was only a hiccup.
 */
const STORAGE_RETRY_DELAYS_IN_MILLISECONDS = [250, 750];

/** One write attempt plus one per recorded retry delay. */
const MAXIMUM_STORAGE_ATTEMPTS =
  STORAGE_RETRY_DELAYS_IN_MILLISECONDS.length + 1;

const INSERT_CONTACT_ENQUIRY_STATEMENT = `
  INSERT INTO contact_enquiries (
    enquiry_type,
    first_name,
    last_name,
    organisation,
    email_address,
    phone_number,
    institution_type,
    product_interest,
    message,
    submission_hash
  )
  SELECT
    $1::text,
    $2::text,
    $3::text,
    $4::text,
    $5::text,
    $6::text,
    $7::text,
    $8::text,
    $9::text,
    $10::text
  WHERE NOT EXISTS (
    SELECT 1
    FROM contact_enquiries
    WHERE submission_hash = $10::text
      AND submitted_at > now() - interval '${DUPLICATE_ENQUIRY_WINDOW_IN_MINUTES} minutes'
  )
  RETURNING enquiry_id
`;

/** Outcome of writing one enquiry. */
export type ContactEnquiryStorageOutcome =
  { outcome: "stored" } | { outcome: "duplicate" };

/**
 * Raised when the enquiry cannot be written. The message is safe to log: it
 * never contains the connection string or the submitted values.
 */
class ContactEnquiryStorageUnavailableError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "ContactEnquiryStorageUnavailableError";
  }
}

/**
 * Whether the failure is the connection never reaching the database rather
 * than the statement itself. The driver reports a connection failure with
 * this message, while statement errors carry their own message and would
 * fail identically on a retry.
 */
function isTransientConnectionFailure(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.message.includes("Error connecting to database") ||
    error.message.includes("fetch failed")
  );
}

function waitInMilliseconds(delayInMilliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
}

function readConnectionString(): string {
  // Read at request time so a redeployed environment never embeds a stale
  // value, and so the secret never reaches a client bundle.
  const connectionString = process.env["DATABASE_URL"]?.trim();

  if (!connectionString) {
    throw new ContactEnquiryStorageUnavailableError(
      "DATABASE_URL is not configured for the server."
    );
  }

  return connectionString;
}

/**
 * Identifies identical content so a double click or a repeated paste is stored
 * once inside the duplicate window, without keeping a second copy of the text.
 */
function createSubmissionHash(submission: ContactEnquirySubmission): string {
  const normalizedContent = [
    submission.firstName,
    submission.lastName,
    submission.organisation,
    submission.email,
    submission.phoneNumber,
    submission.institutionType,
    submission.productInterest,
    submission.message,
  ]
    .map((value) => value.trim().toLowerCase())
    .join("\n");

  return createHash("sha256").update(normalizedContent, "utf8").digest("hex");
}

/**
 * Writes one validated enquiry to Neon and reports whether it was stored.
 *
 * Requires `db/contact-enquiries.sql` to have been applied to the database
 * named in `DATABASE_URL`. Every value is passed as a parameter, so submitted
 * text can never change the statement. A connection that times out is retried
 * twice before the enquiry is reported as unavailable; statement errors are
 * reported immediately because a retry would fail the same way.
 */
export async function storeContactEnquiry(
  submission: ContactEnquirySubmission
): Promise<ContactEnquiryStorageOutcome> {
  const connectionString = readConnectionString();
  const enquiryQueryExecutor: NeonQueryFunction<false, false> =
    neon(connectionString);
  const submissionParameters = [
    CONTACT_ENQUIRY_TYPE,
    submission.firstName,
    submission.lastName,
    submission.organisation,
    submission.email,
    submission.phoneNumber === "" ? null : submission.phoneNumber,
    submission.institutionType,
    submission.productInterest,
    submission.message,
    createSubmissionHash(submission),
  ];

  let lastStorageFailure: unknown = null;

  for (
    let attemptNumber = 1;
    attemptNumber <= MAXIMUM_STORAGE_ATTEMPTS;
    attemptNumber += 1
  ) {
    try {
      const insertedRows = await enquiryQueryExecutor.query(
        INSERT_CONTACT_ENQUIRY_STATEMENT,
        submissionParameters
      );

      return insertedRows.length > 0
        ? { outcome: "stored" }
        : { outcome: "duplicate" };
    } catch (error: unknown) {
      lastStorageFailure = error;

      if (
        attemptNumber >= MAXIMUM_STORAGE_ATTEMPTS ||
        !isTransientConnectionFailure(error)
      ) {
        break;
      }

      console.warn(
        `Contact enquiry write could not reach the database (attempt ${attemptNumber} of ${MAXIMUM_STORAGE_ATTEMPTS}); retrying.`
      );

      await waitInMilliseconds(
        STORAGE_RETRY_DELAYS_IN_MILLISECONDS[attemptNumber - 1]
      );
    }
  }

  throw new ContactEnquiryStorageUnavailableError(
    lastStorageFailure instanceof Error
      ? lastStorageFailure.message
      : "Unknown storage failure."
  );
}
