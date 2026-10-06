import type { CSSProperties } from "react";
import { cn } from "@healthalyst/ui/lib/utilities";

export function ColorSwatch({
  color,
  label,
  compact = false,
}: {
  color: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex min-w-0 flex-col gap-2",
        compact && "flex-row items-center"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-14 w-full rounded-md border border-foreground/10",
          compact && "size-6 shrink-0 rounded-full"
        )}
        style={{ backgroundColor: color } satisfies CSSProperties}
      />
      {compact ? (
        <span className="sr-only">
          {label}: {color}
        </span>
      ) : (
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {color.toLowerCase()}
          </span>
        </span>
      )}
    </span>
  );
}
