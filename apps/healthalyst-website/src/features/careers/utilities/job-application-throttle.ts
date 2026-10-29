import { createAddressThrottle } from "~/shared/requests/utilities/address-throttle";

/** Five applications per address every ten minutes. */
const jobApplicationThrottle = createAddressThrottle({
  windowInMilliseconds: 10 * 60 * 1000,
  maximumAttemptsPerWindow: 5,
});

export const hasExceededJobApplicationLimit =
  jobApplicationThrottle.hasExceededLimit;
export const recordJobApplicationAttempt = jobApplicationThrottle.recordAttempt;
