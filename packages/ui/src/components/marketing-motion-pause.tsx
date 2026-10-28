"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { SHOW_MOTION_CONTROLS } from "@healthalyst/ui/config/motion-controls";
import { cn } from "@healthalyst/ui/lib/utilities";

interface MarketingMotionPauseValue {
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

const MarketingMotionPauseContext =
  createContext<MarketingMotionPauseValue | null>(null);

/**
 * Shares one pause state between the moving parts of a section, such as a
 * hero's background pattern and its rotating word, so a single control
 * pauses them all (WCAG 2.2.2).
 */
export function MarketingMotionPauseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <MarketingMotionPauseContext.Provider value={{ isPaused, setIsPaused }}>
      {children}
    </MarketingMotionPauseContext.Provider>
  );
}

/** The shared pause state, or `null` outside a provider. */
export function useMarketingMotionPause() {
  return useContext(MarketingMotionPauseContext);
}

/**
 * The control for a `MarketingMotionPauseProvider`, as a round icon button
 * for a brand-coloured field. Hidden under reduced motion, when nothing
 * moves, and outside development (`SHOW_MOTION_CONTROLS`).
 */
export function MarketingMotionPauseButton({
  pauseLabel = "Pause animation",
  playLabel = "Play animation",
  className,
}: {
  pauseLabel?: string;
  playLabel?: string;
  className?: string;
}) {
  const sharedPause = useMarketingMotionPause();

  if (!sharedPause || !SHOW_MOTION_CONTROLS) {
    return null;
  }

  const { isPaused, setIsPaused } = sharedPause;

  return (
    <ActionButton
      type="button"
      variant="inverseGhost"
      size="largeIcon"
      shape="pill"
      aria-label={isPaused ? playLabel : pauseLabel}
      onClick={() => setIsPaused(!isPaused)}
      className={cn("motion-reduce:hidden", className)}
    >
      {isPaused ? (
        <PlayIcon aria-hidden="true" />
      ) : (
        <PauseIcon aria-hidden="true" />
      )}
    </ActionButton>
  );
}
