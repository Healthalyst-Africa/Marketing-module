import type { ReactNode } from "react";
import {
  cva as createClassVariants,
  type VariantProps as VariantProperties,
} from "class-variance-authority";
import { cn } from "@healthalyst/ui/lib/utilities";

const iconBadgeVariants = createClassVariants(
  "inline-flex shrink-0 items-center justify-center rounded-full border bg-transparent transition-colors duration-500 ease-out motion-reduce:transition-none [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        /** Brand colour ring and glyph: the default for product and feature icons. */
        primary: "border-primary/60 text-primary",
        /** Accent ring around a brand-colour glyph, for highlighted or secondary items. */
        accent: "border-accent text-primary",
        /** Light ring and glyph for icons on a brand-coloured field. */
        inverse: "border-primary-foreground/50 text-primary-foreground",
      },
      size: {
        small: "size-8 [&_svg]:size-4 [&_svg]:stroke-[1.75]",
        default: "size-10 [&_svg]:size-5 [&_svg]:stroke-[1.75]",
        large: "size-16 [&_svg]:size-7 [&_svg]:stroke-[1.5]",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "default",
    },
  }
);

/**
 * An icon in a thin circular ring with no fill: the site's single treatment
 * for product, feature and contact icons. The icon is decorative and hidden
 * from assistive technology; the text beside it carries the meaning.
 */
export function MarketingIconBadge({
  icon,
  tone,
  size,
  className,
}: {
  icon: ReactNode;
  className?: string;
} & VariantProperties<typeof iconBadgeVariants>) {
  return (
    <span
      aria-hidden="true"
      className={cn(iconBadgeVariants({ tone, size }), className)}
    >
      {icon}
    </span>
  );
}
