import { cloneElement, type ReactElement, type ReactNode } from "react";
import { ArrowRightIcon } from "@healthalyst/icons";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * Styles a link element, such as a Next.js `Link`, as a text link with a
 * small accent arrow that moves on hover. The link's own text names where it
 * goes.
 *
 * `stretched` extends the link's target over its nearest positioned ancestor,
 * such as a card, so the whole card opens the link. `small` suits a link that
 * sits beside a button and should not compete with it.
 */
export function MarketingArrowLink({
  link,
  stretched = false,
  tone = "default",
  size = "default",
}: {
  link: ReactElement<{ className?: string; children?: ReactNode }>;
  stretched?: boolean;
  /** `inverse` for a link on a brand-coloured field. */
  tone?: "default" | "inverse";
  size?: "default" | "small";
}) {
  return cloneElement(link, {
    className: cn(
      "group/action inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      size === "small"
        ? "gap-1.5 text-sm font-medium"
        : "gap-2 text-[15px] font-semibold",
      tone === "inverse"
        ? "text-primary-foreground focus-visible:ring-primary-foreground"
        : "text-foreground",
      stretched && "after:absolute after:inset-0 after:rounded-[inherit]"
    ),
    children: (
      <>
        {link.props.children}
        <ArrowRightIcon
          aria-hidden="true"
          className={cn(
            size === "small" ? "size-3.5" : "size-4",
            "text-accent transition-transform duration-200 group-hover/action:translate-x-0.5 motion-reduce:transition-none"
          )}
        />
      </>
    ),
  });
}
