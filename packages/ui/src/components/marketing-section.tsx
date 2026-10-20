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
    <span className="inline-flex items-center gap-2.5 md:gap-3">
      <span className="relative block h-9 w-[33px] shrink-0 overflow-hidden bg-white md:h-12 md:w-11">
        {mark}
      </span>
      <span className="flex flex-col gap-0.5 md:gap-1">
        <span className="font-sans text-base font-semibold leading-none tracking-[-0.03em] md:text-xl md:tracking-[-0.04em]">
          {name}
        </span>{" "}
        <span className="text-[11px] leading-none tracking-[0.05em] md:text-xs">
          {subtitle}
        </span>
      </span>
    </span>
  );
}
