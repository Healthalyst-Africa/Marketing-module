import type { ReactNode } from "react";

/**
 * The bottom-right corner stack for controls that float over every page, such
 * as a chat link and the back-to-top button. Earlier children sit higher. The
 * stack itself lets clicks through, so each control opts back in with
 * `pointer-events-auto` while it is usable.
 */
export function MarketingFloatingActions({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 md:bottom-8 md:right-8">
      {children}
    </div>
  );
}
