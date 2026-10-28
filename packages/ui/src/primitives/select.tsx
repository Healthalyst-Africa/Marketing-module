"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { VariantProps as VariantProperties } from "class-variance-authority";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SelectedIcon,
} from "@healthalyst/icons";

import { formControlVariants } from "@healthalyst/ui/lib/form-control-variants";
import { cn } from "@healthalyst/ui/lib/utilities";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectTriggerProperties = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> &
  VariantProperties<typeof formControlVariants>;

/**
 * The closed select. It shares the surface, focus ring, rejected and disabled
 * states of the other form controls, and shows its placeholder like the
 * other controls' placeholders (14 px, secondary text at 60%) until the
 * visitor chooses.
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProperties
>(({ className, children, controlSize, ...properties }, elementReference) => (
  <SelectPrimitive.Trigger
    ref={elementReference}
    data-size={controlSize ?? "default"}
    className={cn(
      formControlVariants({ controlSize }),
      "flex items-center justify-between gap-2 py-2 text-left data-[placeholder]:text-sm data-[placeholder]:text-muted-foreground/60 [&>span]:line-clamp-1",
      className
    )}
    {...properties}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...properties }, elementReference) => (
  <SelectPrimitive.ScrollUpButton
    ref={elementReference}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...properties}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...properties }, elementReference) => (
  <SelectPrimitive.ScrollDownButton
    ref={elementReference}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...properties}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
  (
    { className, children, position = "popper", ...properties },
    elementReference
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={elementReference}
        className={cn(
          "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-y-auto overflow-x-hidden rounded-[8px] border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-reduce:animate-none",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...properties}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...properties }, elementReference) => (
  <SelectPrimitive.Label
    ref={elementReference}
    className={cn("px-3 py-1.5 text-sm font-semibold", className)}
    {...properties}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * One choice in the open list. Items are at least 44 px tall for touch, and
 * the highlighted item uses the secondary tint like other hover states.
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...properties }, elementReference) => (
  <SelectPrimitive.Item
    ref={elementReference}
    className={cn(
      "relative flex min-h-11 w-full cursor-default select-none items-center rounded-[4px] py-2 pl-3 pr-9 text-base text-foreground outline-none focus:bg-secondary focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...properties}
  >
    <span className="absolute right-3 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <SelectedIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...properties }, elementReference) => (
  <SelectPrimitive.Separator
    ref={elementReference}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...properties}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
export type { SelectTriggerProperties };
