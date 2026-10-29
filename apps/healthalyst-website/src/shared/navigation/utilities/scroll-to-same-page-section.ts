import type { MouseEvent } from "react";

/**
 * Scrolls to a section when a link points at the page already shown, such as
 * FAQ (`/#faq`) on the homepage. Next.js ignores a click on a link whose
 * address matches the current one, so a second click after scrolling away
 * would do nothing. The page's own `scroll-behavior` sets the motion, and the
 * address is updated as a normal link would. Clicks that open a new tab are
 * left to the browser.
 *
 * A link in the mobile menu is clicked while the menu holds the page still,
 * so the scroll waits until the closing menu releases it.
 */
export function scrollToSamePageSection(
  clickEvent: MouseEvent<HTMLAnchorElement>,
  destination: string,
  currentPath: string
): void {
  if (
    clickEvent.button !== 0 ||
    clickEvent.metaKey ||
    clickEvent.ctrlKey ||
    clickEvent.shiftKey ||
    clickEvent.altKey
  ) {
    return;
  }

  const [destinationPath, sectionIdentifier] = destination.split("#");

  if (!sectionIdentifier || (destinationPath || "/") !== currentPath) {
    return;
  }

  const section = document.getElementById(sectionIdentifier);

  if (!section) {
    return;
  }

  clickEvent.preventDefault();
  window.history.pushState(null, "", `#${sectionIdentifier}`);
  whenPageCanScroll(() => section.scrollIntoView());
}

/** Longest wait for a closing dialog to release the page. */
const SCROLL_LOCK_WAIT_IN_MILLISECONDS = 1000;

/**
 * Runs `scrollPage` once no open dialog holds the page still. Radix dialogs
 * mark the body with `data-scroll-locked` until their closing animation ends.
 */
function whenPageCanScroll(scrollPage: () => void): void {
  const startedAt = performance.now();

  const scrollWhenReleased = () => {
    if (
      !document.body.hasAttribute("data-scroll-locked") ||
      performance.now() - startedAt > SCROLL_LOCK_WAIT_IN_MILLISECONDS
    ) {
      scrollPage();
      return;
    }

    requestAnimationFrame(scrollWhenReleased);
  };

  scrollWhenReleased();
}
