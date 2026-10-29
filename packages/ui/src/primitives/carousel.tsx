"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowRightIcon, PreviousIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { cn } from "@healthalyst/ui/lib/utilities";

/*
 * The shadcn carousel (Embla), adapted to the repository's naming rule, the
 * shared icon package and `ActionButton` for its controls.
 */

type CarouselController = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProperties = {
  options?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setController?: (carouselController: CarouselController) => void;
};

type CarouselContextProperties = {
  carouselReference: ReturnType<typeof useEmblaCarousel>[0];
  carouselController: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrevious: () => void;
  scrollNext: () => void;
  canScrollPrevious: boolean;
  canScrollNext: boolean;
} & CarouselProperties;

const CarouselContext = React.createContext<CarouselContextProperties | null>(
  null
);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProperties
>(
  (
    {
      orientation = "horizontal",
      options,
      setController,
      plugins,
      className,
      children,
      ...properties
    },
    elementReference
  ) => {
    const [carouselReference, carouselController] = useEmblaCarousel(
      {
        ...options,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrevious, setCanScrollPrevious] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback(
      (selectedController: CarouselController) => {
        if (!selectedController) {
          return;
        }

        setCanScrollPrevious(selectedController.canScrollPrev());
        setCanScrollNext(selectedController.canScrollNext());
      },
      []
    );

    const scrollPrevious = React.useCallback(() => {
      carouselController?.scrollPrev();
    }, [carouselController]);

    const scrollNext = React.useCallback(() => {
      carouselController?.scrollNext();
    }, [carouselController]);

    const handleKeyDown = React.useCallback(
      (keyboardEvent: React.KeyboardEvent<HTMLDivElement>) => {
        if (keyboardEvent.key === "ArrowLeft") {
          keyboardEvent.preventDefault();
          scrollPrevious();
        } else if (keyboardEvent.key === "ArrowRight") {
          keyboardEvent.preventDefault();
          scrollNext();
        }
      },
      [scrollPrevious, scrollNext]
    );

    React.useEffect(() => {
      if (!carouselController || !setController) {
        return;
      }

      setController(carouselController);
    }, [carouselController, setController]);

    React.useEffect(() => {
      if (!carouselController) {
        return;
      }

      onSelect(carouselController);
      carouselController.on("reInit", onSelect);
      carouselController.on("select", onSelect);

      return () => {
        carouselController.off("reInit", onSelect);
        carouselController.off("select", onSelect);
      };
    }, [carouselController, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselReference,
          carouselController,
          options,
          orientation:
            orientation || (options?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrevious,
          scrollNext,
          canScrollPrevious,
          canScrollNext,
        }}
      >
        <div
          ref={elementReference}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...properties}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, elementReference) => {
  const { carouselReference, orientation } = useCarousel();

  return (
    <div ref={carouselReference} className="overflow-hidden">
      <div
        ref={elementReference}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...properties}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, elementReference) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={elementReference}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...properties}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

type CarouselControlProperties = Omit<
  React.ComponentProps<typeof ActionButton>,
  "children"
> & {
  /** Accessible name; the control shows only an arrow. */
  label?: string;
};

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselControlProperties
>(
  (
    {
      className,
      variant = "outline",
      size = "largeIcon",
      label = "Previous slide",
      ...properties
    },
    elementReference
  ) => {
    const { scrollPrevious, canScrollPrevious } = useCarousel();

    return (
      <ActionButton
        ref={elementReference}
        type="button"
        variant={variant}
        size={size}
        shape="pill"
        aria-label={label}
        className={className}
        disabled={!canScrollPrevious}
        onClick={scrollPrevious}
        {...properties}
      >
        <PreviousIcon aria-hidden="true" />
      </ActionButton>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselControlProperties
>(
  (
    {
      className,
      variant = "outline",
      size = "largeIcon",
      label = "Next slide",
      ...properties
    },
    elementReference
  ) => {
    const { scrollNext, canScrollNext } = useCarousel();

    return (
      <ActionButton
        ref={elementReference}
        type="button"
        variant={variant}
        size={size}
        shape="pill"
        aria-label={label}
        className={className}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...properties}
      >
        <ArrowRightIcon aria-hidden="true" />
      </ActionButton>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselController,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
