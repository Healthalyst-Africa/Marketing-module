"use client";

import * as React from "react";
import type { VariantProps as VariantProperties } from "class-variance-authority";

import { formControlVariants } from "@healthalyst/ui/lib/form-control-variants";
import { cn } from "@healthalyst/ui/lib/utilities";

type InputProperties = React.ComponentProps<"input"> &
  VariantProperties<typeof formControlVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProperties>(
  ({ className, type, controlSize, ...properties }, elementReference) => {
    return (
      <input
        type={type}
        data-slot="input"
        data-size={controlSize ?? "default"}
        className={cn(
          formControlVariants({ controlSize }),
          "flex py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className
        )}
        ref={elementReference}
        {...properties}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProperties };
