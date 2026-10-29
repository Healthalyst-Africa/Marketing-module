"use client";

import { useEffect, useState, type ReactNode } from "react";
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

/** One feature card: an illustration or ringed icon, a short title and a sentence. */
export interface MarketingFeature {
  title: string;
  description: string;
  icon: ReactNode;
  /**
   * Optional illustration from `@healthalyst/ui/illustrations`, shown at
   * 80 px in place of the ringed icon.
   */
  illustration?: ReactNode;
}

/**
 * Features as a horizontal carousel of cards with previous and next controls.
 * Cards are plain content, so every feature can be read with the keyboard or
 * a screen reader; arrow keys move the carousel while it has focus. Nothing
 * moves on its own.
 */
export function MarketingFeatureCarousel({
  features,
  carouselLabel,
}: {
  features: readonly MarketingFeature[];
  /** Accessible name for the carousel region. */
  carouselLabel: string;
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
      <Carousel
        aria-label={carouselLabel}
        setController={setCarouselController}
        options={{ align: "start", containScroll: "keepSnaps" }}
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
                {feature.illustration ? (
                  <span aria-hidden="true" className="block size-20 shrink-0">
                    {feature.illustration}
                  </span>
                ) : (
                  <MarketingIconBadge icon={feature.icon} size="large" />
                )}
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
