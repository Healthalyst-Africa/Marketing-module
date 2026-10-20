import type { ReactNode } from "react";
import {
  MarketingContainer,
  MarketingSection,
} from "@healthalyst/ui/components/marketing-section";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * A section of an inner page on the white surface: a heading, an optional
 * short introduction and actions, and the section's content.
 *
 * - `stacked` places the content below the heading.
 * - `split` places the heading and introduction in a narrower column beside
 *   the content on wide screens, like the contact page's side column.
 * - With `media`, the heading, introduction and content sit beside the media,
 *   such as a photograph, which takes the narrower column; the text is
 *   centred vertically against the media. Below large screens, where they
 *   stack, the heading and introduction are centred.
 * - `alignment="center"` centres a stacked section's heading, introduction
 *   and actions above its content.
 * - `tone` sets the surface: `default` (white), `brand` (the brand-colour
 *   band, light text) or `subtle` (the subtle accent band). A page uses at
 *   most one of each band.
 * - `decoration` places a decorative layer, such as
 *   `MarketingContourPattern`, behind the content.
 *
 * Sections are separated by space only, never by dividing lines.
 */
export function MarketingContentSection({
  identifier,
  heading,
  introduction,
  actions,
  media,
  layout = "stacked",
  alignment = "start",
  tone = "default",
  decoration,
  children,
}: {
  /** Anchor for links to this section; also names its heading. */
  identifier: string;
  heading: ReactNode;
  /** One or more paragraphs under the heading. */
  introduction?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  layout?: "stacked" | "split";
  /** Applies to stacked sections without media. */
  alignment?: "start" | "center";
  tone?: "default" | "brand" | "subtle";
  /** A decorative layer behind the content, hidden from assistive technology. */
  decoration?: ReactNode;
  children?: ReactNode;
}) {
  const headingIdentifier = `${identifier}-heading`;
  const hasMedia = media !== undefined;
  const isSplit = layout === "split" && !hasMedia;
  const isCentered = alignment === "center" && !isSplit && !hasMedia;
  const isBrand = tone === "brand";

  const opening = (
    <div
      className={cn(
        !isSplit && !hasMedia && !isCentered && "max-w-[68ch]",
        /* Centred headings get room for one line; the introduction keeps its own measure. */
        isCentered && "mx-auto max-w-[56rem] text-center",
        /* Beside media: centred while stacked on smaller screens, at the start beside it. */
        hasMedia && "text-center lg:text-start"
      )}
    >
      <h2
        id={headingIdentifier}
        className={cn(
          "text-balance text-[28px] font-serif font-normal leading-[1.15] tracking-[-0.01em] md:text-[40px]",
          isBrand ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {heading}
      </h2>
      {introduction && (
        <div
          className={cn(
            "flex max-w-[68ch] flex-col gap-4 text-base leading-relaxed [&_p]:font-normal md:text-[17px]",
            isBrand ? "text-primary-foreground/85" : "text-muted-foreground",
            isCentered && "mx-auto",
            hasMedia && "mx-auto lg:mx-0"
          )}
        >
          {introduction}
        </div>
      )}
      {actions && (
        <div
          className={cn(
            "mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4",
            isCentered && "justify-center"
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );

  return (
    <MarketingSection
      id={identifier}
      aria-labelledby={headingIdentifier}
      className={cn(
        "py-12 md:py-20",
        tone === "default" && "bg-card",
        isBrand && "bg-primary text-primary-foreground",
        tone === "subtle" && "bg-accent-subtle",
        decoration !== undefined && "relative isolate overflow-hidden"
      )}
    >
      {decoration}
      <MarketingContainer
        className={cn(
          "grid grid-cols-1 gap-10",
          decoration !== undefined && "relative",
          (isSplit || hasMedia) && "lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16",
          isSplit && "lg:items-start",
          hasMedia && "lg:items-center"
        )}
      >
        {hasMedia ? (
          <>
            <div className="flex flex-col gap-10 lg:col-span-7">
              {opening}
              {children}
            </div>
            <div className="lg:col-span-5">{media}</div>
          </>
        ) : (
          <>
            <div className={cn(isSplit && "lg:col-span-5")}>{opening}</div>
            {children && (
              <div className={cn(isSplit && "lg:col-span-7")}>{children}</div>
            )}
          </>
        )}
      </MarketingContainer>
    </MarketingSection>
  );
}
