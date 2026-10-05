import * as React from "react";
import { cn } from "~/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "block w-full appearance-none rounded-[3px] border-[1.5px] border-solid border-sand bg-white px-4 py-[14px] font-sans text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-forest disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
