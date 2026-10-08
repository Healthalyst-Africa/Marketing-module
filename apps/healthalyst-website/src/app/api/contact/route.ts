import {
  MARKETING_ENQUIRY_WEBSITE_FIELD_NAME,
  type MarketingEnquirySubmissionResponse,
} from "@healthalyst/ui/lib/marketing-enquiry";

import { sendContactEnquiryAcknowledgement } from "~/lib/contact-enquiry-acknowledgement";
import {
  storeContactEnquiry,
  type ContactEnquiryStorageOutcome,
} from "~/lib/contact-enquiry-storage";
import {
  hasExceededContactEnquiryLimit,
  recordContactEnquiryAttempt,
} from "~/lib/contact-enquiry-throttle";
import { validateContactEnquirySubmission } from "~/lib/contact-enquiry-validation";

/**
 * Stores contact enquiries from the marketing form in Neon, then sends a
 * receipt through Resend. Database and email credentials stay on the server.
 */

export const runtime = "nodejs";

const THROTTLE_WAIT_IN_SECONDS = 600;

const THROTTLE_MESSAGE =
  "This form has received several messages from your connection. Please wait a few minutes and try again.";

const STORAGE_FAILURE_MESSAGE =
  "Your enquiry could not be stored right now. Please try again in a few minutes.";

const ACKNOWLEDGEMENT_FAILURE_MESSAGE =
  "Your enquiry was received, but we could not send a confirmation email. Our team aims to respond within two business days.";

const MALFORMED_REQUEST_MESSAGE =
  "The submitted enquiry could not be read. Please reload the page and try again.";

const INVALID_SUBMISSION_MESSAGE =
  "Check the highlighted fields and send the enquiry again.";

function createSubmissionResponse(
  submissionResponse: MarketingEnquirySubmissionResponse,
  statusCode: number,
  headers?: Record<string, string>
): Response {
  return Response.json(submissionResponse, { status: statusCode, headers });
}

/** First forwarded address, or a shared local label when there is no proxy. */
function readClientAddress(request: Request): string {
  const forwardedAddresses = request.headers.get("x-forwarded-for");

  if (forwardedAddresses) {
    const firstForwardedAddress = forwardedAddresses.split(",")[0];

    if (firstForwardedAddress) {
      return firstForwardedAddress.trim();
    }
  }

  const directClientAddress = request.headers.get("x-real-ip");

  return directClientAddress?.trim() || "local-connection";
}

/**
 * Reads a submission from either a JSON body (the normal browser path) or a
 * posted form (the same journey without scripts). Anything that is not a flat
 * record of text values is reported as unreadable.
 */
async function readSubmittedValues(
  request: Request
): Promise<Record<string, string> | null> {
  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const submittedData = await request.formData();
      const submittedValues: Record<string, string> = {};

      for (const [fieldName, submittedValue] of submittedData.entries()) {
        if (typeof submittedValue === "string") {
          submittedValues[fieldName] = submittedValue;
        }
      }

      return submittedValues;
    }

    const parsedBody: unknown = await request.json();

    if (typeof parsedBody !== "object" || parsedBody === null) {
      return null;
    }

    if (Array.isArray(parsedBody)) {
      return null;
    }

    const bodyRecord = parsedBody as Record<string, unknown>;
    const submittedValues: Record<string, string> = {};

    for (const [fieldName, submittedValue] of Object.entries(bodyRecord)) {
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

  if (hasExceededContactEnquiryLimit(clientAddress)) {
    return createSubmissionResponse(
      { status: "throttled", message: THROTTLE_MESSAGE },
      429,
      { "Retry-After": String(THROTTLE_WAIT_IN_SECONDS) }
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

  recordContactEnquiryAttempt(clientAddress);

  const validationResult = validateContactEnquirySubmission(submittedValues);

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

  let storageOutcome: ContactEnquiryStorageOutcome;

  try {
    storageOutcome = await storeContactEnquiry(validationResult.submission);
  } catch (error) {
    console.error(
      "Contact enquiry storage failed:",
      error instanceof Error ? error.message : "unknown error"
    );

    return createSubmissionResponse(
      { status: "unavailable", message: STORAGE_FAILURE_MESSAGE },
      503
    );
  }

  if (storageOutcome.outcome === "duplicate") {
    return createSubmissionResponse({ status: "alreadyReceived" }, 200);
  }

  const acknowledgementOutcome = await sendContactEnquiryAcknowledgement(
    validationResult.submission
  );

  return acknowledgementOutcome.outcome === "unavailable"
    ? createSubmissionResponse(
        { status: "saved", message: ACKNOWLEDGEMENT_FAILURE_MESSAGE },
        201
      )
    : createSubmissionResponse({ status: "saved" }, 201);
}
