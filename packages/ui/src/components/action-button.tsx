"use client";

import { forwardRef, type ReactNode } from "react";
import { LoaderIcon } from "@healthalyst/icons";
import {
  Button as ShadcnButton,
  type ButtonProperties as ShadcnButtonProperties,
} from "@healthalyst/ui/primitives/button";

type ActionButtonProperties = Omit<ShadcnButtonProperties, "asChild"> & {
  /** Disables the button, marks it busy and shows a spinner. */
  isLoading?: boolean;
  /** Label shown while loading; defaults to the normal label. */
  loadingText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

/**
 * The button for actions. It is the only component that renders the shadcn
 * `Button` as a `<button>`, so loading, disabled and icon behaviour stay the
 * same everywhere. Use `ActionLink` when the control navigates.
 */
const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProperties>(
  (
    {
      children,
      disabled = false,
      isLoading = false,
      loadingText,
      leadingIcon,
      trailingIcon,
      ...buttonProperties
    },
    elementReference
  ) => (
    <ShadcnButton
      {...buttonProperties}
      ref={elementReference}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? (
        <>
          <LoaderIcon
            aria-hidden="true"
            className="animate-spin motion-reduce:animate-none"
          />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {leadingIcon && (
            <span aria-hidden="true" data-icon="inline-start">
              {leadingIcon}
            </span>
          )}
          {children}
          {trailingIcon && (
            <span aria-hidden="true" data-icon="inline-end">
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </ShadcnButton>
  )
);

ActionButton.displayName = "ActionButton";

export { ActionButton };
export type { ActionButtonProperties };
