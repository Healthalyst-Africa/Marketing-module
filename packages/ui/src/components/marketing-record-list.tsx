import type { ReactElement, ReactNode } from "react";
import { MarketingArrowLink } from "@healthalyst/ui/components/marketing-arrow-link";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import { cn } from "@healthalyst/ui/lib/utilities";

/** One labelled row in a record list. */
export interface MarketingRecord {
  term: string;
  description: ReactNode;
  /** Optional link element whose visible text names where it goes. */
  action?: ReactElement<{ className?: string; children?: ReactNode }>;
  /**
   * Optional illustration from `@healthalyst/ui/illustrations`, shown at
   * 80 px above the term.
   */
  illustration?: ReactNode;
  /**
   * Optional icon from `@healthalyst/icons` in a ring to the left of the
   * entry, such as for a contact detail.
   */
  icon?: ReactNode;
}

/**
 * Labelled entries separated by space. Use it instead of a grid of cards when
 * each item is a label, a short explanation and at most one link. Laid out in
 * columns, each entry fills its row so the links line up along the bottom.
 */
export function MarketingRecordList({
  records,
  className,
}: {
  records: readonly MarketingRecord[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col gap-7", className)}>
      {records.map((record) => (
        <div
          key={record.term}
          className={cn("relative flex flex-col", record.icon && "pl-11")}
        >
          <dt className="text-base font-semibold leading-snug text-foreground">
            {record.icon && (
              <MarketingIconBadge
                icon={record.icon}
                size="small"
                className="absolute left-0 top-0"
              />
            )}
            {record.illustration && (
              <span aria-hidden="true" className="mb-5 block size-20">
                {record.illustration}
              </span>
            )}
            {record.term}
          </dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
            {record.description}
          </dd>
          {record.action && (
            <dd className="mt-auto pt-3">
              <MarketingArrowLink link={record.action} />
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
