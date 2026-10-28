import { cloneElement, type ReactElement, type ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";

/** One card: an illustration above a label, opening `link`. */
export interface MarketingIllustratedLink {
  label: string;
  /** A decorative illustration from `@healthalyst/ui/illustrations`. */
  illustration: ReactNode;
  /** A link element without children; the card supplies its content. */
  link: ReactElement<{ className?: string; children?: ReactNode }>;
}

/**
 * A short caption over a row of linked cards, each with an illustration and a
 * label, such as the audiences a site serves. Three cards a row on tablets
 * and all of them in one row on wide screens. The illustration's disc takes
 * the accent tint while a card is hovered or focused.
 */
export function MarketingIllustratedLinkRow({
  label,
  links,
}: {
  /** The caption, which also names the list. */
  label: string;
  links: readonly MarketingIllustratedLink[];
}) {
  return (
    <section aria-label={label} className="hidden bg-card pb-4 pt-16 md:block">
      <MarketingContainer>
        <p className="text-center text-sm font-medium text-muted-foreground">
          {label}
        </p>
        <ul className="mt-6 grid grid-cols-3 gap-4 lg:grid-cols-6">
          {links.map((illustratedLink) => (
            <li key={illustratedLink.label} className="flex">
              {cloneElement(illustratedLink.link, {
                className:
                  "group flex w-full flex-col items-center gap-3 rounded-lg border border-primary/15 bg-card px-4 pb-5 pt-6 text-center text-[15px] font-semibold leading-snug text-foreground transition-colors duration-200 hover:border-accent hover:bg-accent-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
                children: (
                  <>
                    <span className="block size-[72px] shrink-0 [--illustration-base:hsl(var(--secondary))] group-hover:[--illustration-base:color-mix(in_srgb,hsl(var(--accent))_22%,hsl(var(--card)))] group-focus-visible:[--illustration-base:color-mix(in_srgb,hsl(var(--accent))_22%,hsl(var(--card)))]">
                      {illustratedLink.illustration}
                    </span>
                    {illustratedLink.label}
                  </>
                ),
              })}
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
