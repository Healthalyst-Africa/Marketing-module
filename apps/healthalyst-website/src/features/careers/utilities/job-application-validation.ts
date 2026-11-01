import { createJobApplicationFields } from "~/features/careers/config/job-application-fields";
import type { JobOpening } from "~/features/careers/types/job-opening";
import type {
  JobApplicationFieldName,
  JobApplicationSubmission,
} from "~/features/careers/types/job-application";

/** Deliberately permissive address check; the value is only replied to. */
const EMAIL_ADDRESS_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Result of checking a submission against the role's application fields. */
export type JobApplicationValidationResult =
  | { outcome: "accepted"; submission: JobApplicationSubmission }
  | { outcome: "rejected"; fieldErrors: Record<string, string> };

/** Whether the value is a web address a reviewer can safely open. */
function isWebAddress(value: string): boolean {
  try {
    const address = new URL(value);

    return address.protocol === "https:" || address.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Validates and normalises the values posted for one role's application.
 *
 * Unknown keys are ignored, values are trimmed, links must be web addresses,
 * and every message is written for the applicant. The endpoint calls this
 * after its abuse checks, so a rejected application never touches storage.
 */
export function validateJobApplicationSubmission(
  jobOpening: JobOpening,
  submittedValues: Record<string, string>
): JobApplicationValidationResult {
  const fieldErrors: Record<string, string> = {};
  const normalizedValues = new Map<JobApplicationFieldName, string>();

  for (const field of createJobApplicationFields(jobOpening)) {
    const submittedValue = (submittedValues[field.name] ?? "").trim();

    normalizedValues.set(field.name, submittedValue);

    if (field.required && submittedValue === "") {
      fieldErrors[field.name] =
        field.requiredMessage ?? `${field.label} is required.`;
      continue;
    }

    if (submittedValue.length > field.maxLength) {
      fieldErrors[field.name] =
        `${field.label} must be ${field.maxLength} characters or fewer.`;
      continue;
    }

    if (
      field.kind === "email" &&
      submittedValue !== "" &&
      !EMAIL_ADDRESS_PATTERN.test(submittedValue)
    ) {
      fieldErrors[field.name] =
        field.formatMessage ?? "Enter a valid email address.";
      continue;
    }

    if (
      field.kind === "url" &&
      submittedValue !== "" &&
      !isWebAddress(submittedValue)
    ) {
      fieldErrors[field.name] =
        field.formatMessage ?? "Enter a full web address.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { outcome: "rejected", fieldErrors };
  }

  const valueOf = (fieldName: JobApplicationFieldName) =>
    normalizedValues.get(fieldName) ?? "";

  return {
    outcome: "accepted",
    submission: {
      roleSlug: jobOpening.slug,
      roleTitle: jobOpening.title,
      firstName: valueOf("firstName"),
      lastName: valueOf("lastName"),
      email: valueOf("email"),
      phoneNumber: valueOf("phoneNumber"),
      location: valueOf("location"),
      cvAddress: valueOf("cvAddress"),
      portfolioAddress: valueOf("portfolioAddress"),
      linkedInAddress: valueOf("linkedInAddress"),
      coverNote: valueOf("coverNote"),
    },
  };
}
