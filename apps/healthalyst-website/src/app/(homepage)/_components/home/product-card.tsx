"use client";

import { Button } from "@healthalyst/ui/components/button";
import type { Product } from "~/types";

/** Clickable card summarising one product line. */
export default function ProductCard({
  product,
  index,
  visible,
  onClick,
}: {
  product: Product;
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-label={`Explore ${product.name}`}
      onClick={onClick}
      className={`reveal reveal-${index + 1}${visible ? " show" : ""} block h-auto w-full cursor-pointer whitespace-normal rounded-none bg-white text-left font-normal px-8 py-9 outline outline-[1.5px] outline-transparent transition-all [transition-duration:280ms] hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgb(var(--brand-forest)/0.08)] hover:outline-gold focus-visible:outline-gold`}
    >
      <span className="block mb-6 font-mono text-[10px] tracking-[0.18em] text-primary">
        {product.number}
      </span>
      <span className="block mb-1.5 font-serif text-[22px] font-medium leading-[1.2] text-forest">
        {product.name}
      </span>
      <span className="block mb-5 text-[12px] font-medium tracking-[0.04em] text-muted-foreground">
        {product.category}
      </span>
      <span className="block text-[13.5px] font-light leading-[1.75] text-ink-soft">
        {product.headline}
      </span>
      <span className="block mt-7 text-[11px] font-semibold tracking-[0.06em] text-forest">
        Explore <span className="text-primary">→</span>
      </span>
    </Button>
  );
}
