/** Honor the user's motion preference when scrolling. */
function behavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/**
 * Smooth-scroll to an in-page anchor.
 *
 * Safe to call from client event handlers; no-ops when the target does not
 * exist (for example during a route transition).
 */
export function scrollTo(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: behavior() });
}

/** Smooth-scroll back to the top of the document. */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: behavior() });
}
