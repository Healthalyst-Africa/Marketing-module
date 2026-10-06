"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent as SharedAccordionContent,
  AccordionItem as SharedAccordionItem,
  AccordionTrigger as SharedAccordionTrigger,
} from "@healthalyst/ui/components/accordion";
import { cn } from "~/lib/utilities";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof SharedAccordionItem>,
  React.ComponentPropsWithoutRef<typeof SharedAccordionItem>
>(({ className, ...properties }, elementReference) => (
  <SharedAccordionItem
    ref={elementReference}
    className={cn("border-b-0 border-t border-sand", className)}
    {...properties}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof SharedAccordionTrigger>,
  React.ComponentPropsWithoutRef<typeof SharedAccordionTrigger>
>(({ className, ...properties }, elementReference) => (
  <SharedAccordionTrigger
    ref={elementReference}
    showIndicator={false}
    className={cn(
      "group items-start gap-6 py-6 hover:text-forest hover:no-underline focus-visible:ring-gold",
      className
    )}
    {...properties}
  />
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof SharedAccordionContent>,
  React.ComponentPropsWithoutRef<typeof SharedAccordionContent>
>(({ className, ...properties }, elementReference) => (
  <SharedAccordionContent
    ref={elementReference}
    className={cn("pb-7 pt-0", className)}
    {...properties}
  />
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
