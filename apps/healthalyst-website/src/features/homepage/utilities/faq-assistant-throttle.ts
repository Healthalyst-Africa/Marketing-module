import { createAddressThrottle } from "~/shared/requests/utilities/address-throttle";

/** Ten assistant questions per address every ten minutes. */
const faqAssistantThrottle = createAddressThrottle({
  windowInMilliseconds: 10 * 60 * 1000,
  maximumAttemptsPerWindow: 10,
});

export const hasExceededFaqAssistantLimit =
  faqAssistantThrottle.hasExceededLimit;
export const recordFaqAssistantAttempt = faqAssistantThrottle.recordAttempt;
