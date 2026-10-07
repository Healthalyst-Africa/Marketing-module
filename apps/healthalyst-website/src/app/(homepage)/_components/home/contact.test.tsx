import "@healthalyst/test-utilities/setup";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Contact from "~/app/(homepage)/_components/home/contact";

interface RecordedFetchCall {
  endpoint: string;
  requestInit: RequestInit;
}

function readRecordedFetchCall(
  fetchMock: ReturnType<typeof vi.fn>
): RecordedFetchCall {
  const firstCall = fetchMock.mock.calls[0] as
    [string, RequestInit] | undefined;

  if (!firstCall) {
    throw new Error("Expected the form to submit a request.");
  }

  return { endpoint: firstCall[0], requestInit: firstCall[1] };
}

function readSubmittedValues(
  fetchMock: ReturnType<typeof vi.fn>
): Record<string, string> {
  const { requestInit } = readRecordedFetchCall(fetchMock);

  return JSON.parse(String(requestInit.body)) as Record<string, string>;
}

async function completeEnquiryForm(
  user: ReturnType<typeof userEvent.setup>
): Promise<void> {
  await user.type(screen.getByLabelText("First Name"), "Adaeze");
  await user.type(screen.getByLabelText("Last Name"), "Okonkwo");
  await user.type(
    screen.getByLabelText("Organisation / Institution Name"),
    "Mercy Hospital"
  );
  await user.type(screen.getByLabelText("Email Address"), "adaeze@example.com");
  await user.selectOptions(
    screen.getByLabelText("I represent a…"),
    "Hospital or Clinic"
  );
  await user.selectOptions(
    screen.getByLabelText("Product of interest…"),
    "HealthSchedule: Scheduling & Patient Flow"
  );
  await user.type(
    screen.getByLabelText("Message"),
    "We would like to discuss scheduling for our facilities."
  );
}

describe("contact enquiry form", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("posts the completed enquiry and confirms it was received", async () => {
    fetchMock.mockResolvedValue(
      Response.json({ status: "saved" }, { status: 201 })
    );
    const user = userEvent.setup();

    render(<Contact />);
    await completeEnquiryForm(user);
    await user.click(screen.getByRole("button", { name: /Send Message/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const { endpoint, requestInit } = readRecordedFetchCall(fetchMock);

    expect(endpoint).toBe("/api/contact");
    expect(requestInit.method).toBe("POST");
    expect(readSubmittedValues(fetchMock)).toMatchObject({
      firstName: "Adaeze",
      lastName: "Okonkwo",
      organisation: "Mercy Hospital",
      email: "adaeze@example.com",
      institutionType: "Hospital or Clinic",
      productInterest: "HealthSchedule: Scheduling & Patient Flow",
      message: "We would like to discuss scheduling for our facilities.",
    });
    expect(readSubmittedValues(fetchMock).website).toBe("");

    const confirmation = await screen.findByRole("status");

    expect(confirmation).toHaveTextContent(
      "Thank you. Your enquiry has been received."
    );
    expect(confirmation).toHaveFocus();
    expect(screen.getByLabelText("First Name")).toHaveValue("");
  });

  it("shows the message for each rejected field and keeps the enquiry", async () => {
    fetchMock.mockResolvedValue(
      Response.json(
        {
          status: "invalid",
          message: "Check the highlighted fields and send the enquiry again.",
          fieldErrors: {
            message: "Message must be 5000 characters or fewer.",
          },
        },
        { status: 400 }
      )
    );
    const user = userEvent.setup();

    render(<Contact />);
    await completeEnquiryForm(user);
    await user.click(screen.getByRole("button", { name: /Send Message/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const rejectedMessage = await screen.findByText(
      "Message must be 5000 characters or fewer."
    );

    expect(rejectedMessage).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByLabelText("Message")).toHaveFocus();
    expect(screen.getByLabelText("Message")).toHaveValue(
      "We would like to discuss scheduling for our facilities."
    );
    expect(screen.getByLabelText("First Name")).toHaveValue("Adaeze");
  });

  it("keeps the enquiry and offers a retry when the request cannot be sent", async () => {
    fetchMock.mockRejectedValue(new Error("network unavailable"));
    const user = userEvent.setup();

    render(<Contact />);
    await completeEnquiryForm(user);
    await user.click(screen.getByRole("button", { name: /Send Message/ }));

    const failureNotice = await screen.findByRole("alert");

    expect(failureNotice).toHaveTextContent(
      "Your enquiry could not be sent. Check your connection and try again."
    );
    expect(screen.getByLabelText("First Name")).toHaveValue("Adaeze");
    expect(screen.getByLabelText("Message")).toHaveValue(
      "We would like to discuss scheduling for our facilities."
    );
  });
});
