"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * Lets content animate in the first time a quarter of it scrolls into view.
 * Before scripts run there is no `data-revealed` attribute, so content is
 * visible; once mounted it is `false` until it scrolls into view, then
 * `true`. Children hide with `group-data-[revealed=false]/reveal:` classes
 * and should stay still under reduced motion (`motion-reduce:` classes).
 */
export function MarketingReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerReference = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState<boolean | undefined>();

  useEffect(() => {
    const container = containerReference.current;

    if (!container) {
      return;
    }

    setIsRevealed(false);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsRevealed(true);
          intersectionObserver.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    intersectionObserver.observe(container);

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerReference}
      data-revealed={isRevealed}
      className={cn("group/reveal", className)}
    >
      {children}
    </div>
  );
}
