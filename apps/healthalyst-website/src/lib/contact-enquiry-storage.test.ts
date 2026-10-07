import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { storeContactEnquiry } from "~/lib/contact-enquiry-storage";
import type { ContactEnquirySubmission } from "~/types";

const { enquiryQueryExecutorMock } = vi.hoisted(() => ({
  enquiryQueryExecutorMock: vi.fn(),
}));

vi.mock("@neondatabase/serverless", () => ({
  neon: () => ({ query: enquiryQueryExecutorMock }),
}));

function createSubmission(): ContactEnquirySubmission {
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

function createConnectionFailure(): Error {
  return new Error("Error connecting to database: TypeError: fetch failed");
}

describe("contact enquiry storage", () => {
  const originalConnectionString = process.env["DATABASE_URL"];

  beforeEach(() => {
    process.env["DATABASE_URL"] = "postgresql://user:password@localhost/test";
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    if (originalConnectionString === undefined) {
      delete process.env["DATABASE_URL"];
    } else {
      process.env["DATABASE_URL"] = originalConnectionString;
    }
  });

  it("retries a connection failure and stores the enquiry", async () => {
    enquiryQueryExecutorMock
      .mockRejectedValueOnce(createConnectionFailure())
      .mockRejectedValueOnce(createConnectionFailure())
      .mockResolvedValueOnce([{ enquiry_id: "stored-enquiry" }]);

    const outcome = await storeContactEnquiry(createSubmission());

    expect(outcome).toEqual({ outcome: "stored" });
    expect(enquiryQueryExecutorMock).toHaveBeenCalledTimes(3);
    expect(console.warn).toHaveBeenCalledTimes(2);
  });

  it("reports the enquiry as unavailable once the attempts are used", async () => {
    enquiryQueryExecutorMock.mockRejectedValue(createConnectionFailure());

    await expect(storeContactEnquiry(createSubmission())).rejects.toMatchObject(
      {
        name: "ContactEnquiryStorageUnavailableError",
        message: "Error connecting to database: TypeError: fetch failed",
      }
    );
    expect(enquiryQueryExecutorMock).toHaveBeenCalledTimes(3);
  });

  it("does not retry a statement error", async () => {
    enquiryQueryExecutorMock.mockRejectedValue(
      new Error('column "id" does not exist')
    );

    await expect(storeContactEnquiry(createSubmission())).rejects.toMatchObject(
      {
        name: "ContactEnquiryStorageUnavailableError",
        message: 'column "id" does not exist',
      }
    );
    expect(enquiryQueryExecutorMock).toHaveBeenCalledTimes(1);
    expect(console.warn).not.toHaveBeenCalled();
  });
});
