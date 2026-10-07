import type { ReactElement, ReactNode } from "react";
import { Button } from "@healthalyst/ui/components/button";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";

export function MarketingHero({
  heading,
  paragraphs,
  primaryAction,
  secondaryAction,
  image,
  productNavigation,
}: {
  heading: ReactNode;
  paragraphs: readonly string[];
  primaryAction: ReactElement;
  secondaryAction: ReactElement;
  image: ReactNode;
  productNavigation: ReactNode;
}) {
  return (
    <section id="hero" className="overflow-hidden bg-background text-primary">
      <MarketingContainer className="py-10 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h1 className="max-w-[17ch] text-balance font-serif text-[clamp(3rem,5.3vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em] [&_em]:font-normal">
              {heading}
            </h1>
            <p className="mt-7 max-w-[55ch] text-base leading-[1.8] text-muted-foreground">
              {paragraphs[0]}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button
                asChild
                size="large"
                className="h-auto min-h-12 whitespace-normal rounded-full px-6"
              >
                {primaryAction}
              </Button>
              <Button
                asChild
                variant="link"
                className="h-auto min-h-12 whitespace-normal px-0 underline decoration-primary/40 underline-offset-8"
              >
                {secondaryAction}
              </Button>
            </div>
          </div>
          <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-secondary sm:aspect-[5/4] lg:aspect-[4/5]">
            {image}
          </figure>
        </div>
      </MarketingContainer>
      <div className="bg-primary text-primary-foreground">
        <MarketingContainer className="py-8 md:py-10">
          <div className="mx-auto max-w-[900px] text-center">
            {paragraphs.slice(1).map((paragraph) => (
              <p
                key={paragraph}
                className="mx-auto max-w-[72ch] text-lg leading-relaxed md:text-xl"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-5 flex justify-center border-t border-primary-foreground/20 pt-4">
              {productNavigation}
            </div>
          </div>
        </MarketingContainer>
      </div>
    </section>
  );
}

export function MarketingStatistics({
  statistics,
}: {
  statistics: readonly {
    number: string;
    label: string;
    supportingText: string;
  }[];
}) {
  return (
    <section aria-label="Company overview" className="border-b bg-background">
      <MarketingContainer>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 py-10 md:py-12 lg:grid-cols-4">
          {statistics.map((statistic) => (
            <div
              key={statistic.label}
              className="flex flex-col border-l border-border pl-5 md:pl-7"
            >
              <dt className="order-2 mt-3 text-sm font-medium text-primary">
                {statistic.label}
              </dt>
              <dd className="order-1 font-serif text-5xl font-medium tabular-nums leading-none text-primary md:text-6xl">
                {statistic.number}
              </dd>
              <dd className="order-3 mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                {statistic.supportingText}
              </dd>
            </div>
          ))}
        </dl>
      </MarketingContainer>
    </section>
  );
}
