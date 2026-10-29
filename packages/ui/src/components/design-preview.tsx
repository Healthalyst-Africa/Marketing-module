import type { ReactElement } from "react";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { cn } from "@healthalyst/ui/lib/utilities";

export interface DesignPreviewContent {
  heading: string;
  description: string;
  primaryAction: ReactElement;
  secondaryAction: ReactElement;
}

export function DesignPreview({
  content,
  className,
}: {
  content: DesignPreviewContent;
  className?: string;
}) {
  return (
    <section
      aria-label="Website colour preview"
      className={cn(
        "overflow-hidden rounded-xl bg-primary text-primary-foreground",
        className
      )}
    >
      <div className="grid gap-8 p-6 sm:p-10">
        <h3 className="max-w-[16ch] font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          {content.heading}
        </h3>
        <p className="max-w-[58ch] text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
          {content.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <ActionLink className="h-auto min-h-11 whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent focus-visible:ring-offset-primary">
            {content.primaryAction}
          </ActionLink>
          <ActionLink
            variant="inverseOutline"
            className="h-auto min-h-11 whitespace-normal border-primary-foreground/40 focus-visible:ring-accent"
          >
            {content.secondaryAction}
          </ActionLink>
        </div>
      </div>
      <div aria-hidden="true" className="h-3 bg-accent" />
    </section>
  );
}
