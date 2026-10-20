import { cloneElement, type ReactElement, type ReactNode } from "react";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";

/** One chip: a ringed icon and a label, opening `link`. */
export interface MarketingChip {
  label: string;
  icon: ReactNode;
  /** A link element without children; the chip supplies its content. */
  link: ReactElement<{ className?: string; children?: ReactNode }>;
}

/**
 * A short caption over a row of linked chips, such as the audiences a site
 * serves. The chips wrap and centre on wide screens and scroll sideways, one
 * snap point per chip, on phones.
 */
export function MarketingChipRow({
  label,
  chips,
}: {
  /** The caption, which also names the list. */
  label: string;
  chips: readonly MarketingChip[];
}) {
  return (
    <section aria-label={label} className="hidden bg-card pb-4 pt-16 md:block">
      <MarketingContainer>
        <p className="text-center text-sm font-medium text-muted-foreground">
          {label}
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-3">
          {chips.map((chip) => (
            <li key={chip.label}>
              {cloneElement(chip.link, {
                className:
                  "flex min-h-11 items-center gap-3 rounded-full border border-primary/20 bg-card py-1.5 pl-1.5 pr-5 text-[15px] font-semibold text-foreground transition-colors duration-200 hover:border-accent hover:bg-accent-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
                children: (
                  <>
                    <MarketingIconBadge icon={chip.icon} size="small" />
                    {chip.label}
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
