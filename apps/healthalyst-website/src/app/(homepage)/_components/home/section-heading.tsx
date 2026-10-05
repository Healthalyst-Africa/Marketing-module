import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

/** Small uppercase eyebrow above a section heading. */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Large serif display heading used at the top of each section. */
export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-[1.1] text-forest",
        className
      )}
    >
      {children}
    </h2>
  );
}

/** Reveal wrapper — applies the `.reveal` transition once `show` is set. */
export function Reveal({
  visible,
  className,
  children,
}: {
  visible: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("reveal", visible && "show", className)}>{children}</div>
  );
}
