import type { ReactNode } from "react";
import { ActionLink } from "@healthalyst/ui/components/action-link";

/**
 * A round floating link to another service, such as a chat app, for use inside
 * `MarketingFloatingActions`. It opens in a new tab and is always visible. The
 * icon is its only content, so `label` supplies the accessible name.
 */
export function MarketingFloatingLink({
  destination,
  label,
  icon,
}: {
  /** The external address the link opens. */
  destination: string;
  /** Accessible name, which also shows as a tooltip. */
  label: string;
  /** A decorative icon, hidden from assistive technology by the caller. */
  icon: ReactNode;
}) {
  return (
    <ActionLink
      variant="floating"
      size="extraLargeIcon"
      shape="pill"
      className="pointer-events-auto"
    >
      <a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
      >
        {icon}
      </a>
    </ActionLink>
  );
}
