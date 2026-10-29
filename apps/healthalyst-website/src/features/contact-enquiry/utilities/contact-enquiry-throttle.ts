import { createAddressThrottle } from "~/shared/requests/utilities/address-throttle";

/** Five contact submissions per address every ten minutes. */
const contactEnquiryThrottle = createAddressThrottle({
  windowInMilliseconds: 10 * 60 * 1000,
  maximumAttemptsPerWindow: 5,
});

export const hasExceededContactEnquiryLimit =
  contactEnquiryThrottle.hasExceededLimit;
export const recordContactEnquiryAttempt = contactEnquiryThrottle.recordAttempt;
export const clearContactEnquiryAttempts = contactEnquiryThrottle.clearAttempts;
