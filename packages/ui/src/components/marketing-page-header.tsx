import type { ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * Opening of an inner page: the page's only first-level heading, a lede and
 * optional actions or media. `brand` sets it on the primary colour; `card`
 * insets it from the page edges on the white surface with rounded corners;
 * `overlapBelow` leaves room for the next element to rise into it.
 */
export function MarketingPageHeader({
  heading,
  lede,
  actions,
  media,
  showMediaOnSmallScreens = true,
  tone = "default",
  shape = "band",
  overlapBelow = false,
  className,
}: {
  heading: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  /** Set to false when the media is decorative and would delay the page's task on phones. */
  showMediaOnSmallScreens?: boolean;
  tone?: "default" | "brand";
  /** `band` spans the page width; `card` sits inside external padding with rounded corners. */
  shape?: "band" | "card";
  overlapBelow?: boolean;
  className?: string;
}) {
  const isBrand = tone === "brand";
  const isCard = shape === "card";

  const header = (
    <div
      className={cn(
        isBrand
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground",
        isCard ? "rounded-2xl" : className
      )}
    >
      <MarketingContainer
        className={cn(
          "pt-12 md:pt-20",
          overlapBelow ? "pb-28 md:pb-36" : "pb-12 md:pb-16"
        )}
      >
        <div
          className={cn(
            "grid gap-10",
            media && "lg:grid-cols-12 lg:items-end lg:gap-6"
          )}
        >
          <div className={cn(media && "lg:col-span-7")}>
            <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,1.9rem+2.4vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
              {heading}
            </h1>
            <div
              className={cn(
                "mt-5 max-w-[52ch] text-lg leading-[1.6] md:text-xl",
                isBrand ? "text-primary-foreground/85" : "text-muted-foreground"
              )}
            >
              {lede}
            </div>
            {actions && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {actions}
              </div>
            )}
          </div>
          {media && (
            <div
              className={cn(
                "lg:col-span-5",
                !showMediaOnSmallScreens && "hidden lg:block"
              )}
            >
              {media}
            </div>
          )}
        </div>
      </MarketingContainer>
    </div>
  );

  if (!isCard) {
    return header;
  }

  return (
    <div className={cn("bg-card px-3 pt-3 md:px-5 md:pt-5", className)}>
      {header}
    </div>
  );
}
