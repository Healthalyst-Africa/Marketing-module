"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll observer.
 *
 * Returns a ref to attach to a section and whether it has entered the
 * viewport. The element reveals once and then disconnects.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.08
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}
