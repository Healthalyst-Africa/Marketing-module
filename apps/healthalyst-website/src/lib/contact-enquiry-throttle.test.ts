import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearContactEnquiryAttempts,
  hasExceededContactEnquiryLimit,
  recordContactEnquiryAttempt,
} from "~/lib/contact-enquiry-throttle";

describe("contact enquiry throttle", () => {
  beforeEach(() => {
    clearContactEnquiryAttempts();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows five attempts and blocks the sixth", () => {
    const clientAddress = "198.51.100.7";

    for (let attemptNumber = 0; attemptNumber < 5; attemptNumber += 1) {
      expect(hasExceededContactEnquiryLimit(clientAddress)).toBe(false);
      recordContactEnquiryAttempt(clientAddress);
    }

    expect(hasExceededContactEnquiryLimit(clientAddress)).toBe(true);
  });

  it("tracks each client address separately", () => {
    const busyClientAddress = "198.51.100.7";

    for (let attemptNumber = 0; attemptNumber < 5; attemptNumber += 1) {
      recordContactEnquiryAttempt(busyClientAddress);
    }

    expect(hasExceededContactEnquiryLimit(busyClientAddress)).toBe(true);
    expect(hasExceededContactEnquiryLimit("203.0.113.9")).toBe(false);
  });

  it("forgets attempts once the window has passed", () => {
    vi.useFakeTimers();

    const clientAddress = "198.51.100.7";

    for (let attemptNumber = 0; attemptNumber < 5; attemptNumber += 1) {
      recordContactEnquiryAttempt(clientAddress);
    }

    expect(hasExceededContactEnquiryLimit(clientAddress)).toBe(true);

    vi.advanceTimersByTime(11 * 60 * 1000);

    expect(hasExceededContactEnquiryLimit(clientAddress)).toBe(false);
  });

  it("forgets every attempt when the records are cleared", () => {
    const clientAddress = "198.51.100.7";

    for (let attemptNumber = 0; attemptNumber < 5; attemptNumber += 1) {
      recordContactEnquiryAttempt(clientAddress);
    }

    clearContactEnquiryAttempts();

    expect(hasExceededContactEnquiryLimit(clientAddress)).toBe(false);
  });
});
