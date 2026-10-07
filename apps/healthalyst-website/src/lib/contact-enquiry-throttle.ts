/**
 * Best-effort throttle for repeated contact submissions.
 *
 * Records live in memory only: they are keyed by client address, never written
 * to storage, and are dropped once the window has passed. A deployment with
 * more than one server process therefore shares no state, which keeps visitor
 * addresses out of the database at the cost of a looser limit.
 */

/** Length of one throttle window. */
const THROTTLE_WINDOW_IN_MILLISECONDS = 10 * 60 * 1000;

/** Attempts allowed from one address inside a single window. */
const MAXIMUM_ATTEMPTS_PER_WINDOW = 5;

/** Guard against unbounded growth from many distinct addresses. */
const MAXIMUM_TRACKED_ADDRESSES = 5_000;

const attemptTimestampsByAddress = new Map<string, number[]>();

function removeExpiredAttempts(
  attemptTimestamps: readonly number[],
  nowInMilliseconds: number
): number[] {
  return attemptTimestamps.filter(
    (attemptTimestamp) =>
      nowInMilliseconds - attemptTimestamp < THROTTLE_WINDOW_IN_MILLISECONDS
  );
}

function removeExpiredAddresses(nowInMilliseconds: number): void {
  for (const [clientAddress, attemptTimestamps] of attemptTimestampsByAddress) {
    const remainingAttempts = removeExpiredAttempts(
      attemptTimestamps,
      nowInMilliseconds
    );

    if (remainingAttempts.length === 0) {
      attemptTimestampsByAddress.delete(clientAddress);
      continue;
    }

    attemptTimestampsByAddress.set(clientAddress, remainingAttempts);
  }

  if (attemptTimestampsByAddress.size > MAXIMUM_TRACKED_ADDRESSES) {
    attemptTimestampsByAddress.clear();
  }
}

/** Whether this address has already used its allowance for the current window. */
export function hasExceededContactEnquiryLimit(clientAddress: string): boolean {
  const nowInMilliseconds = Date.now();

  removeExpiredAddresses(nowInMilliseconds);

  const attemptTimestamps = attemptTimestampsByAddress.get(clientAddress) ?? [];

  return attemptTimestamps.length >= MAXIMUM_ATTEMPTS_PER_WINDOW;
}

/** Counts one submission attempt against the address. */
export function recordContactEnquiryAttempt(clientAddress: string): void {
  const nowInMilliseconds = Date.now();
  const attemptTimestamps = attemptTimestampsByAddress.get(clientAddress) ?? [];

  attemptTimestampsByAddress.set(clientAddress, [
    ...attemptTimestamps,
    nowInMilliseconds,
  ]);
}

/** Forgets every recorded attempt. Used by tests and manual recovery. */
export function clearContactEnquiryAttempts(): void {
  attemptTimestampsByAddress.clear();
}
