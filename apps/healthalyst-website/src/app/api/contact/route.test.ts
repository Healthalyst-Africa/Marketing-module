import type { MarketingEnquirySubmissionResponse } from "@healthalyst/ui/lib/marketing-enquiry";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "~/app/api/contact/route";
import { sendContactEnquiryAcknowledgement } from "~/lib/contact-enquiry-acknowledgement";
import { storeContactEnquiry } from "~/lib/contact-enquiry-storage";
import {
  clearContactEnquiryAttempts,
  recordContactEnquiryAttempt,
} from "~/lib/contact-enquiry-throttle";

vi.mock("~/lib/contact-enquiry-storage", () => ({
  storeContactEnquiry: vi.fn(),
}));

vi.mock("~/lib/contact-enquiry-acknowledgement", () => ({
  sendContactEnquiryAcknowledgement: vi.fn(),
}));

const REQUEST_ADDRESS = "198.51.100.42";

function createSubmittedValues(): Record<string, string> {
  return {
    firstName: "Adaeze",
    lastName: "Okonkwo",
    organisation: "Mercy Hospital",
    email: "adaeze@example.com",
    phoneNumber: "",
    institutionType: "Hospital or Clinic",
    productInterest: "HealthSchedule: Scheduling & Patient Flow",
    message: "We would like to discuss scheduling for our facilities.",
  };
}

function createSubmissionRequest(
  body: string,
  clientAddress = REQUEST_ADDRESS
): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": clientAddress,
    },
    body,
  });
}

async function readSubmissionResponse(
  response: Response
): Promise<MarketingEnquirySubmissionResponse> {
  return (await response.json()) as MarketingEnquirySubmissionResponse;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    clearContactEnquiryAttempts();
    vi.mocked(storeContactEnquiry).mockReset();
    vi.mocked(storeContactEnquiry).mockResolvedValue({ outcome: "stored" });
    vi.mocked(sendContactEnquiryAcknowledgement).mockReset();
    vi.mocked(sendContactEnquiryAcknowledgement).mockResolvedValue({
      outcome: "sent",
    });
  });

  it("stores a valid enquiry and reports it as saved", async () => {
    const response = await POST(
      createSubmissionRequest(JSON.stringify(createSubmittedValues()))
    );

    expect(response.status).toBe(201);
    expect(await readSubmissionResponse(response)).toEqual({
      status: "saved",
    });
    expect(storeContactEnquiry).toHaveBeenCalledTimes(1);
    expect(vi.mocked(storeContactEnquiry).mock.calls[0]?.[0]).toEqual({
      firstName: "Adaeze",
      lastName: "Okonkwo",
      organisation: "Mercy Hospital",
      email: "adaeze@example.com",
      phoneNumber: "",
      institutionType: "Hospital or Clinic",
      productInterest: "HealthSchedule: Scheduling & Patient Flow",
      message: "We would like to discuss scheduling for our facilities.",
    });
    expect(sendContactEnquiryAcknowledgement).toHaveBeenCalledWith(
      createSubmittedValues()
    );
  });

  it("keeps a stored enquiry when its acknowledgement cannot be sent", async () => {
    vi.mocked(sendContactEnquiryAcknowledgement).mockResolvedValue({
      outcome: "unavailable",
    });

    const response = await POST(
      createSubmissionRequest(JSON.stringify(createSubmittedValues()))
    );

    expect(response.status).toBe(201);
    expect(await readSubmissionResponse(response)).toEqual({
      status: "saved",
      message:
        "Your enquiry was received, but we could not send a confirmation email. Our team aims to respond within two business days.",
    });
    expect(storeContactEnquiry).toHaveBeenCalledTimes(1);
    expect(sendContactEnquiryAcknowledgement).toHaveBeenCalledTimes(1);
  });

  it("reports an enquiry that is already stored as received", async () => {
    vi.mocked(storeContactEnquiry).mockResolvedValue({ outcome: "duplicate" });

    const response = await POST(
      createSubmissionRequest(JSON.stringify(createSubmittedValues()))
    );

    expect(response.status).toBe(200);
    expect(await readSubmissionResponse(response)).toEqual({
      status: "alreadyReceived",
    });
    expect(sendContactEnquiryAcknowledgement).not.toHaveBeenCalled();
  });

  it("explains every rejected field without storing anything", async () => {
    const response = await POST(
      createSubmissionRequest(
        JSON.stringify({ ...createSubmittedValues(), email: "not-an-email" })
      )
    );

    expect(response.status).toBe(400);

    const submissionResponse = await readSubmissionResponse(response);

    expect(submissionResponse.status).toBe("invalid");
    expect(submissionResponse.fieldErrors).toEqual({
      email: "Enter a valid email address.",
    });
    expect(storeContactEnquiry).not.toHaveBeenCalled();
  });

  it("acknowledges a filled hidden field without storing anything", async () => {
    const response = await POST(
      createSubmissionRequest(
        JSON.stringify({
          ...createSubmittedValues(),
          website: "https://spam.example",
        })
      )
    );

    expect(response.status).toBe(201);
    expect(await readSubmissionResponse(response)).toEqual({
      status: "saved",
    });
    expect(storeContactEnquiry).not.toHaveBeenCalled();
  });

  it("reports an unreadable request body", async () => {
    const response = await POST(createSubmissionRequest("not json at all"));

    expect(response.status).toBe(400);

    const submissionResponse = await readSubmissionResponse(response);

    expect(submissionResponse.status).toBe("malformedRequest");
    expect(submissionResponse.message).toBeTruthy();
    expect(storeContactEnquiry).not.toHaveBeenCalled();
  });

  it("throttles a client address that used its allowance", async () => {
    for (let attemptNumber = 0; attemptNumber < 5; attemptNumber += 1) {
      recordContactEnquiryAttempt(REQUEST_ADDRESS);
    }

    const response = await POST(
      createSubmissionRequest(JSON.stringify(createSubmittedValues()))
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("600");
    expect((await readSubmissionResponse(response)).status).toBe("throttled");
    expect(storeContactEnquiry).not.toHaveBeenCalled();
  });

  it("reports storage failures as a retryable failure", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    vi.mocked(storeContactEnquiry).mockRejectedValue(
      new Error("connection lost")
    );

    const response = await POST(
      createSubmissionRequest(JSON.stringify(createSubmittedValues()))
    );

    expect(response.status).toBe(503);

    const submissionResponse = await readSubmissionResponse(response);

    expect(submissionResponse.status).toBe("unavailable");
    expect(submissionResponse.message).toBeTruthy();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("accepts the same enquiry posted as a plain form", async () => {
    const submittedValues = createSubmittedValues();
    const formData = new FormData();

    for (const [fieldName, submittedValue] of Object.entries(submittedValues)) {
      formData.append(fieldName, submittedValue);
    }

    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "x-forwarded-for": REQUEST_ADDRESS },
        body: formData,
      })
    );

    expect(response.status).toBe(201);
    expect(await readSubmissionResponse(response)).toEqual({
      status: "saved",
    });
    expect(storeContactEnquiry).toHaveBeenCalledTimes(1);
    expect(sendContactEnquiryAcknowledgement).toHaveBeenCalledTimes(1);
  });
});
