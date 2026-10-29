"use client";

import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { CapabilityIcon } from "@healthalyst/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselController,
} from "@healthalyst/ui/primitives/carousel";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingArrowLink } from "@healthalyst/ui/components/marketing-arrow-link";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@healthalyst/ui/primitives/tabs";
import { cn } from "@healthalyst/ui/lib/utilities";

/** A product shown in the suite. */
export interface MarketingSuiteProduct {
  name: string;
  summary: string;
  capabilities: readonly string[];
  icon: ReactNode;
  /**
   * Optional illustration from `@healthalyst/ui/illustrations`, shown at
   * 80 px at the top of the card in place of the ringed icon.
   */
  illustration?: ReactNode;
  /** A link element whose text names where it goes. */
  action: ReactElement<{ className?: string; children?: ReactNode }>;
  /** Optional main call to action, a button in the card's top-right corner. */
  primaryAction?: ReactElement;
}

/** A tab of the suite: a need and the products that meet it. */
export interface MarketingSuiteGroup {
  label: string;
  /** Indexes into `products`. */
  productIndexes: readonly number[];
}

/**
 * Products grouped by need, for a brand-coloured band: pill tabs over cards.
 * Each card has an illustration (or a large ringed icon), the product's name, summary and
 * capabilities, an optional button in its top-right corner and a link; a
 * faint oversized icon marks its corner. On
 * phones there are no tabs: the products form a carousel showing one card at
 * a time, with previous and next buttons and the card's position; swiping
 * selects the product shown, and selecting a product elsewhere scrolls to it.
 *
 * The selected product is controlled by the page, so other controls (such as
 * a header menu) can open it: its group's tab opens and its card is
 * highlighted. Choosing a tab selects that group's first product.
 */
export function MarketingProductSuite({
  groups,
  products,
  selectedProductIndex,
  onSelectProduct,
  groupsLabel,
}: {
  groups: readonly MarketingSuiteGroup[];
  products: readonly MarketingSuiteProduct[];
  selectedProductIndex: number;
  onSelectProduct: (productIndex: number) => void;
  /** Accessible name for the tab list. */
  groupsLabel: string;
}) {
  const activeGroupIndex = Math.max(
    groups.findIndex((group) =>
      group.productIndexes.includes(selectedProductIndex)
    ),
    0
  );

  const [carouselController, setCarouselController] =
    useState<CarouselController>();
  /*
   * Fixed at first render: new options make the carousel start again, which
   * would make every change jump instead of slide.
   */
  const [carouselOptions] = useState(() => ({
    align: "start" as const,
    startIndex: selectedProductIndex,
  }));

  /* Keep the phone carousel on the selected product, such as one chosen in the menu. */
  useEffect(() => {
    if (
      carouselController &&
      carouselController.selectedScrollSnap() !== selectedProductIndex
    ) {
      carouselController.scrollTo(selectedProductIndex);
    }
  }, [carouselController, selectedProductIndex]);

  useEffect(() => {
    if (!carouselController) {
      return;
    }

    const updateShownProduct = () => {
      onSelectProduct(carouselController.selectedScrollSnap());
    };

    carouselController.on("select", updateShownProduct);

    return () => {
      carouselController.off("select", updateShownProduct);
    };
  }, [carouselController, onSelectProduct]);

  const renderProductCard = (
    productIndex: number,
    ElementType: "li" | "div" = "li"
  ) => {
    const product = products[productIndex];

    if (!product) {
      return null;
    }

    return (
      <ElementType
        key={product.name}
        className={cn(
          "relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 text-left text-foreground shadow-[0_2px_4px_rgba(15,23,20,0.08),0_16px_40px_rgba(15,23,20,0.18)] ring-2 transition-shadow duration-300 motion-reduce:transition-none md:p-8",
          productIndex === selectedProductIndex
            ? "ring-accent"
            : "ring-transparent"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-10 -z-10 size-48 text-primary/[0.05] [&_svg]:size-full [&_svg]:stroke-[1]"
        >
          {product.icon}
        </span>
        {product.illustration ? (
          <span aria-hidden="true" className="block size-20 shrink-0">
            {product.illustration}
          </span>
        ) : (
          <MarketingIconBadge icon={product.icon} size="large" />
        )}
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.01em] text-foreground">
          {product.name}
        </h3>
        {product.primaryAction && (
          // Read after the product's name, shown in the top-right corner
          // centred on the 80 px illustration.
          <ActionLink
            shape="pill"
            className="absolute right-6 top-[44px] md:right-8 md:top-[52px]"
          >
            {product.primaryAction}
          </ActionLink>
        )}
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {product.summary}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {product.capabilities.map((capability) => (
            <li
              key={capability}
              className="flex gap-3 text-[15px] leading-snug text-foreground"
            >
              <CapabilityIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-accent"
              />
              {capability}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {/* Smaller than the button, so the button leads. */}
          <MarketingArrowLink link={product.action} size="small" />
        </div>
      </ElementType>
    );
  };

  return (
    <>
      {/* On phones the products form a carousel; the group tabs start at tablets. */}
      <Carousel
        aria-label={groupsLabel}
        setController={setCarouselController}
        options={carouselOptions}
        className="md:hidden"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.name}>
              {renderProductCard(products.indexOf(product), "div")}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-4">
          <CarouselPrevious variant="inverseOutline" label="Previous product" />
          <p
            aria-live="polite"
            className="min-w-[4.5rem] text-center text-sm font-medium tabular-nums text-primary-foreground/85"
          >
            {selectedProductIndex + 1} of {products.length}
          </p>
          <CarouselNext variant="inverseOutline" label="Next product" />
        </div>
      </Carousel>
      <Tabs
        className="hidden md:block"
        value={String(activeGroupIndex)}
        onValueChange={(value) => {
          const firstProductIndex = groups[Number(value)]?.productIndexes[0];

          if (firstProductIndex !== undefined) {
            onSelectProduct(firstProductIndex);
          }
        }}
      >
        <TabsList variant="pills" aria-label={groupsLabel}>
          {groups.map((group, groupIndex) => (
            <TabsTrigger
              key={group.label}
              value={String(groupIndex)}
              variant="inversePill"
            >
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((group, groupIndex) => (
          <TabsContent
            key={group.label}
            value={String(groupIndex)}
            className="mt-10"
          >
            <ul className="mx-auto grid max-w-[1040px] gap-6 md:grid-cols-2">
              {group.productIndexes.map((productIndex) =>
                renderProductCard(productIndex)
              )}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
