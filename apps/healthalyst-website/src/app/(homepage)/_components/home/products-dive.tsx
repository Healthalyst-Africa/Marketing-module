"use client";

import { Button } from "~/components/ui/button";
import { PRODUCTS } from "~/data/products";
import { useReveal } from "~/hooks/use-reveal";
import { cn } from "~/lib/utilities";
import { useProducts } from "~/store/ProductsContext";
import { scrollTo } from "~/utilities/scroll";
import { Reveal, SectionHeading, SectionLabel } from "./section-heading";

export default function ProductsDive() {
  const [elementReference, visible] = useReveal<HTMLElement>();
  const { state, selectProduct } = useProducts();
  const product = PRODUCTS[state.activeProduct];

  return (
    <section
      id="products"
      ref={elementReference}
      className="bg-cream-dark px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <Reveal visible={visible} className="mb-[52px]">
          <SectionLabel>Product Details</SectionLabel>
          <div className="grid grid-cols-1 items-end gap-[60px] tablet:grid-cols-2">
            <SectionHeading>
              Explore our
              <br />
              <em className="italic">product suite</em>
            </SectionHeading>
            <p className="text-[16px] font-light leading-[1.82] text-ink-soft">
              Each product is engineered for its specific healthcare context.
              Select a product to explore its capabilities, use cases, and the
              institutions it serves.
            </p>
          </div>
        </Reveal>

        {/* Tab navigation */}
        <Reveal
          visible={visible}
          className="flex gap-8 overflow-x-auto border-b border-sand"
        >
          {PRODUCTS.map((availableProduct, index) => (
            <button
              key={availableProduct.name}
              onClick={() => selectProduct(index)}
              aria-pressed={state.activeProduct === index}
              className={cn(
                "-mb-px shrink-0 whitespace-nowrap border-b-2 bg-transparent px-0 py-2.5 font-sans text-[12.5px] font-medium transition-all",
                state.activeProduct === index
                  ? "border-gold text-forest"
                  : "border-transparent text-muted hover:text-forest"
              )}
            >
              {availableProduct.name}
            </button>
          ))}
        </Reveal>

        {/* Active product panel */}
        <Reveal
          visible={visible}
          className="grid grid-cols-1 border border-t-0 border-sand tablet:grid-cols-2"
        >
          {/* Left — dark panel */}
          <div className="relative overflow-hidden bg-forest px-[clamp(32px,4.5vw,56px)] py-[clamp(40px,5vw,64px)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[30px] -right-5 select-none font-serif text-[180px] font-light leading-none text-white/[0.04]"
            >
              {product.number}
            </div>

            <div className="relative z-10">
              <div className="mb-6 font-mono text-[10px] tracking-[0.2em] text-gold">
                {product.tagline}
              </div>
              <h3 className="mb-2.5 font-serif text-[clamp(1.8rem,3.2vw,2.6rem)] font-normal leading-[1.15] text-white">
                {product.headline}
              </h3>
              <p className="mb-7 font-serif text-[clamp(1rem,1.5vw,1.2rem)] italic leading-[1.4] text-gold-light">
                {product.supportingHeadline}
              </p>
              <div className="mb-7 h-px w-10 bg-gold" />
              <p className="mb-7 text-[15px] font-light leading-[1.85] text-white/70">
                {product.description}
              </p>
              <div className="mb-8 rounded-[3px] border border-white/10 bg-white/[0.04] px-6 py-5">
                <div className="mb-2.5 font-mono text-[9px] tracking-[0.18em] text-gold">
                  BUILT FOR
                </div>
                <div className="text-[13px] font-normal leading-[1.6] text-white/60">
                  {product.builtFor}
                </div>
              </div>
              <Button variant="gold" onClick={() => scrollTo("contact")}>
                Enquire About {product.name}
              </Button>
            </div>
          </div>

          {/* Right — white panel */}
          <div className="flex flex-col bg-white px-[clamp(32px,4.5vw,56px)] py-[clamp(40px,5vw,64px)]">
            <div className="mb-8 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              Platform Capabilities
            </div>
            <div className="flex-1">
              {product.capabilities.map((capability, index) => (
                <div
                  key={capability}
                  className={cn(
                    "flex gap-5 py-5",
                    index < product.capabilities.length - 1 &&
                      "border-b border-sand"
                  )}
                >
                  <div className="min-w-6 shrink-0 pt-0.5 font-mono text-[10px] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[14px] font-normal leading-[1.65] text-ink-soft">
                    {capability}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-sand pt-5 font-mono text-[10px] tracking-[0.1em] text-muted">
              INTEROPERABLE · OFFLINE-FIRST · MULTILINGUAL
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
