import type { ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * The site footer: brand, description and address, link groups, and a closing
 * line. `decoration`, such as `ContourPatternIllustration`, sits behind the
 * content as it does in `MarketingContentSection`.
 */
export function MarketingFooter({
  brand,
  description,
  address,
  location,
  groups,
  copyright,
  closingText,
  decoration,
}: {
  brand: ReactNode;
  description: string;
  /** A postal address shown under the description, one entry per line. */
  address?: { label: string; lines: readonly string[] };
  location: string;
  groups: readonly { heading: string; links: ReactNode }[];
  copyright: string;
  closingText: string;
  decoration?: ReactNode;
}) {
  return (
    <footer
      className={cn(
        "bg-accent-subtle py-12 text-primary md:py-16",
        decoration !== undefined && "relative isolate overflow-hidden"
      )}
    >
      {decoration}
      <MarketingContainer
        className={cn(decoration !== undefined && "relative")}
      >
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            {brand}
            <p className="mb-5 mt-6 max-w-[30ch] text-sm leading-[1.8] text-muted-foreground">
              {description}
            </p>
            {address && (
              <div className="mb-5">
                <p className="text-sm font-medium text-primary">
                  {address.label}
                </p>
                <address className="mt-1 text-sm font-light not-italic leading-[1.8] text-muted-foreground">
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          {groups.map((group) => (
            <nav key={group.heading} aria-label={`Footer ${group.heading}`}>
              <h2 className="mb-4 text-sm font-medium text-primary">
                {group.heading}
              </h2>
              <div className="flex flex-col items-start gap-1 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:rounded-sm [&_a]:text-sm [&_a]:text-muted-foreground hover:[&_a]:underline focus-visible:[&_a]:outline focus-visible:[&_a]:outline-2 focus-visible:[&_a]:outline-ring">
                {group.links}
              </div>
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-5 pt-6 text-sm text-muted-foreground">
          <p>{copyright}</p>
          <p>{closingText}</p>
        </div>
      </MarketingContainer>
    </footer>
  );
}
