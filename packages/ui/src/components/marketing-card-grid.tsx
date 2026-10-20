import type { ReactElement, ReactNode } from "react";
import { MarketingArrowLink } from "@healthalyst/ui/components/marketing-arrow-link";
import { cn } from "@healthalyst/ui/lib/utilities";

/** One card: an optional illustration, a title, a short description and a link. */
export interface MarketingCard {
  title: string;
  description: ReactNode;
  /**
   * A contained image or inline illustration; the card frames it at 4:3 and
   * sets its main colour to the brand colour and its accent to the accent.
   */
  illustration?: ReactNode;
  /** A link element whose visible text names where it goes. */
  action?: ReactElement<{ className?: string; children?: ReactNode }>;
}

/**
 * Cards for items that each lead somewhere, on the subtle accent surface with
 * a subtle shadow and no border. Use a record list instead when items have no
 * link.
 *
 * The whole card opens its link. On hover or keyboard focus the card lifts,
 * its shadow deepens and its illustration grows slightly. On devices that can
 * hover, the link fades in only then; on touch screens it is always visible.
 * Under reduced motion nothing moves.
 */
export function MarketingCardGrid({
  cards,
  className,
}: {
  cards: readonly MarketingCard[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {cards.map((card) => (
        <li
          key={card.title}
          className={cn(
            "group/card relative flex flex-col rounded-xl bg-accent-subtle p-6 shadow-[0_1px_2px_rgba(15,23,20,0.04),0_4px_16px_rgba(15,23,20,0.06)] transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none",
            card.action &&
              "hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(15,23,20,0.05),0_12px_28px_rgba(15,23,20,0.10)] focus-within:-translate-y-1 focus-within:shadow-[0_2px_4px_rgba(15,23,20,0.05),0_12px_28px_rgba(15,23,20,0.10)] motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0"
          )}
        >
          {card.illustration && (
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-background text-primary [--illustration-accent:hsl(var(--accent))]">
              <div className="absolute inset-6 transition-transform duration-500 ease-out group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 [&>*]:size-full">
                {card.illustration}
              </div>
            </div>
          )}
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {card.title}
          </h3>
          <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
            {card.description}
          </p>
          {/* The link fades without moving: a transform on this wrapper would
              confine the stretched link to it instead of the whole card. */}
          {card.action && (
            <div className="mt-auto pt-4 transition-opacity duration-300 ease-out group-focus-within/card:opacity-100 group-hover/card:opacity-100 motion-reduce:transition-none [@media(hover:hover)]:opacity-0">
              <MarketingArrowLink link={card.action} stretched />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
