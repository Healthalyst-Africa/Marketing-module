"use client";

import { useReveal } from "~/hooks/use-reveal";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";
import { scrollTo } from "~/utils/scroll";
import ProductCard from "./product-card";
import { Reveal, SectionHeading, SectionLabel } from "./section-heading";

export default function WhatWeBuild() {
  const [ref, visible] = useReveal<HTMLElement>();
  const { selectProduct } = useProducts();

  return (
    <section
      id="what-we-build"
      ref={ref}
      className="bg-cream px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal visible={visible}>
          <SectionLabel>What We Build</SectionLabel>
          <div className="mb-[72px] grid grid-cols-1 items-end gap-[60px] tablet:grid-cols-2">
            <SectionHeading>
              Six product lines.
              <br />
              <em className="italic">One connected</em>
              <br />
              healthcare ecosystem.
            </SectionHeading>
            <div>
              <p className="mb-[18px] text-[16px] font-light leading-[1.82] text-ink-soft">
                Each product is purpose-built for a specific healthcare
                institution type — designed from the ground up to address the
                exact workflows, operational challenges, and clinical realities
                of that setting.
              </p>
              <p className="text-[16px] font-light leading-[1.82] text-ink-soft">
                Together, they form a unified ecosystem — where a patient&apos;s
                journey across hospitals, laboratories, pharmacies, and imaging
                centres is a single, coherent digital experience.
              </p>
            </div>
          </div>
          <div className="mb-px h-px bg-sand" />
        </Reveal>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 gap-px bg-sand xs:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
              visible={visible}
              onClick={() => {
                selectProduct(index);
                scrollTo("products");
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
