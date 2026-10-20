import type { ReactNode } from "react";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";

/** A titled block of supporting information beside the main task. */
export interface MarketingTaskAside {
  identifier: string;
  heading: string;
  content: ReactNode;
}

/**
 * A task, such as a form, that rises into the brand-coloured page header above
 * it, with supporting information in a narrower column to its left. On narrow
 * screens the task comes first and the asides follow it; the task also stays
 * first in reading and focus order on wide screens.
 */
export function MarketingTaskLayout({
  task,
  asides,
}: {
  task: ReactNode;
  asides: readonly MarketingTaskAside[];
}) {
  return (
    <section className="bg-card pb-16 md:pb-24">
      <MarketingContainer className="grid gap-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="relative -mt-20 md:-mt-28 lg:col-span-7 lg:col-start-6 lg:row-start-1">
          {task}
        </div>
        {asides.length > 0 && (
          <div className="flex flex-col gap-12 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pt-12">
            {asides.map((aside) => {
              const headingIdentifier = `${aside.identifier}-heading`;

              return (
                <section
                  key={aside.identifier}
                  aria-labelledby={headingIdentifier}
                >
                  <h2
                    id={headingIdentifier}
                    className="text-xl font-serif font-normal tracking-[-0.01em] text-foreground"
                  >
                    {aside.heading}
                  </h2>
                  <div className="mt-5">{aside.content}</div>
                </section>
              );
            })}
          </div>
        )}
      </MarketingContainer>
    </section>
  );
}
