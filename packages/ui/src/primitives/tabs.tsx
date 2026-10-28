"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  cva as createClassVariants,
  type VariantProps as VariantProperties,
} from "class-variance-authority";

import { cn } from "@healthalyst/ui/lib/utilities";

const Tabs = TabsPrimitive.Root;

/** `pills` centres a wrapping row of pill triggers. */
const tabsListVariants = createClassVariants("", {
  variants: {
    variant: {
      default:
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      pills: "flex flex-wrap items-center justify-center gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProperties<typeof tabsListVariants>
>(({ className, variant, ...properties }, elementReference) => (
  <TabsPrimitive.List
    ref={elementReference}
    className={cn(tabsListVariants({ variant }), className)}
    {...properties}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * `inversePill` is a pill for a `pills` list on a brand-coloured field:
 * outlined, then filled with the light foreground when selected.
 */
const tabsTriggerVariants = createClassVariants(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        inversePill:
          "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-primary-foreground/40 px-5 text-[15px] font-semibold text-primary-foreground ring-offset-primary transition-colors duration-200 hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground data-[state=active]:border-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary motion-reduce:transition-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProperties<typeof tabsTriggerVariants>
>(({ className, variant, ...properties }, elementReference) => (
  <TabsPrimitive.Trigger
    ref={elementReference}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...properties}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const tabsContentVariants = createClassVariants(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "mt-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
    VariantProperties<typeof tabsContentVariants>
>(({ className, variant, ...properties }, elementReference) => (
  <TabsPrimitive.Content
    ref={elementReference}
    className={cn(tabsContentVariants({ variant }), className)}
    {...properties}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
