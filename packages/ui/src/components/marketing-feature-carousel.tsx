"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselController,
} from "@healthalyst/ui/primitives/carousel";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import { cn } from "@healthalyst/ui/lib/utilities";

/** One feature card: a ringed icon, a short title and a sentence. */
export interface MarketingFeature {
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * Features as a horizontal carousel of cards with a row of chips that jump to
 * each one, plus previous and next controls. Cards are plain content, so
 * every feature can be read with the keyboard or a screen reader; arrow keys
 * move the carousel while it has focus. Nothing moves on its own.
 */
export function MarketingFeatureCarousel({
  features,
  carouselLabel,
  chipsLabel,
}: {
  features: readonly MarketingFeature[];
  /** Accessible name for the carousel region. */
  carouselLabel: string;
  /** Accessible name for the row of chips. */
  chipsLabel: string;
}) {
  const [carouselController, setCarouselController] =
    useState<CarouselController>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!carouselController) {
      return;
    }

    const updateSelection = () =>
      setSelectedIndex(carouselController.selectedScrollSnap());

    updateSelection();
    carouselController.on("select", updateSelection);
    carouselController.on("reInit", updateSelection);

    return () => {
      carouselController.off("select", updateSelection);
      carouselController.off("reInit", updateSelection);
    };
  }, [carouselController]);

  return (
    <div>
      <div
        role="group"
        aria-label={chipsLabel}
        className="hidden flex-wrap justify-center gap-2 sm:flex"
      >
        {features.map((feature, featureIndex) => (
          <ActionButton
            key={feature.title}
            type="button"
            variant={featureIndex === selectedIndex ? "default" : "outline"}
            size="large"
            shape="pill"
            aria-pressed={featureIndex === selectedIndex}
            onClick={() => carouselController?.scrollTo(featureIndex)}
          >
            {feature.title}
          </ActionButton>
        ))}
      </div>

      <Carousel
        aria-label={carouselLabel}
        setController={setCarouselController}
        options={{ align: "start", containScroll: "keepSnaps" }}
        className="sm:mt-10"
      >
        <CarouselContent>
          {features.map((feature, featureIndex) => (
            <CarouselItem
              key={feature.title}
              aria-label={`${featureIndex + 1} of ${features.length}`}
              className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
            >
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_1px_2px_rgba(15,23,20,0.04),0_4px_16px_rgba(15,23,20,0.06)] ring-1 transition-shadow duration-300 motion-reduce:transition-none md:p-8",
                  featureIndex === selectedIndex
                    ? "ring-accent"
                    : "ring-transparent"
                )}
              >
                <MarketingIconBadge icon={feature.icon} size="large" />
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.01em] text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-3">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
