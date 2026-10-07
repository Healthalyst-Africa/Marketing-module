import * as React from "react";
import { Textarea as SharedTextarea } from "@healthalyst/ui/components/textarea";
import { cn } from "~/lib/utilities";

export type TextareaProperties =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProperties>(
  ({ className, ...properties }, elementReference) => (
    <SharedTextarea
      ref={elementReference}
      className={cn(
        "block h-auto w-full shadow-none md:text-[14px] resize-y rounded-[3px] border-[1.5px] border-solid border-sand bg-white px-4 py-[14px] font-sans text-[14px] text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-forest disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...properties}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
