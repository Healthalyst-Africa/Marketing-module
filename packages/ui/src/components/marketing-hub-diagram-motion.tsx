"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import {
  HUB_BOX_CLASSES,
  HUB_CANVAS_VIEW_BOX,
  HUB_CONNECTOR_PATHS,
} from "@healthalyst/ui/lib/hub-diagram-geometry";
import { SHOW_MOTION_CONTROLS } from "@healthalyst/ui/lib/motion-controls";
import { cn } from "@healthalyst/ui/lib/utilities";

/** Time between pulses; each pulse reaches all six destinations at once. */
const PULSE_INTERVAL_IN_MILLISECONDS = 2400;

/** How long the destinations stay lit after a pulse is sent. */
const LIT_DURATION_IN_MILLISECONDS = 1700;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

/**
 * The motion layer of `MarketingHubDiagram`. It wraps the server-rendered
 * diagram, marks the signal as arrived through `data-signal` (the diagram's
 * own classes light every node up), and draws the signals travelling along
 * all six connectors together, the hub's pulse and the pause control. Without it, or under reduced motion,
 * the diagram is complete and still.
 */
export function MarketingHubDiagramMotion({
  pauseLabel,
  playLabel,
  className,
  children,
}: {
  pauseLabel: string;
  playLabel: string;
  className?: string;
  children: ReactNode;
}) {
  const diagramReference = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [signalCount, setSignalCount] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isRunning = !prefersReducedMotion && !isPaused && !isHeld && isVisible;

  useEffect(() => {
    const diagram = diagramReference.current;

    if (!diagram) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(([entry]) =>
      setIsVisible(entry?.isIntersecting ?? false)
    );
    intersectionObserver.observe(diagram);

    return () => intersectionObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    let unlightTimeout = 0;
    const sendPulse = () => {
      setSignalCount((count) => count + 1);
      setIsLit(true);
      window.clearTimeout(unlightTimeout);
      unlightTimeout = window.setTimeout(
        () => setIsLit(false),
        LIT_DURATION_IN_MILLISECONDS
      );
    };

    sendPulse();
    const interval = window.setInterval(
      sendPulse,
      PULSE_INTERVAL_IN_MILLISECONDS
    );

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(unlightTimeout);
      setIsLit(false);
    };
  }, [isRunning]);

  return (
    <div
      ref={diagramReference}
      data-signal={isLit ? "on" : "off"}
      className={cn("group/hub relative", className)}
      onPointerEnter={() => setIsHeld(true)}
      onPointerLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={(focusEvent) => {
        if (!focusEvent.currentTarget.contains(focusEvent.relatedTarget)) {
          setIsHeld(false);
        }
      }}
    >
      {children}
      {!prefersReducedMotion && signalCount > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 lg:aspect-[1200/560]"
        >
          <svg
            focusable="false"
            viewBox={HUB_CANVAS_VIEW_BOX}
            className="absolute inset-0 hidden size-full lg:block"
          >
            {HUB_CONNECTOR_PATHS.map((path, pathIndex) => (
              <path
                key={`signal-${signalCount}-${pathIndex}`}
                d={path}
                pathLength={100}
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="12 100"
                strokeDashoffset="12"
                className="animate-[marketing-hub-signal_0.9s_ease-in-out_forwards] stroke-accent"
              />
            ))}
          </svg>
          <span
            key={`pulse-${signalCount}`}
            className={cn(
              "absolute left-1/2 top-0 size-44 -translate-x-1/2 animate-[marketing-hub-pulse_0.9s_ease-out_forwards] rounded-[32px] border-2 border-accent lg:translate-x-0",
              HUB_BOX_CLASSES
            )}
          />
        </div>
      )}
      {SHOW_MOTION_CONTROLS && !prefersReducedMotion && (
        <div className="mt-6 flex justify-center lg:-mt-12">
          <ActionButton
            type="button"
            variant="ghost"
            size="large"
            onClick={() => setIsPaused((paused) => !paused)}
            leadingIcon={isPaused ? <PlayIcon /> : <PauseIcon />}
          >
            {isPaused ? playLabel : pauseLabel}
          </ActionButton>
        </div>
      )}
    </div>
  );
}
