import type { ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";

export function MarketingFooter({
  brand,
  description,
  location,
  groups,
  copyright,
  closingText,
}: {
  brand: ReactNode;
  description: string;
  location: string;
  groups: readonly { heading: string; links: ReactNode }[];
  copyright: string;
  closingText: string;
}) {
  return (
    <footer className="border-t bg-card py-12 text-primary md:py-16">
      <MarketingContainer>
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            {brand}
            <p className="mb-5 mt-6 max-w-[30ch] text-sm leading-[1.8] text-muted-foreground">
              {description}
            </p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          {groups.map((group) => (
            <nav key={group.heading} aria-label={`Footer ${group.heading}`}>
              <h2 className="mb-4 text-sm font-medium text-primary">
                {group.heading}
              </h2>
              <div className="flex flex-col items-start gap-1 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:rounded-sm [&_a]:text-sm [&_a]:text-muted-foreground hover:[&_a]:underline focus-visible:[&_a]:outline focus-visible:[&_a]:outline-2 focus-visible:[&_a]:outline-accent">
                {group.links}
              </div>
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-5 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>{copyright}</p>
          <p>{closingText}</p>
        </div>
      </MarketingContainer>
    </footer>
  );
}
