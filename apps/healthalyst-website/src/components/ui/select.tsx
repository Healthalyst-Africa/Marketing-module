import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Native select styled to match the form inputs.
 *
 * Radix's `Select` is not used because the contact form relies on native
 * `<option>` semantics for reliability across assistive technology.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "block w-full appearance-none rounded-[3px] border-[1.5px] border-solid border-sand bg-white px-4 py-[14px] pr-10 font-sans text-[14px] text-ink outline-none transition-colors focus:border-forest disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      />
    </div>
  )
);
Select.displayName = "Select";

export { Select };
