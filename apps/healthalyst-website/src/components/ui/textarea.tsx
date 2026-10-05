import * as React from "react";
import { cn } from "~/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "block w-full resize-y rounded-[3px] border-[1.5px] border-solid border-sand bg-white px-4 py-[14px] font-sans text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-forest disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
