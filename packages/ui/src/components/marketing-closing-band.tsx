import type { ReactElement, ReactNode } from "react";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import {
  MarketingContainer,
  MarketingSection,
} from "@healthalyst/ui/components/marketing-section";

/**
 * The closing band of a page: a brand-colour card with the next step, a main
 * action and an optional second one, and an optional photograph on the
 * right (above the text on phones). `decoration` sits behind the text.
 */
export function MarketingClosingBand({
  identifier,
  heading,
  description,
  action,
  secondaryAction,
  photograph,
  decoration,
}: {
  identifier?: string;
  heading: ReactNode;
  description: string;
  action: ReactElement;
  secondaryAction?: ReactElement;
  /** A photograph that fills its frame. */
  photograph?: ReactNode;
  decoration?: ReactNode;
}) {
  return (
    <MarketingSection id={identifier} className="bg-card py-12 md:py-20">
      <MarketingContainer>
        <div className="relative isolate grid overflow-hidden rounded-2xl bg-primary text-primary-foreground lg:grid-cols-12">
          {decoration}
          {photograph && (
            <div className="relative min-h-[240px] sm:min-h-[320px] lg:order-last lg:col-span-5 lg:min-h-full">
              {photograph}
            </div>
          )}
          <div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:col-span-7 lg:py-16">
            <h2 className="max-w-[22ch] text-balance text-[28px] font-serif font-normal leading-[1.15] tracking-[-0.01em] md:text-[40px]">
              {heading}
            </h2>
            <p className="mt-3 max-w-[56ch] text-base font-normal leading-relaxed text-primary-foreground/85 md:text-[17px]">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <ActionLink
                variant="inverse"
                size="extraLarge"
                shape="pill"
                className="h-auto min-h-12 whitespace-normal"
              >
                {action}
              </ActionLink>
              {secondaryAction && (
                <ActionLink
                  variant="inverseOutline"
                  size="extraLarge"
                  shape="pill"
                  className="h-auto min-h-12 whitespace-normal"
                >
                  {secondaryAction}
                </ActionLink>
              )}
            </div>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
