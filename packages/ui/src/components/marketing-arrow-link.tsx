import { cloneElement, type ReactElement, type ReactNode } from "react";
import { ArrowRightIcon } from "@healthalyst/icons";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * Styles a link element, such as a Next.js `Link`, as a text link with a
 * small accent arrow that moves on hover. The link's own text names where it
 * goes.
 *
 * `stretched` extends the link's target over its nearest positioned ancestor,
 * such as a card, so the whole card opens the link.
 */
export function MarketingArrowLink({
  link,
  stretched = false,
  tone = "default",
}: {
  link: ReactElement<{ className?: string; children?: ReactNode }>;
  stretched?: boolean;
  /** `inverse` for a link on a brand-coloured field. */
  tone?: "default" | "inverse";
}) {
  return cloneElement(link, {
    className: cn(
      "group/action inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
          className="size-4 text-accent transition-transform duration-200 group-hover/action:translate-x-0.5 motion-reduce:transition-none"
        />
      </>
    ),
  });
}
