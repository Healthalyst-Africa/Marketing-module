/**
 * Request and response contract shared by the enquiry form and the
 * application endpoint that stores an enquiry.
 *
 * The application owns the endpoint, its validation copy and its storage. This
 * module only records the wire shape the shared form sends and understands, so
 * both sides stay in step without the shared package importing application
 * code.
 */

/**
 * Name of the hidden field the shared form leaves empty. Automated submissions
 * that fill it in are accepted without being stored.
 */
export const MARKETING_ENQUIRY_WEBSITE_FIELD_NAME = "website";

/** Outcome reported by the endpoint after a submission attempt. */
export type MarketingEnquirySubmissionStatus =
  /** The enquiry was validated and stored. */
  | "saved"
  /** An identical enquiry was already received within the duplicate window. */
  | "alreadyReceived"
  /** The submitted values were rejected; `fieldErrors` explains each field. */
  | "invalid"
  /** Too many submissions arrived from this address in a short time. */
  | "throttled"
  /** The enquiry could not be stored; the visitor should retry. */
  | "unavailable"
  /** The request body could not be read as a submission. */
  | "malformedRequest";

/** Body returned by the endpoint for every submission attempt. */
export interface MarketingEnquirySubmissionResponse {
  status: MarketingEnquirySubmissionStatus;
  /** Message safe to show to the visitor. */
  message?: string;
  /** Validation messages keyed by form field name. */
  fieldErrors?: Record<string, string>;
}
