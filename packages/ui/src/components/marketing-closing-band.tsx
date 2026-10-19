import type { ReactElement, ReactNode } from "react";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import {
  MarketingContainer,
  MarketingSection,
} from "@healthalyst/ui/components/marketing-section";

/**
 * The closing band of a page: one sentence about the next step and a single
 * action that takes the visitor there.
 */
export function MarketingClosingBand({
  identifier,
  heading,
  description,
  action,
}: {
  identifier?: string;
  heading: ReactNode;
  description: string;
  action: ReactElement;
}) {
  return (
    <MarketingSection
      id={identifier}
      className="bg-primary py-16 text-primary-foreground md:py-20"
    >
      <MarketingContainer className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="max-w-[22ch] text-balance font-serif text-[clamp(2rem,1.5rem+2vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            {heading}
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-[1.6] text-primary-foreground/90">
            {description}
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <ActionLink
            variant="inverse"
            size="extraLarge"
            shape="pill"
            className="h-auto min-h-12 whitespace-normal"
          >
            {action}
          </ActionLink>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
