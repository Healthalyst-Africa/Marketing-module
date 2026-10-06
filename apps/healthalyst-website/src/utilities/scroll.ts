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
 * Safe to call from client event handlers; does nothing when the target does not
 * exist (for example during a route transition).
 */
export function scrollTo(sectionIdentifier: string): void {
  if (typeof document === "undefined") return;
  const element = document.getElementById(sectionIdentifier);
  if (element) element.scrollIntoView({ behavior: behavior() });
}

/** Smooth-scroll back to the top of the document. */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: behavior() });
}
