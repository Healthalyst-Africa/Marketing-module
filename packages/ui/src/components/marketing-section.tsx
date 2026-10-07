import type { ComponentProps as ComponentProperties, ReactNode } from "react";
import { cn } from "@healthalyst/ui/lib/utilities";

export interface MarketingSectionContent {
  heading: ReactNode;
  paragraphs: readonly string[];
}

export function MarketingContainer({
  className,
  ...properties
}: ComponentProperties<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-10", className)}
      {...properties}
    />
  );
}

export function MarketingSection({
  className,
  ...properties
}: ComponentProperties<"section">) {
  return (
    <section
      className={cn("scroll-mt-28 py-16 md:py-24", className)}
      {...properties}
    />
  );
}

export function MarketingIntroduction({
  content,
  className,
}: {
  content: MarketingSectionContent;
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16", className)}
    >
      <div>
        <h2 className="max-w-[20ch] text-balance font-serif text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-tight text-primary [&_em]:font-normal">
          {content.heading}
        </h2>
      </div>
      {content.paragraphs.length > 0 && (
        <div className="flex max-w-[65ch] flex-col justify-end gap-5 text-base leading-[1.8] text-muted-foreground">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export function BrandLockup({
  mark,
  name,
  subtitle,
}: {
  mark: ReactNode;
  name: string;
  subtitle: string;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="relative block h-12 w-11 shrink-0 overflow-hidden bg-white">
        {mark}
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-sans text-xl font-semibold leading-none tracking-[-0.04em]">
          {name}
        </span>
        <span className="text-xs leading-none tracking-[0.05em]">
          {subtitle}
        </span>
      </span>
    </span>
  );
}
