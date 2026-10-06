"use client";

import { Button } from "@healthalyst/ui/components/button";
import { useState } from "react";
import { cn } from "~/lib/utilities";
import type { Step } from "~/types";

/** Selectable step in the "How We Work" process list. */
export default function StepButton({
  step,
  active,
  onClick,
}: {
  step: Step;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={active}
      className={cn(
        "mb-1 block w-full whitespace-normal rounded-l-none font-normal rounded-r-[4px] border-y-0 border-r-0 border-l-[3px] border-solid px-7 py-6 text-left transition-all duration-200",
        active
          ? "border-l-gold bg-cream-light"
          : hovered
            ? "border-l-sand bg-cream-dark"
            : "border-l-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "mb-1.5 font-mono text-[11px] tracking-[0.16em] transition-colors",
          active ? "text-primary" : "text-muted-foreground"
        )}
      >
        {step.number}
      </div>
      <div
        className={cn(
          "text-[15px] transition-colors",
          active ? "font-semibold text-forest" : "font-normal text-ink-soft"
        )}
      >
        {step.title}
      </div>
    </Button>
  );
}
