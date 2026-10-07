import { CONTACT_ENQUIRY_FIELDS } from "~/data/contact-enquiry-fields";
import type {
  ContactEnquiryFieldName,
  ContactEnquirySubmission,
} from "~/types";

/** Deliberately permissive address check; the value is never used to send mail. */
const EMAIL_ADDRESS_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Result of checking a submission against the enquiry field definitions. */
export type ContactEnquiryValidationResult =
  | { outcome: "accepted"; submission: ContactEnquirySubmission }
  | { outcome: "rejected"; fieldErrors: Record<string, string> };

/**
 * Validates and normalises the values posted to the enquiry endpoint.
 *
 * Unknown keys are ignored, values are trimmed, and every message is written
 * for the visitor rather than for an operator. The endpoint calls this after it
 * has handled abuse checks, so a rejected submission never touches storage.
 */
export function validateContactEnquirySubmission(
  submittedValues: Record<string, string>
): ContactEnquiryValidationResult {
  const fieldErrors: Record<string, string> = {};
  const normalizedValues = new Map<ContactEnquiryFieldName, string>();

  for (const field of CONTACT_ENQUIRY_FIELDS) {
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
      field.type === "email" &&
      submittedValue !== "" &&
      !EMAIL_ADDRESS_PATTERN.test(submittedValue)
    ) {
      fieldErrors[field.name] = "Enter a valid email address.";
      continue;
    }

    if (
      field.options &&
      submittedValue !== "" &&
      !field.options.includes(submittedValue)
    ) {
      fieldErrors[field.name] = "Choose one of the listed options.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { outcome: "rejected", fieldErrors };
  }

  return {
    outcome: "accepted",
    submission: {
      firstName: normalizedValues.get("firstName") ?? "",
      lastName: normalizedValues.get("lastName") ?? "",
      organisation: normalizedValues.get("organisation") ?? "",
      email: normalizedValues.get("email") ?? "",
      phoneNumber: normalizedValues.get("phoneNumber") ?? "",
      institutionType: normalizedValues.get("institutionType") ?? "",
      productInterest: normalizedValues.get("productInterest") ?? "",
      message: normalizedValues.get("message") ?? "",
    },
  };
}
