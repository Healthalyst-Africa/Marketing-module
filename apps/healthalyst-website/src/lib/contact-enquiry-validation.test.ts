import { describe, expect, it } from "vitest";

import { validateContactEnquirySubmission } from "~/lib/contact-enquiry-validation";
import type { ContactEnquirySubmission } from "~/types";

function createSubmittedValues(): Record<string, string> {
  return {
    firstName: "Adaeze",
    lastName: "Okonkwo",
    organisation: "Mercy Hospital",
    email: "adaeze@example.com",
    phoneNumber: "+234 801 234 5678",
    institutionType: "Hospital or Clinic",
    productInterest: "HealthSchedule: Scheduling & Patient Flow",
    message: "We would like to discuss scheduling for our facilities.",
  };
}

function readSubmission(
  submittedValues: Record<string, string>
): ContactEnquirySubmission {
  const validationResult = validateContactEnquirySubmission(submittedValues);

  if (validationResult.outcome !== "accepted") {
    throw new Error("Expected the submitted values to be accepted.");
  }

  return validationResult.submission;
}

describe("validateContactEnquirySubmission", () => {
  it("accepts a complete enquiry and trims every value", () => {
    const submission = readSubmission({
      ...createSubmittedValues(),
      firstName: "  Adaeze  ",
      message: "  We would like to discuss scheduling for our facilities.  ",
    });

    expect(submission.firstName).toBe("Adaeze");
    expect(submission.message).toBe(
      "We would like to discuss scheduling for our facilities."
    );
  });

  it("accepts an enquiry without the optional phone number", () => {
    const submission = readSubmission({
      ...createSubmittedValues(),
      phoneNumber: "",
    });

    expect(submission.phoneNumber).toBe("");
  });

  it("rejects an enquiry that is missing required values", () => {
    const validationResult = validateContactEnquirySubmission({
      ...createSubmittedValues(),
      firstName: "",
      organisation: "   ",
      institutionType: "",
      message: "",
    });

    expect(validationResult.outcome).toBe("rejected");

    if (validationResult.outcome !== "rejected") {
      return;
    }

    expect(validationResult.fieldErrors.firstName).toBe(
      "First Name is required."
    );
    expect(validationResult.fieldErrors.organisation).toBe(
      "Organisation / Institution Name is required."
    );
    expect(validationResult.fieldErrors.message).toBe("Message is required.");
    expect(validationResult.fieldErrors.institutionType).toBe(
      "Select the option that best describes your institution."
    );
    expect(validationResult.fieldErrors.email).toBeUndefined();
  });

  it("rejects an email address that is not an address", () => {
    const validationResult = validateContactEnquirySubmission({
      ...createSubmittedValues(),
      email: "adaeze@example",
    });

    expect(validationResult).toEqual({
      outcome: "rejected",
      fieldErrors: { email: "Enter a valid email address." },
    });
  });

  it("rejects a message longer than the field limit", () => {
    const validationResult = validateContactEnquirySubmission({
      ...createSubmittedValues(),
      message: "a".repeat(5001),
    });

    expect(validationResult).toEqual({
      outcome: "rejected",
      fieldErrors: { message: "Message must be 5000 characters or fewer." },
    });
  });

  it("rejects a choice that the form does not offer", () => {
    const validationResult = validateContactEnquirySubmission({
      ...createSubmittedValues(),
      productInterest: "Something else entirely",
    });

    expect(validationResult).toEqual({
      outcome: "rejected",
      fieldErrors: { productInterest: "Choose one of the listed options." },
    });
  });

  it("ignores values for fields the enquiry does not collect", () => {
    const submission = readSubmission({
      ...createSubmittedValues(),
      patientRecord: "should never be stored",
    });

    expect(submission).not.toHaveProperty("patientRecord");
  });
});
