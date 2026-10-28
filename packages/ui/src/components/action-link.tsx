"use client";

import type { MouseEventHandler, ReactElement } from "react";
import type { VariantProps as VariantProperties } from "class-variance-authority";
import {
  Button as ShadcnButton,
  type buttonVariants,
} from "@healthalyst/ui/primitives/button";

type ActionLinkProperties = VariantProperties<typeof buttonVariants> & {
  /**
   * The link element, such as a Next.js `Link` or an anchor, with its visible
   * text. It keeps its own destination and receives the button styling.
   */
  children: ReactElement;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

/**
 * Navigation that looks like a button. The rendered element stays a link, so
 * it keeps link semantics, opens in a new tab on request and is announced as a
 * link. It shares the button variants with `ActionButton`.
 */
function ActionLink({
  children,
  className,
  variant,
  size,
  shape,
  onClick,
}: ActionLinkProperties) {
  return (
    <ShadcnButton
      asChild
      variant={variant}
      size={size}
      shape={shape}
      className={className}
      onClick={onClick}
    >
      {children}
    </ShadcnButton>
  );
}

export { ActionLink };
export type { ActionLinkProperties };
