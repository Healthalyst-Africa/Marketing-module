import type { ReactNode } from "react";
import { cn } from "@healthalyst/ui/lib/utilities";

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
        "mb-5 font-mono text-[10px] font-medium tracking-[0.22em] text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

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
        "font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-[1.1] text-primary",
        className
      )}
    >
      {children}
    </h2>
  );
}

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
