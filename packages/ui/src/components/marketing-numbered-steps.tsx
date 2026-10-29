import type { ReactNode } from "react";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import { MarketingReveal } from "@healthalyst/ui/components/marketing-reveal";
import { cn } from "@healthalyst/ui/lib/utilities";

/** One step: its icon, title and a sentence. */
export interface MarketingNumberedStep {
  title: string;
  description: string;
  icon: ReactNode;
}

/** Entrance delays, so the steps rise in order. */
const STEP_DELAYS = ["delay-0", "delay-150", "delay-300", "delay-500"] as const;

/**
 * A short ordered process: a large outlined numeral, a ringed icon, a title
 * and a sentence per step, in up to four columns. The steps rise into place
 * in order the first time the list scrolls into view; under reduced motion
 * they are simply there. It is an ordered list, so the order is announced.
 */
export function MarketingNumberedSteps({
  steps,
}: {
  steps: readonly MarketingNumberedStep[];
}) {
  return (
    <MarketingReveal>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, stepIndex) => (
          <li
            key={step.title}
            className={cn(
              "flex flex-col transition-[opacity,transform] duration-700 ease-out group-data-[revealed=false]/reveal:translate-y-6 group-data-[revealed=false]/reveal:opacity-0 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none",
              STEP_DELAYS[stepIndex]
            )}
          >
            <div className="flex items-end gap-3">
              <span
                aria-hidden="true"
                className="text-[64px] font-semibold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_hsl(var(--accent))]"
              >
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <MarketingIconBadge icon={step.icon} className="mb-1 bg-card" />
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.01em] text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </MarketingReveal>
  );
}
