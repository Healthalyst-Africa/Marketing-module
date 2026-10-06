import * as React from "react";
import { NativeSelect } from "@healthalyst/ui/components/native-select";
import { cn } from "~/lib/utilities";

export type SelectProperties = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Native select styled to match the form inputs.
 *
 * Radix's `Select` is not used because the contact form relies on native
 * `<option>` semantics for reliability across assistive technology.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProperties>(
  ({ className, children, ...properties }, elementReference) => (
    <NativeSelect
      ref={elementReference}
      className={cn(
        "block h-auto w-full appearance-none rounded-[3px] border-[1.5px] border-solid border-sand bg-white px-4 py-[14px] pr-10 font-sans text-[14px] text-ink shadow-none outline-none transition-colors focus:border-forest disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...properties}
    >
      {children}
    </NativeSelect>
  )
);
Select.displayName = "Select";

export { Select };
