"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import {
  MarketingMotionPauseButton,
  MarketingMotionPauseProvider,
  useMarketingMotionPause,
} from "@healthalyst/ui/components/marketing-motion-pause";
import { MarketingTextRotator } from "@healthalyst/ui/components/marketing-text-rotator";
import { cn } from "@healthalyst/ui/lib/utilities";

/** Time each audience, and its photograph, stays before the next. */
const SLIDE_DURATION_IN_MILLISECONDS = 3600;

/** One audience: the word in the heading and the photograph behind it. */
export interface MarketingHeroSlide {
  word: string;
  /** A photograph that fills the hero, shown while `word` is. */
  photograph: ReactNode;
}

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

function RotatingHeroCard({
  headingIdentifier,
  headingLead,
  spokenEnding,
  stillWord,
  slides,
  lede,
  actions,
  decoration,
}: {
  headingIdentifier: string;
  headingLead: string;
  spokenEnding: string;
  stillWord: string;
  slides: readonly MarketingHeroSlide[];
  lede: ReactNode;
  actions?: ReactNode;
  decoration?: ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isPaused = useMarketingMotionPause()?.isPaused ?? false;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      return;
    }

    const interval = window.setInterval(
      () => setSlideIndex((index) => (index + 1) % slides.length),
      SLIDE_DURATION_IN_MILLISECONDS
    );

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, isPaused, slides.length]);

  return (
    <div className="relative isolate flex min-h-[clamp(540px,78vh,720px)] items-center overflow-hidden rounded-2xl bg-primary text-primary-foreground">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {slides.map((slide, index) => (
          <div
            key={slide.word}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] ease-out motion-reduce:scale-100 motion-reduce:transition-none",
              index === slideIndex
                ? "scale-110 opacity-100"
                : "scale-100 opacity-0"
            )}
            style={{
              /* Fade in 1.2 s; the showing photograph zooms slowly over 7 s. */
              transitionDuration:
                index === slideIndex ? "1200ms, 7000ms" : "1200ms, 1200ms",
            }}
          >
            {slide.photograph}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,hsl(var(--primary)/0.86),hsl(var(--primary)/0.72)_55%,hsl(var(--primary)/0.4))]"
      />
      {decoration}
      <MarketingMotionPauseButton className="absolute right-3 top-3 z-10 md:right-5 md:top-5" />
      <MarketingContainer className="relative py-20 text-center md:py-24">
        <h1
          id={headingIdentifier}
          className="mx-auto max-w-[30ch] text-balance text-[clamp(2rem,1.25rem+3.2vw,4rem)] font-serif font-normal leading-[1.08] tracking-[-0.01em]"
        >
          {headingLead}
          <span className="sr-only"> {spokenEnding}</span>
          <span className="block text-accent">
            <MarketingTextRotator
              words={slides.map((slide) => slide.word)}
              stillWord={stillWord}
              activeIndex={slideIndex}
            />
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-[56ch] text-lg leading-[1.6] [&_p]:font-normal text-primary-foreground/90 md:text-xl">
          {lede}
        </div>
        {actions && (
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
            {actions}
          </div>
        )}
      </MarketingContainer>
    </div>
  );
}

/**
 * A homepage hero whose heading names one audience at a time while a
 * photograph of that audience's setting fills the card behind it. The word
 * slides and the photograph crossfades, with a slow zoom, every 3.6 seconds,
 * under a deep brand-colour wash that keeps the text readable.
 *
 * Photographs are decorative (the heading carries the full sentence for
 * screen readers). One control pauses the word, the photographs and any
 * `decoration` that reads the shared pause state; under reduced motion the
 * first photograph and `stillWord` stay still.
 */
export function MarketingRotatingHero({
  identifier,
  ...properties
}: {
  identifier: string;
  /** The heading's fixed opening, such as "Digital infrastructure for". */
  headingLead: string;
  /** The full list of audiences, read by screen readers after the lead. */
  spokenEnding: string;
  /** Shown instead of the rotating word under reduced motion. */
  stillWord: string;
  slides: readonly MarketingHeroSlide[];
  lede: ReactNode;
  actions?: ReactNode;
  decoration?: ReactNode;
}) {
  const headingIdentifier = `${identifier}-heading`;

  return (
    <section
      id={identifier}
      aria-labelledby={headingIdentifier}
      className="bg-card px-3 pt-3 md:px-5 md:pt-5"
    >
      <MarketingMotionPauseProvider>
        <RotatingHeroCard
          headingIdentifier={headingIdentifier}
          {...properties}
        />
      </MarketingMotionPauseProvider>
    </section>
  );
}
