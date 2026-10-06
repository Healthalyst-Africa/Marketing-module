import * as React from "react";
import { Input as SharedInput } from "@healthalyst/ui/components/input";
import { cn } from "~/lib/utilities";

export type InputProperties = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProperties>(
  ({ className, type = "text", ...properties }, elementReference) => (
    <SharedInput
      ref={elementReference}
      type={type}
      className={cn(
        "block h-auto w-full shadow-none md:text-[14px] appearance-none rounded-[3px] border-[1.5px] border-solid border-sand bg-white px-4 py-[14px] font-sans text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-forest disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...properties}
    />
  )
);
Input.displayName = "Input";

export { Input };
