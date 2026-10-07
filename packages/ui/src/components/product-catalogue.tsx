"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@healthalyst/ui/components/button";
import {
  MarketingContainer,
  MarketingIntroduction,
  MarketingSection,
  type MarketingSectionContent,
} from "@healthalyst/ui/components/marketing-section";

export interface ProductPresentation {
  number: string;
  name: string;
  category: string;
  tagline: string;
  headline: string;
  supportingHeadline: string;
  description: string;
  builtFor: string;
  capabilities: readonly string[];
}

export function ProductNavigation({
  products,
  onSelect,
}: {
  products: readonly ProductPresentation[];
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Product lines" className="flex flex-wrap gap-x-6 gap-y-1">
      {products.map((product, index) => (
        <Button
          key={product.name}
          asChild
          variant="link"
          className="min-h-11 px-0 text-sm font-normal text-primary-foreground/90 focus-visible:ring-accent focus-visible:ring-offset-primary"
        >
          <a href="#products" onClick={() => onSelect(index)}>
            {product.name}
          </a>
        </Button>
      ))}
    </nav>
  );
}

export function ProductCatalogue({
  content,
  products,
  onSelect,
}: {
  content: MarketingSectionContent;
  products: readonly ProductPresentation[];
  onSelect: (index: number) => void;
}) {
  return (
    <MarketingSection id="what-we-build">
      <MarketingContainer>
        <MarketingIntroduction content={content} className="mb-12" />
        <div className="grid gap-x-14 md:grid-cols-2">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="group relative grid grid-cols-[1fr_40px] gap-4 border-t border-border py-7 md:gap-5 md:py-9"
            >
              <div>
                <h3 className="font-serif text-3xl font-medium tracking-tight text-primary md:text-4xl">
                  <a
                    href="#products"
                    onClick={() => onSelect(index)}
                    className="rounded-sm outline-offset-4 after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {product.name}
                    <span className="sr-only">: explore product</span>
                  </a>
                </h3>
                <p className="mt-2 text-sm font-medium text-primary">
                  {product.category}
                </p>
                <p className="mt-4 max-w-[43ch] text-sm leading-[1.8] text-muted-foreground">
                  {product.headline}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="mt-1 flex size-10 items-center justify-center rounded-full border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-focus-within:bg-primary group-focus-within:text-primary-foreground motion-reduce:transition-none"
              >
                <ArrowUpRight className="size-5 stroke-[1.5]" />
              </span>
            </article>
          ))}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
