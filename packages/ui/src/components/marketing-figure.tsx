import type { ReactNode } from "react";
import { cn } from "@healthalyst/ui/lib/utilities";

const ASPECT_CLASS_NAMES = {
  portrait: "aspect-[4/5]",
  balanced: "aspect-[5/4]",
  landscape: "aspect-[3/2]",
} as const;

/**
 * A photograph in a fixed-ratio frame. Supply a filled responsive image; the
 * frame crops it so layouts do not shift while it loads.
 */
export function MarketingFigure({
  image,
  caption,
  aspect = "landscape",
  className,
}: {
  image: ReactNode;
  caption?: ReactNode;
  aspect?: keyof typeof ASPECT_CLASS_NAMES;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-secondary",
          ASPECT_CLASS_NAMES[aspect]
        )}
      >
        {image}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
