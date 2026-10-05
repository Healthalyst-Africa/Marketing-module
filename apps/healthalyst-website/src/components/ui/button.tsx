import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-block whitespace-nowrap rounded-[2px] border-none text-center transition-all [transition-duration:250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Solid forest-green call to action. */
        primary:
          "bg-forest text-white text-[13px] font-semibold tracking-[0.08em] hover:-translate-y-px hover:bg-forest-mid hover:shadow-[0_8px_28px_rgba(24,48,32,0.22)]",
        /** Solid gold call to action. */
        gold: "bg-gold text-ink text-[13px] font-semibold tracking-[0.08em] hover:-translate-y-px hover:bg-gold-light hover:shadow-[0_8px_28px_rgba(184,147,90,0.28)]",
        /** Outlined button for light surfaces. */
        secondary:
          "border-[1.5px] border-solid border-sand-dark bg-transparent text-forest text-[13px] font-medium tracking-[0.04em] hover:border-forest hover:bg-cream-dark",
        /** Outlined button for dark surfaces. */
        ghost:
          "border-[1.5px] border-solid border-white/20 bg-transparent text-white/75 text-[13px] font-medium tracking-[0.04em] hover:border-white/50 hover:text-white",
        /** Unstyled button used for navigation and card triggers. */
        link: "bg-transparent p-0 text-inherit",
      },
      size: {
        default: "px-8 py-[14px]",
        compact: "px-7 py-[13px]",
        block: "w-full px-8 py-4 text-[14px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
