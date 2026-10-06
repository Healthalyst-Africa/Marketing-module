"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { PRODUCTS } from "~/data/products";
import { cn } from "~/lib/utilities";
import { useProducts } from "~/store/ProductsContext";
import { scrollTo } from "~/utilities/scroll";

/** Static entrance-delay classes so Tailwind's just-in-time compiler can see them. */
const DELAYS = {
  eyebrow: "[transition-delay:0ms]",
  headline: "[transition-delay:80ms]",
  body: "[transition-delay:160ms]",
  callsToAction: "[transition-delay:240ms]",
  strip: "[transition-delay:320ms]",
} as const;

function entrance(delay: string, visible: boolean) {
  return cn(
    "transition-all [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
    delay,
    visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  );
}

export default function Hero() {
  const { selectProduct } = useProducts();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const revealTimeout = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(revealTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-forest pb-[100px] pt-[clamp(100px,12vh,140px)]"
    >
      {/* Radial gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgb(var(--brand-gold)/0.12)_0%,transparent_55%),radial-gradient(circle_at_15%_80%,rgb(var(--brand-gold)/0.06)_0%,transparent_45%)]"
      />

      {/* Giant H watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-1/2 hidden -translate-y-1/2 select-none font-serif text-[clamp(200px,28vw,380px)] font-light leading-none text-white/[0.03] tablet:block"
      >
        H
      </div>

      {/* Decorative vertical text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-9 top-1/2 hidden -translate-y-1/2 rotate-90 select-none whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-accent-on-primary opacity-[0.28] tablet:block"
      >
        HEALTHALYST AFRICA
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 md:px-10">
        <div className="max-w-[800px]">
          {/* Eyebrow */}
          <div
            className={cn(
              "mb-10 flex items-center gap-4",
              entrance(DELAYS.eyebrow, visible)
            )}
          >
            <div className="h-px w-8 shrink-0 bg-gold" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent-on-primary">
              Health technology · Pan-African
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "mb-9 font-serif text-[clamp(3.2rem,7.5vw,6.8rem)] font-light leading-[1.04] tracking-[-0.02em] text-white",
              entrance(DELAYS.headline, visible)
            )}
          >
            We build the digital
            <br />
            infrastructure of
            <br />
            <em className="italic text-accent-on-primary">
              African healthcare.
            </em>
          </h1>

          {/* Primary body */}
          <p
            className={cn(
              "mb-4 max-w-[560px] text-[18px] font-light leading-[1.85] text-primary-foreground/85",
              entrance(DELAYS.body, visible)
            )}
          >
            Healthalyst Africa is a health technology company. We design and
            develop purpose-built digital products for hospitals, laboratories,
            pharmacies, dental practices, diagnostic imaging centres, and
            medical equipment suppliers across the continent.
          </p>

          {/* Secondary body */}
          <p
            className={cn(
              "mb-[52px] max-w-[520px] text-[15px] font-light leading-[1.8] text-primary-foreground/85",
              entrance(DELAYS.body, visible)
            )}
          >
            We don&apos;t build generic software. We build technology that
            understands the specific workflows, infrastructure realities, and
            clinical needs of African healthcare — from the ground up.
          </p>

          {/* calls to action */}
          <div
            className={cn(
              "mb-20 flex flex-wrap gap-3.5",
              entrance(DELAYS.callsToAction, visible)
            )}
          >
            <Button variant="gold" onClick={() => scrollTo("products")}>
              Explore Our Products →
            </Button>
            <Button
              variant="ghost"
              size="compact"
              onClick={() => scrollTo("contact")}
            >
              Speak to Our Team
            </Button>
          </div>

          {/* Product name strip */}
          <div
            className={cn(
              "border-t border-white/10 pt-8 transition-opacity [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              DELAYS.strip,
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
              {PRODUCTS.map((product, index) => (
                <Fragment key={product.name}>
                  <button
                    className="border-none bg-transparent p-1 font-sans text-[12px] font-medium text-primary-foreground/85 transition-colors hover:text-white/85"
                    onClick={() => {
                      selectProduct(index);
                      scrollTo("products");
                    }}
                  >
                    {product.name}
                  </button>
                  {index < PRODUCTS.length - 1 && (
                    <span className="text-[12px] text-primary-foreground/85">
                      {" "}
                      ·{" "}
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
