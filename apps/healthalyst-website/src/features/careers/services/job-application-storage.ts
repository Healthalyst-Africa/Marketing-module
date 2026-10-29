import { createHash } from "node:crypto";

import { neon } from "@neondatabase/serverless";

import type { JobApplicationSubmission } from "~/features/careers/types/job-application";

/**
 * How long an identical application is treated as a repeat of one already
 * stored. The window is also encoded in `INSERT_JOB_APPLICATION_STATEMENT`.
 */
const DUPLICATE_APPLICATION_WINDOW_IN_MINUTES = 10;

/** Backoff before the second and third write attempts on a slow network. */
const STORAGE_RETRY_DELAYS_IN_MILLISECONDS = [250, 750];

const MAXIMUM_STORAGE_ATTEMPTS =
  STORAGE_RETRY_DELAYS_IN_MILLISECONDS.length + 1;

const INSERT_JOB_APPLICATION_STATEMENT = `
  INSERT INTO job_applications (
    role_slug,
    role_title,
    first_name,
    last_name,
    email_address,
    phone_number,
    location,
    cv_address,
    portfolio_address,
    linkedin_address,
    cover_note,
    submission_hash
  )
  SELECT
    $1::text, $2::text, $3::text, $4::text, $5::text, $6::text,
    $7::text, $8::text, $9::text, $10::text, $11::text, $12::text
  WHERE NOT EXISTS (
    SELECT 1
    FROM job_applications
    WHERE submission_hash = $12::text
      AND submitted_at > now() - interval '${DUPLICATE_APPLICATION_WINDOW_IN_MINUTES} minutes'
  )
  RETURNING application_id
`;

/** Outcome of writing one application. */
export type JobApplicationStorageOutcome =
  { outcome: "stored" } | { outcome: "duplicate" };

/**
 * Raised when the application cannot be written. The message is safe to log:
 * it never contains the connection string or the submitted values.
 */
class JobApplicationStorageUnavailableError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = "JobApplicationStorageUnavailableError";
  }
}

/** Whether the connection never reached the database, so a retry may work. */
function isTransientConnectionFailure(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes("Error connecting to database") ||
      error.message.includes("fetch failed"))
  );
}

function waitInMilliseconds(delayInMilliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
}

/** Identifies identical content so a double click is stored once. */
function createSubmissionHash(submission: JobApplicationSubmission): string {
  const normalizedContent = Object.values(submission)
    .map((value) => value.trim().toLowerCase())
    .join("\n");

  return createHash("sha256").update(normalizedContent, "utf8").digest("hex");
}

/**
 * Writes one validated application to Neon and reports whether it was
 * stored. Requires `db/job-applications.sql` to have been applied to the
 * database named in `DATABASE_URL`. Every value is passed as a parameter, so
 * submitted text can never change the statement. A connection that times out
 * is retried twice; statement errors are reported immediately.
 */
export async function storeJobApplication(
  submission: JobApplicationSubmission
): Promise<JobApplicationStorageOutcome> {
  // Read at request time so the secret never reaches a client bundle.
  const connectionString = process.env["DATABASE_URL"]?.trim();

  if (!connectionString) {
    throw new JobApplicationStorageUnavailableError(
      "DATABASE_URL is not configured for the server."
    );
  }

  const applicationQueryExecutor = neon(connectionString);
  const submissionParameters = [
    submission.roleSlug,
    submission.roleTitle,
    submission.firstName,
    submission.lastName,
    submission.email,
    submission.phoneNumber === "" ? null : submission.phoneNumber,
    submission.location,
    submission.cvAddress,
    submission.portfolioAddress === "" ? null : submission.portfolioAddress,
    submission.linkedInAddress === "" ? null : submission.linkedInAddress,
    submission.coverNote,
    createSubmissionHash(submission),
  ];

  let lastStorageFailure: unknown = null;

  for (
    let attemptNumber = 1;
    attemptNumber <= MAXIMUM_STORAGE_ATTEMPTS;
    attemptNumber += 1
  ) {
    try {
      const insertedRows = await applicationQueryExecutor.query(
        INSERT_JOB_APPLICATION_STATEMENT,
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
        `Job application write could not reach the database (attempt ${attemptNumber} of ${MAXIMUM_STORAGE_ATTEMPTS}); retrying.`
      );

      await waitInMilliseconds(
        STORAGE_RETRY_DELAYS_IN_MILLISECONDS[attemptNumber - 1]
      );
    }
  }

  throw new JobApplicationStorageUnavailableError(
    lastStorageFailure instanceof Error
      ? lastStorageFailure.message
      : "Unknown storage failure."
  );
}
