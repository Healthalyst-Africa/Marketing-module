import type { ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * Opening of an inner page: the page's only first-level heading, a lede and
 * optional actions or media. `brand` sets it on the primary colour; `card`
 * insets it from the page edges on the white surface with rounded corners;
 * `overlapBelow` leaves room for the next element to rise into it. `center`
 * centres the heading, lede, tagline and actions (without media).
 */
export function MarketingPageHeader({
  heading,
  lede,
  actions,
  media,
  decoration,
  showMediaOnSmallScreens = true,
  tone = "default",
  shape = "band",
  overlapBelow = false,
  alignment = "start",
  tagline,
  className,
}: {
  heading: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  /** Decorative layer behind the content, such as an animated pattern; it is clipped to the header. */
  decoration?: ReactNode;
  /** Set to false when the media is decorative and would delay the page's task on phones. */
  showMediaOnSmallScreens?: boolean;
  tone?: "default" | "brand";
  /** `band` spans the page width; `card` sits inside external padding with rounded corners. */
  shape?: "band" | "card";
  overlapBelow?: boolean;
  /** `center` applies when there is no media. */
  alignment?: "start" | "center";
  /** A short line below the lede, such as a rotating audience. */
  tagline?: ReactNode;
  className?: string;
}) {
  const isBrand = tone === "brand";
  const isCard = shape === "card";
  const isCentered = alignment === "center" && !media;

  const header = (
    <div
      className={cn(
        isBrand
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground",
        decoration && "relative isolate overflow-hidden",
        isCard ? "rounded-2xl" : className
      )}
    >
      {decoration}
      <MarketingContainer
        className={cn(
          "pt-12 md:pt-20",
          decoration && "relative",
          overlapBelow ? "pb-28 md:pb-36" : "pb-12 md:pb-16"
        )}
      >
        <div
          className={cn(
            "grid gap-10",
            media && "lg:grid-cols-12 lg:items-end lg:gap-6"
          )}
        >
          <div
            className={cn(
              media && "lg:col-span-7",
              isCentered && "flex flex-col items-center text-center"
            )}
          >
            <h1 className="max-w-[18ch] text-balance text-[clamp(2rem,1.25rem+3.2vw,4rem)] font-serif font-normal leading-[1.04] tracking-[-0.01em]">
              {heading}
            </h1>
            <div
              className={cn(
                "mt-5 max-w-[52ch] text-lg leading-[1.6] [&_p]:font-normal md:text-xl",
                isBrand ? "text-primary-foreground/85" : "text-muted-foreground"
              )}
            >
              {lede}
            </div>
            {tagline && (
              <div
                className={cn(
                  "mt-6 text-base md:text-lg [&_p]:font-medium",
                  isBrand
                    ? "text-primary-foreground/85"
                    : "text-muted-foreground"
                )}
              >
                {tagline}
              </div>
            )}
            {actions && (
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
