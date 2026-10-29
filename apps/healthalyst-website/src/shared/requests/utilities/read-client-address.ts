/** First forwarded address, or a shared local label when there is no proxy. */
export function readClientAddress(request: Request): string {
  const forwardedAddresses = request.headers.get("x-forwarded-for");

  if (forwardedAddresses) {
    const firstForwardedAddress = forwardedAddresses.split(",")[0];

    if (firstForwardedAddress) {
      return firstForwardedAddress.trim();
    }
  }

  const directClientAddress = request.headers.get("x-real-ip");

  return directClientAddress?.trim() || "local-connection";
}
