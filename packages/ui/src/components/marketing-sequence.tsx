import { cn } from "@healthalyst/ui/lib/utilities";

/** One stage in an ordered sequence. */
export interface MarketingSequenceStep {
  title: string;
  description: string;
}

/**
 * An ordered list for steps that happen in order. Each numeral sits in a
 * circle with the subtle accent background and an accent outline, joined to
 * the next by a vertical line, so the order reads at a glance.
 */
export function MarketingSequence({
  steps,
  className,
}: {
  steps: readonly MarketingSequenceStep[];
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((step, stepIndex) => (
        <li
          key={step.title}
          className="relative grid grid-cols-[2rem_1fr] gap-4 pb-7 last:pb-0"
        >
          {stepIndex < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[15px] top-8 w-0 border-l-2 border-dotted border-accent"
            />
          )}
          <span className="relative flex size-8 items-center justify-center rounded-full border border-accent bg-accent-subtle text-sm font-semibold tabular-nums text-foreground">
            {stepIndex + 1}
          </span>
          <div className="pt-1">
            <h3 className="text-base font-semibold leading-snug text-foreground">
              {step.title}
            </h3>
            <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
