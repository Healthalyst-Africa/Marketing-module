"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  cva as createClassVariants,
  type VariantProps as VariantProperties,
} from "class-variance-authority";

import { cn } from "@healthalyst/ui/lib/utilities";

const Tabs = TabsPrimitive.Root;

/** `steps` stacks the triggers as a vertical list of steps. */
const tabsListVariants = createClassVariants("", {
  variants: {
    variant: {
      default:
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      steps: "flex flex-col items-stretch gap-2",
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
 * `step` is a full-width row for a `steps` list: quiet until selected, then
 * set on the subtle accent surface with a soft accent edge.
 */
const tabsTriggerVariants = createClassVariants(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        step: "group/step flex w-full items-center gap-4 whitespace-normal rounded-xl border border-transparent px-4 py-3 text-left text-base font-medium text-muted-foreground transition-colors duration-200 hover:bg-accent-subtle hover:text-foreground data-[state=active]:border-accent/25 data-[state=active]:bg-accent-subtle data-[state=active]:text-foreground motion-reduce:transition-none",
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

/**
 * `crossfade` panels share one grid cell and fade between each other. Render
 * them with `forceMount` inside a grid; inactive panels are invisible, so they
 * cannot be focused or read.
 */
const tabsContentVariants = createClassVariants(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "mt-2",
        crossfade:
          "[grid-area:1/1] transition-[opacity,visibility] duration-500 ease-out data-[state=active]:visible data-[state=inactive]:invisible data-[state=active]:opacity-100 data-[state=inactive]:opacity-0 motion-reduce:transition-none",
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
