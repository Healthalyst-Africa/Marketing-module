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
 *   centred vertically against the media.
 * - `alignment="center"` centres a stacked section's heading, introduction
 *   and actions above its content.
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
  children?: ReactNode;
}) {
  const headingIdentifier = `${identifier}-heading`;
  const hasMedia = media !== undefined;
  const isSplit = layout === "split" && !hasMedia;
  const isCentered = alignment === "center" && !isSplit && !hasMedia;

  const opening = (
    <div
      className={cn(
        !isSplit && !hasMedia && "max-w-[68ch]",
        isCentered && "mx-auto text-center"
      )}
    >
      <h2
        id={headingIdentifier}
        className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[40px]"
      >
        {heading}
      </h2>
      {introduction && (
        <div
          className={cn(
            "flex max-w-[68ch] flex-col gap-4 text-base leading-relaxed text-muted-foreground md:text-[17px]",
            isCentered && "mx-auto"
          )}
        >
          {introduction}
        </div>
      )}
      {actions && (
        <div
          className={cn(
            "mt-8 flex flex-wrap items-center gap-4",
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
      className="bg-card py-12 md:py-20"
    >
      <MarketingContainer
        className={cn(
          "grid gap-10",
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
