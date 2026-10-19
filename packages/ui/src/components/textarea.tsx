"use client";

import * as React from "react";

import { FORM_CONTROL_CLASS_NAME } from "@healthalyst/ui/lib/form-control-variants";
import { cn } from "@healthalyst/ui/lib/utilities";

/** Multi-line text control. Set its visible height with the `rows` attribute. */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...properties }, elementReference) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        FORM_CONTROL_CLASS_NAME,
        "flex min-h-[60px] py-3",
        className
      )}
      ref={elementReference}
      {...properties}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
