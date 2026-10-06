"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll observer.
 *
 * Returns an element reference to attach to a section and whether it has entered the
 * viewport. The element reveals once and then disconnects.
 */
export function useReveal<ElementType extends HTMLElement = HTMLElement>(
  threshold = 0.08
): [React.RefObject<ElementType | null>, boolean] {
  const elementReference = useRef<ElementType>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementReference.current;
    if (!element) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          intersectionObserver.disconnect();
        }
      },
      { threshold }
    );

    intersectionObserver.observe(element);
    return () => intersectionObserver.disconnect();
  }, [threshold]);

  return [elementReference, visible];
}
