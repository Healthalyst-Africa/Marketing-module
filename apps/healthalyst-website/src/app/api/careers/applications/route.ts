import {
  MARKETING_ENQUIRY_WEBSITE_FIELD_NAME,
  type MarketingEnquirySubmissionResponse,
} from "@healthalyst/ui/forms/marketing-enquiry";

import { findJobOpening } from "~/features/careers/config/job-openings";
import { sendJobApplicationAcknowledgement } from "~/features/careers/services/job-application-acknowledgement";
import { storeJobApplication } from "~/features/careers/services/job-application-storage";
import {
  hasExceededJobApplicationLimit,
  recordJobApplicationAttempt,
} from "~/features/careers/utilities/job-application-throttle";
import { validateJobApplicationSubmission } from "~/features/careers/utilities/job-application-validation";
import { readClientAddress } from "~/shared/requests/utilities/read-client-address";

/**
 * Stores a job application from a role page in Neon, then sends the applicant
 * a receipt through Resend. The role comes from the `role` query value, such
 * as `/api/careers/applications?role=product-designer`, and must be open.
 */

export const runtime = "nodejs";

const THROTTLE_WAIT_IN_SECONDS = 600;

const THROTTLE_MESSAGE =
  "We have received several applications from your connection. Please wait a few minutes and try again.";

const UNKNOWN_ROLE_MESSAGE =
  "This role is no longer open. Please return to the careers page.";

const STORAGE_FAILURE_MESSAGE =
  "Your application could not be saved right now. Please try again in a few minutes.";

const ACKNOWLEDGEMENT_FAILURE_MESSAGE =
  "Your application was received, but we could not send a confirmation email.";

const MALFORMED_REQUEST_MESSAGE =
  "The application could not be read. Please reload the page and try again.";

const INVALID_SUBMISSION_MESSAGE =
  "Check the highlighted fields and send the application again.";

function createSubmissionResponse(
  submissionResponse: MarketingEnquirySubmissionResponse,
  statusCode: number,
  headers?: Record<string, string>
): Response {
  return Response.json(submissionResponse, { status: statusCode, headers });
}

/** A flat record of text values from the JSON body, or null when unreadable. */
async function readSubmittedValues(
  request: Request
): Promise<Record<string, string> | null> {
  try {
    const parsedBody: unknown = await request.json();

    if (
      typeof parsedBody !== "object" ||
      parsedBody === null ||
      Array.isArray(parsedBody)
    ) {
      return null;
    }

    const submittedValues: Record<string, string> = {};

    for (const [fieldName, submittedValue] of Object.entries(parsedBody)) {
      if (typeof submittedValue !== "string") {
        return null;
      }

      submittedValues[fieldName] = submittedValue;
    }

    return submittedValues;
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<Response> {
  const clientAddress = readClientAddress(request);

  if (hasExceededJobApplicationLimit(clientAddress)) {
    return createSubmissionResponse(
      { status: "throttled", message: THROTTLE_MESSAGE },
      429,
      { "Retry-After": String(THROTTLE_WAIT_IN_SECONDS) }
    );
  }

  const jobOpening = findJobOpening(
    new URL(request.url).searchParams.get("role") ?? ""
  );

  if (!jobOpening) {
    return createSubmissionResponse(
      { status: "invalid", message: UNKNOWN_ROLE_MESSAGE },
      404
    );
  }

  const submittedValues = await readSubmittedValues(request);

  if (!submittedValues) {
    return createSubmissionResponse(
      { status: "malformedRequest", message: MALFORMED_REQUEST_MESSAGE },
      400
    );
  }

  // A filled hidden field is an automated submission. Acknowledge it so the
  // attempt is not revealed, and store nothing.
  if (
    (submittedValues[MARKETING_ENQUIRY_WEBSITE_FIELD_NAME] ?? "").trim() !== ""
  ) {
    return createSubmissionResponse({ status: "saved" }, 201);
  }

  recordJobApplicationAttempt(clientAddress);

  const validationResult = validateJobApplicationSubmission(
    jobOpening,
    submittedValues
  );

  if (validationResult.outcome === "rejected") {
    return createSubmissionResponse(
      {
        status: "invalid",
        message: INVALID_SUBMISSION_MESSAGE,
        fieldErrors: validationResult.fieldErrors,
      },
      400
    );
  }

  try {
    const storageOutcome = await storeJobApplication(
      validationResult.submission
    );

    if (storageOutcome.outcome === "duplicate") {
      return createSubmissionResponse({ status: "alreadyReceived" }, 200);
    }
  } catch (error) {
    console.error(
      "Job application storage failed:",
      error instanceof Error ? error.message : "unknown error"
    );

    return createSubmissionResponse(
      { status: "unavailable", message: STORAGE_FAILURE_MESSAGE },
      503
    );
  }

  const acknowledgementOutcome = await sendJobApplicationAcknowledgement(
    validationResult.submission
  );

  return acknowledgementOutcome.outcome === "unavailable"
    ? createSubmissionResponse(
        { status: "saved", message: ACKNOWLEDGEMENT_FAILURE_MESSAGE },
        201
      )
    : createSubmissionResponse({ status: "saved" }, 201);
}
