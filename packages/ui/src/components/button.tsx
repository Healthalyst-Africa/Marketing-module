"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  cva as createClassVariants,
  type VariantProps as VariantProperties,
} from "class-variance-authority";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * Button styles. Compositions do not render `Button` directly: use
 * `ActionButton` for actions and `ActionLink` for navigation that should look
 * like a button. Both pass these variants through unchanged.
 */
const buttonVariants = createClassVariants(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-busy:opacity-80 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** No visual styling, for branded wrappers that supply their own. */
        unstyled: "",
        /** The primary action: brand fill. */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /** A secondary action: control outline on the working surface. */
        outline:
          "border border-input bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /** The primary action on a brand-coloured field: inverted fill. */
        inverse:
          "bg-primary-foreground text-primary hover:bg-primary-foreground/90 focus-visible:ring-primary-foreground focus-visible:ring-offset-primary",
        /** A secondary action on a brand-coloured field. */
        inverseOutline:
          "border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground focus-visible:ring-offset-primary",
      },
      size: {
        unstyled: "",
        default: "h-10 px-4 py-2 text-sm",
        small: "h-9 px-3 text-sm",
        large: "h-11 px-6 text-[15px]",
        extraLarge: "h-12 px-8 text-base",
        icon: "size-10",
        largeIcon: "size-11 [&_svg]:size-5",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

export interface ButtonProperties
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProperties<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    { asChild = false, className, variant, size, shape, ...properties },
    elementReference
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={elementReference}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...properties}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
