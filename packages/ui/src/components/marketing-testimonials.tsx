"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRightIcon, PreviousIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import { cn } from "@healthalyst/ui/lib/utilities";

/** Opacity of a word that the scroll has not yet reached. */
const DIMMED_WORD_CLASS = "opacity-20";

/** A testimonial: the words of a named person at an institution. */
export interface MarketingTestimonial {
  quote: string;
  name: string;
  role: string;
  institution: string;
  /** A portrait for the floating avatar; the person's initials otherwise. */
  portrait?: ReactNode;
  /** A notice shown above the quote, such as one marking a sample. */
  notice?: string;
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

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join("");
}

/**
 * One oversized testimonial at a time, set like a statement: its words light
 * up in reading order as the section scrolls through the view, and a round
 * avatar floats at the quote's lower right, overlapping its end slightly (on
 * phones it sits centred below the quote instead).
 * The person's name, role and institution follow. With more than one
 * testimonial, previous and next buttons change it; nothing rotates on its
 * own. The quote is a single block quotation, read in full by assistive
 * technology; before scripts run and under reduced motion every word is
 * shown at full strength.
 */
export function MarketingTestimonials({
  label,
  testimonials,
  previousLabel = "Previous testimonial",
  nextLabel = "Next testimonial",
}: {
  /** Accessible name for the section. */
  label: string;
  testimonials: readonly MarketingTestimonial[];
  previousLabel?: string;
  nextLabel?: string;
}) {
  const quoteReference = useRef<HTMLQuoteElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState<number | undefined>();
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];
  const hasSeveral = testimonials.length > 1;

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(undefined);
      return;
    }

    let animationFrame = 0;

    const update = () => {
      const quote = quoteReference.current;

      if (!quote) {
        return;
      }

      const rectangle = quote.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const distance = rectangle.height + window.innerHeight * 0.4;
      setProgress(Math.min(Math.max((start - rectangle.top) / distance, 0), 1));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [prefersReducedMotion]);

  if (!testimonial) {
    return null;
  }

  const words = testimonial.quote.split(" ");
  const litWordCount =
    progress === undefined ? words.length : Math.round(progress * words.length);

  const moveBy = (step: number) =>
    setActiveIndex(
      (currentIndex) =>
        (currentIndex + step + testimonials.length) % testimonials.length
    );

  return (
    <section aria-label={label} className="bg-card py-20 md:py-28">
      <MarketingContainer>
        <figure
          key={activeIndex}
          aria-live={hasSeveral ? "polite" : undefined}
          className="mx-auto flex max-w-[24ch] flex-col items-center text-center text-[clamp(1.625rem,0.86rem+3.28vw,3.5rem)] motion-safe:animate-[marketing-rise_0.5s_ease-out]"
        >
          {testimonial.notice && (
            <p className="mb-6 rounded-full border border-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              {testimonial.notice}
            </p>
          )}
          <div className="relative">
            <blockquote
              ref={quoteReference}
              className="text-balance font-serif font-normal leading-[1.15] tracking-[-0.01em] text-foreground"
            >
              <span aria-hidden="true" className="text-accent">
                “
              </span>
              {words.map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className={cn(
                    "transition-opacity duration-300 ease-out motion-reduce:transition-none",
                    wordIndex >= litWordCount && DIMMED_WORD_CLASS
                  )}
                >
                  {word}
                  {wordIndex < words.length - 1 ? " " : ""}
                </span>
              ))}
              <span aria-hidden="true" className="text-accent">
                ”
              </span>
            </blockquote>
            <span
              aria-hidden="true"
              className="relative mx-auto mt-6 flex size-16 items-center justify-center overflow-hidden rounded-full border-2 border-accent bg-accent-subtle text-base font-semibold tracking-normal text-primary shadow-[0_2px_4px_rgba(15,23,20,0.06),0_12px_28px_rgba(15,23,20,0.14)] ring-4 ring-card md:absolute md:-bottom-6 md:-right-5 md:mx-0 md:mt-0 md:size-20 md:text-xl"
            >
              {testimonial.portrait ?? initialsOf(testimonial.name)}
            </span>
          </div>
          <figcaption className="mt-4 text-base md:mt-14">
            <span className="block font-semibold text-foreground">
              {testimonial.name}
            </span>
            <span className="block text-muted-foreground">
              {testimonial.role}, {testimonial.institution}
            </span>
          </figcaption>
        </figure>
        {hasSeveral && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <ActionButton
              type="button"
              variant="outline"
              size="largeIcon"
              shape="pill"
              aria-label={previousLabel}
              onClick={() => moveBy(-1)}
            >
              <PreviousIcon aria-hidden="true" />
            </ActionButton>
            <ActionButton
              type="button"
              variant="outline"
              size="largeIcon"
              shape="pill"
              aria-label={nextLabel}
              onClick={() => moveBy(1)}
            >
              <ArrowRightIcon aria-hidden="true" />
            </ActionButton>
          </div>
        )}
      </MarketingContainer>
    </section>
  );
}
