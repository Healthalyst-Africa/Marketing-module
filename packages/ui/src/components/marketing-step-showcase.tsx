"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type ReactNode,
} from "react";
import { PauseIcon, PlayIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@healthalyst/ui/components/tabs";

/** One step: a short title for the list, and what the panel says about it. */
export interface MarketingShowcaseStep {
  title: string;
  headline: string;
  description: string;
  /**
   * A contained image or inline illustration; the panel frames it at 16:10
   * and sets its main colour to the brand colour and its accent to the accent.
   */
  illustration?: ReactNode;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

function readReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function readServerReducedMotion(): boolean {
  return false;
}

/**
 * Steps shown one at a time: a list of steps beside a panel that fades from
 * one step to the next. It moves on by itself every `interval` milliseconds,
 * holds while the pointer or keyboard focus is inside it, stops once the
 * visitor chooses a step, and offers a pause control. Under reduced motion it
 * neither advances nor fades. The list is a set of tabs, so arrow keys move
 * between steps.
 */
export function MarketingStepShowcase({
  steps,
  listLabel,
  interval = 6000,
  pauseLabel = "Pause steps",
  playLabel = "Play steps",
}: {
  steps: readonly MarketingShowcaseStep[];
  /** Accessible name of the list of steps. */
  listLabel: string;
  interval?: number;
  pauseLabel?: string;
  playLabel?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHeld, setIsHeld] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    readReducedMotion,
    readServerReducedMotion
  );
  const isAdvancing =
    isPlaying && !isHeld && !prefersReducedMotion && steps.length > 1;

  useEffect(() => {
    if (!isAdvancing) {
      return;
    }

    const advanceTimeout = window.setTimeout(() => {
      setSelectedIndex((currentIndex) => (currentIndex + 1) % steps.length);
    }, interval);

    return () => window.clearTimeout(advanceTimeout);
  }, [isAdvancing, selectedIndex, interval, steps.length]);

  function chooseStep(value: string) {
    setSelectedIndex(Number(value));
    setIsPlaying(false);
  }

  function releaseWhenFocusLeaves(focusEvent: FocusEvent<HTMLDivElement>) {
    const nextFocus = focusEvent.relatedTarget;

    if (
      !(nextFocus instanceof Node) ||
      !focusEvent.currentTarget.contains(nextFocus)
    ) {
      setIsHeld(false);
    }
  }

  return (
    <div
      onPointerEnter={() => setIsHeld(true)}
      onPointerLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={releaseWhenFocusLeaves}
    >
      <Tabs
        value={String(selectedIndex)}
        onValueChange={chooseStep}
        orientation="vertical"
        className="grid gap-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16"
      >
        <div className="flex flex-col gap-4 lg:col-span-5">
          <TabsList
            variant="steps"
            aria-label={listLabel}
            // Any click or key press on the steps, even on the step already
            // shown, means the visitor has taken over.
            onPointerDownCapture={() => setIsPlaying(false)}
            onKeyDownCapture={() => setIsPlaying(false)}
          >
            {steps.map((step, stepIndex) => (
              <TabsTrigger
                key={step.title}
                value={String(stepIndex)}
                variant="step"
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent bg-card text-sm font-semibold tabular-nums text-foreground transition-colors duration-200 group-data-[state=active]/step:bg-accent motion-reduce:transition-none"
                >
                  {stepIndex + 1}
                </span>
                <span>{step.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {!prefersReducedMotion && steps.length > 1 && (
            <ActionButton
              type="button"
              variant="ghost"
              size="small"
              shape="pill"
              leadingIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={() => setIsPlaying(!isPlaying)}
              className="self-start"
            >
              {isPlaying ? pauseLabel : playLabel}
            </ActionButton>
          )}
        </div>
        <div className="grid lg:col-span-7">
          {steps.map((step, stepIndex) => (
            <TabsContent
              key={step.title}
              value={String(stepIndex)}
              variant="crossfade"
              forceMount
            >
              <div className="h-full rounded-xl border border-accent/25 bg-accent-subtle p-6 md:p-8">
                {step.illustration && (
                  <div className="relative mb-6 aspect-[16/10] w-full rounded-[8px] bg-background text-primary [--illustration-accent:hsl(var(--accent))]">
                    <div className="absolute inset-6 md:inset-8 [&>*]:size-full">
                      {step.illustration}
                    </div>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Step {stepIndex + 1} of {steps.length}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-2xl">
                  {step.headline}
                </h3>
                <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
