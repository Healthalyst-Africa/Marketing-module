"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { useMarketingMotionPause } from "@healthalyst/ui/components/marketing-motion-pause";
import { SHOW_MOTION_CONTROLS } from "@healthalyst/ui/lib/motion-controls";
import { cn } from "@healthalyst/ui/lib/utilities";

interface NetworkPoint {
  horizontal: number;
  vertical: number;
}

/** The shared record at the centre of the network. */
const HUB: NetworkPoint = { horizontal: 250, vertical: 150 };

/** Six care facilities around the hub, one for each kind of institution. */
const FACILITIES: readonly NetworkPoint[] = [
  { horizontal: 110, vertical: 60 },
  { horizontal: 300, vertical: 38 },
  { horizontal: 432, vertical: 112 },
  { horizontal: 404, vertical: 250 },
  { horizontal: 222, vertical: 266 },
  { horizontal: 72, vertical: 190 },
];

/** A gentle curve between two points, bowed to one side by `bend` units. */
function createCurve(
  start: NetworkPoint,
  end: NetworkPoint,
  bend: number
): string {
  const horizontalDistance = end.horizontal - start.horizontal;
  const verticalDistance = end.vertical - start.vertical;
  const length = Math.hypot(horizontalDistance, verticalDistance);
  const controlHorizontal =
    (start.horizontal + end.horizontal) / 2 -
    (verticalDistance / length) * bend;
  const controlVertical =
    (start.vertical + end.vertical) / 2 + (horizontalDistance / length) * bend;

  return `M${start.horizontal} ${start.vertical} Q${controlHorizontal.toFixed(1)} ${controlVertical.toFixed(1)} ${end.horizontal} ${end.vertical}`;
}

const SPOKES = FACILITIES.map((facility, facilityIndex) =>
  createCurve(facility, HUB, facilityIndex % 2 === 0 ? 18 : -18)
);

const RING_LINKS = FACILITIES.map((facility, facilityIndex) =>
  createCurve(
    facility,
    FACILITIES[(facilityIndex + 1) % FACILITIES.length] ?? facility,
    -14
  )
);

/**
 * A decorative, slowly animated picture of a connected healthcare system for
 * a brand-coloured page header: a faint field of medical crosses, and six
 * facilities linked to a shared record, with signals travelling between them.
 *
 * Place it inside a positioned, clipped container. It is hidden from
 * assistive technology, stays still when the visitor prefers reduced motion,
 * and offers a control to pause it. `reserveLowerSpace` keeps the network
 * clear of a panel that overlaps the bottom of the container. Inside a
 * `MarketingMotionPauseProvider` its control pauses every moving part in the
 * provider and shows on all screen sizes.
 */
export function MarketingCareNetwork({
  reserveLowerSpace = false,
  showNetwork = true,
  pauseLabel = "Pause background animation",
  playLabel = "Play background animation",
}: {
  reserveLowerSpace?: boolean;
  /**
   * `false` keeps only the static field of crosses, for headers whose text
   * is centred and would otherwise sit over the network; nothing moves, so
   * no pause control is shown.
   */
  showNetwork?: boolean;
  pauseLabel?: string;
  playLabel?: string;
}) {
  const identifierPrefix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const crossPatternIdentifier = `${identifierPrefix}-crosses`;
  const fadeIdentifier = `${identifierPrefix}-fade`;
  const fadeMaskIdentifier = `${identifierPrefix}-fade-mask`;
  const networkReference = useRef<SVGSVGElement>(null);
  const sharedPause = useMarketingMotionPause();
  const [isLocallyPaused, setIsLocallyPaused] = useState(false);
  const isPaused = sharedPause?.isPaused ?? isLocallyPaused;

  useEffect(() => {
    const network = networkReference.current;

    if (!network) {
      return;
    }

    if (isPaused) {
      network.pauseAnimations();
    } else {
      network.unpauseAnimations();
    }
  }, [isPaused]);

  function togglePause() {
    if (sharedPause) {
      sharedPause.setIsPaused(!isPaused);
    } else {
      setIsLocallyPaused(!isPaused);
    }
  }

  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 size-full text-primary-foreground"
      >
        <defs>
          <pattern
            id={crossPatternIdentifier}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M14 10v8M10 14h8"
              stroke="currentColor"
              strokeOpacity="0.09"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </pattern>
          <linearGradient id={fadeIdentifier} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0.25" stopColor="white" stopOpacity="0" />
            <stop offset="0.8" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id={fadeMaskIdentifier}>
            <rect width="100%" height="100%" fill={`url(#${fadeIdentifier})`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${crossPatternIdentifier})`}
          mask={`url(#${fadeMaskIdentifier})`}
        />
      </svg>
      {showNetwork && (
        <>
          <svg
            ref={networkReference}
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 480 300"
            preserveAspectRatio="xMaxYMid meet"
            className={cn(
              "pointer-events-none absolute right-6 top-6 hidden w-[min(52%,560px)] text-primary-foreground md:block lg:right-12",
              reserveLowerSpace
                ? "h-[calc(100%-10.5rem)]"
                : "h-[calc(100%-3rem)]"
            )}
          >
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              {RING_LINKS.map((ringLink) => (
                <path
                  key={ringLink}
                  d={ringLink}
                  strokeOpacity="0.12"
                  strokeDasharray="3 6"
                />
              ))}
              {SPOKES.map((spoke) => (
                <path key={spoke} d={spoke} strokeOpacity="0.22" />
              ))}
            </g>
            <g className="text-accent motion-reduce:hidden">
              {SPOKES.map((spoke, spokeIndex) => {
                const duration = `${6.5 + spokeIndex * 0.7}s`;
                const beginning = `${spokeIndex * 1.1}s`;
                const isInbound = spokeIndex % 2 === 0;

                return (
                  <circle key={spoke} r="3" fill="currentColor" opacity="0">
                    <animateMotion
                      path={spoke}
                      dur={duration}
                      begin={beginning}
                      repeatCount="indefinite"
                      keyPoints={isInbound ? "0;1" : "1;0"}
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.9;0.9;0"
                      keyTimes="0;0.15;0.85;1"
                      dur={duration}
                      begin={beginning}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
            {FACILITIES.map((facility, facilityIndex) => (
              <g
                key={`${facility.horizontal}-${facility.vertical}`}
                transform={`translate(${facility.horizontal} ${facility.vertical})`}
              >
                {facilityIndex % 2 === 0 && (
                  <rect
                    x="-11"
                    y="-11"
                    width="22"
                    height="22"
                    rx="6"
                    fill="none"
                    stroke="currentColor"
                    className="motion-reduce:hidden"
                  >
                    <animate
                      attributeName="stroke-opacity"
                      values="0.35;0;0.35"
                      dur="5s"
                      begin={`${facilityIndex * 0.9}s`}
                      repeatCount="indefinite"
                    />
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1;1.8;1"
                      dur="5s"
                      begin={`${facilityIndex * 0.9}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
                <rect
                  x="-11"
                  y="-11"
                  width="22"
                  height="22"
                  rx="6"
                  fill="currentColor"
                  fillOpacity="0.06"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                />
                <path
                  d="M-5 0h10M0 -5v10"
                  stroke="currentColor"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            ))}
            <g
              transform={`translate(${HUB.horizontal} ${HUB.vertical})`}
              className="text-accent"
            >
              <circle
                r="16"
                fill="none"
                stroke="currentColor"
                className="motion-reduce:hidden"
              >
                <animate
                  attributeName="r"
                  values="16;40"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.6;0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                r="16"
                fill="currentColor"
                fillOpacity="0.12"
                stroke="currentColor"
                strokeOpacity="0.9"
              />
              <path
                d="M-6 0h12M0 -6v12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>
          {SHOW_MOTION_CONTROLS && (
            <ActionButton
              type="button"
              variant="inverseGhost"
              size="icon"
              shape="pill"
              aria-label={isPaused ? playLabel : pauseLabel}
              onClick={togglePause}
              className={cn(
                "absolute right-3 top-3 z-10 md:right-5 md:top-5 md:inline-flex motion-reduce:!hidden",
                !sharedPause && "hidden"
              )}
            >
              {isPaused ? (
                <PlayIcon aria-hidden="true" />
              ) : (
                <PauseIcon aria-hidden="true" />
              )}
            </ActionButton>
          )}
        </>
      )}
    </>
  );
}
