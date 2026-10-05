"use client";

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
    <div
      role="button"
      tabIndex={0}
      aria-label={`Explore ${product.name}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`reveal reveal-${index + 1}${visible ? " show" : ""} cursor-pointer bg-white px-8 py-9 outline outline-[1.5px] outline-transparent transition-all [transition-duration:280ms] hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(24,48,32,0.08)] hover:outline-gold focus-visible:outline-gold`}
    >
      <div className="mb-6 font-mono text-[10px] tracking-[0.18em] text-gold">
        {product.number}
      </div>
      <div className="mb-1.5 font-serif text-[22px] font-medium leading-[1.2] text-forest">
        {product.name}
      </div>
      <div className="mb-5 text-[12px] font-medium uppercase tracking-[0.04em] text-muted">
        {product.category}
      </div>
      <div className="text-[13.5px] font-light leading-[1.75] text-ink-soft">
        {product.headline}
      </div>
      <div className="mt-7 text-[11px] font-semibold tracking-[0.06em] text-forest">
        EXPLORE <span className="text-gold">→</span>
      </div>
    </div>
  );
}
