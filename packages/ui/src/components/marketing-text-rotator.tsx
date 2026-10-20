"use client";

import { useEffect, useState } from "react";
import { useMarketingMotionPause } from "@healthalyst/ui/components/marketing-motion-pause";
import { cn } from "@healthalyst/ui/lib/utilities";

/** Time each word stays before the next one slides in. */
const WORD_DURATION_IN_MILLISECONDS = 2400;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

/**
 * A word that changes in place, sliding and fading through `words`: the old
 * word leaves in 0.2 s before the new one arrives, so they never overlap. All the
 * words share one grid cell, so the line keeps the width of the longest and
 * nothing around it moves.
 *
 * It is hidden from assistive technology: the surrounding heading must carry
 * the full sentence in text (for example with a visually hidden list). It
 * stops on `stillWord` under reduced motion and pauses with a surrounding
 * `MarketingMotionPauseProvider`. Pass `activeIndex` to drive it from a
 * parent that changes other things in step, such as a background.
 */
export function MarketingTextRotator({
  words,
  stillWord,
  activeIndex,
  className,
}: {
  words: readonly string[];
  /** Shown instead of the rotation when the visitor prefers reduced motion. */
  stillWord: string;
  /** The word to show; when set, the parent controls the timing. */
  activeIndex?: number;
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sharedPause = useMarketingMotionPause();
  const isPaused = sharedPause?.isPaused ?? false;
  const [ownWordIndex, setOwnWordIndex] = useState(0);
  const isControlled = activeIndex !== undefined;
  const wordIndex = activeIndex ?? ownWordIndex;

  useEffect(() => {
    if (isControlled || prefersReducedMotion || isPaused) {
      return;
    }

    const interval = window.setInterval(
      () => setOwnWordIndex((index) => (index + 1) % words.length),
      WORD_DURATION_IN_MILLISECONDS
    );

    return () => window.clearInterval(interval);
  }, [isControlled, prefersReducedMotion, isPaused, words.length]);

  if (prefersReducedMotion) {
    return (
      <span aria-hidden="true" className={className}>
        {stillWord}
      </span>
    );
  }

  return (
    <span aria-hidden="true" className={cn("inline-grid", className)}>
      {words.map((word, index) => (
        <span
          key={word}
          className={cn(
            "col-start-1 row-start-1 transition-[opacity,transform] ease-out",
            index === wordIndex
              ? "translate-y-0 opacity-100 delay-200 duration-500"
              : index === (wordIndex + words.length - 1) % words.length
                ? "-translate-y-3 opacity-0 duration-200"
                : "translate-y-3 opacity-0 duration-200"
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
