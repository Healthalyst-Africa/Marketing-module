import type { ReactElement, ReactNode } from "react";
import { MarketingArrowLink } from "@healthalyst/ui/components/marketing-arrow-link";
import { cn } from "@healthalyst/ui/lib/utilities";

/** One labelled row in a record list. */
export interface MarketingRecord {
  term: string;
  description: ReactNode;
  /** Optional link element whose visible text names where it goes. */
  action?: ReactElement<{ className?: string; children?: ReactNode }>;
}

/**
 * Labelled entries separated by space. Use it instead of a grid of cards when
 * each item is a label, a short explanation and at most one link.
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
        <div key={record.term}>
          <dt className="text-base font-semibold leading-snug text-foreground">
            {record.term}
          </dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
            {record.description}
          </dd>
          {record.action && (
            <dd className="mt-3">
              <MarketingArrowLink link={record.action} />
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
