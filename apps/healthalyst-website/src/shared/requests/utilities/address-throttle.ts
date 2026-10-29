/**
 * Best-effort throttle for repeated requests from one client address.
 *
 * Records live in memory only: they are keyed by client address, never written
 * to storage, and are dropped once the window has passed. A deployment with
 * more than one server process therefore shares no state, which keeps visitor
 * addresses out of the database at the cost of a looser limit.
 */

/** Guard against unbounded growth from many distinct addresses. */
const MAXIMUM_TRACKED_ADDRESSES = 5_000;

export interface AddressThrottle {
  /** Whether this address has already used its allowance for the window. */
  hasExceededLimit: (clientAddress: string) => boolean;
  /** Counts one attempt against the address. */
  recordAttempt: (clientAddress: string) => void;
  /** Forgets every recorded attempt. Used by tests and manual recovery. */
  clearAttempts: () => void;
}

export function createAddressThrottle({
  windowInMilliseconds,
  maximumAttemptsPerWindow,
}: {
  windowInMilliseconds: number;
  maximumAttemptsPerWindow: number;
}): AddressThrottle {
  const attemptTimestampsByAddress = new Map<string, number[]>();

  function removeExpiredAttempts(
    attemptTimestamps: readonly number[],
    nowInMilliseconds: number
  ): number[] {
    return attemptTimestamps.filter(
      (attemptTimestamp) =>
        nowInMilliseconds - attemptTimestamp < windowInMilliseconds
    );
  }

  function removeExpiredAddresses(nowInMilliseconds: number): void {
    for (const [
      clientAddress,
      attemptTimestamps,
    ] of attemptTimestampsByAddress) {
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

  return {
    hasExceededLimit(clientAddress) {
      removeExpiredAddresses(Date.now());

      const attemptTimestamps =
        attemptTimestampsByAddress.get(clientAddress) ?? [];

      return attemptTimestamps.length >= maximumAttemptsPerWindow;
    },
    recordAttempt(clientAddress) {
      const attemptTimestamps =
        attemptTimestampsByAddress.get(clientAddress) ?? [];

      attemptTimestampsByAddress.set(clientAddress, [
        ...attemptTimestamps,
        Date.now(),
      ]);
    },
    clearAttempts() {
      attemptTimestampsByAddress.clear();
    },
  };
}
