"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * A small round button fixed to the bottom-right corner that returns to the
 * top of the page. It appears once the visitor has scrolled a screen's height
 * and is hidden from the keyboard and assistive technology until then. The
 * page's own `scroll-behavior` sets the motion, so reduced motion jumps.
 * Focus moves to `focusTargetIdentifier`, such as the main landmark, so
 * keyboard users continue from the top too.
 */
export function MarketingScrollToTop({
  label,
  focusTargetIdentifier,
}: {
  /** Accessible name for the button. */
  label: string;
  /** An element with `tabIndex={-1}` to focus after scrolling. */
  focusTargetIdentifier?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () =>
      setIsVisible(window.scrollY > window.innerHeight);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0 });

    if (focusTargetIdentifier) {
      document
        .getElementById(focusTargetIdentifier)
        ?.focus({ preventScroll: true });
    }
  }

  return (
    <ActionButton
      type="button"
      variant="floating"
      size="icon"
      shape="pill"
      aria-label={label}
      aria-hidden={!isVisible || undefined}
      tabIndex={isVisible ? undefined : -1}
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-[opacity,transform] duration-200 motion-reduce:transition-none md:bottom-8 md:right-8",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <ArrowUpIcon aria-hidden="true" />
    </ActionButton>
  );
}
