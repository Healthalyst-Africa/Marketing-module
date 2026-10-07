"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@healthalyst/ui/components/button";
import { Card, CardContent, CardHeader } from "@healthalyst/ui/components/card";
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
  icons,
  onSelect,
}: {
  content: MarketingSectionContent;
  products: readonly ProductPresentation[];
  icons: readonly ReactNode[];
  onSelect: (index: number) => void;
}) {
  return (
    <MarketingSection id="what-we-build">
      <MarketingContainer>
        <MarketingIntroduction content={content} className="mb-12" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Card
              key={product.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border-border bg-card shadow-none transition-colors hover:border-primary/40 hover:bg-background focus-within:border-primary/50 motion-reduce:transition-none"
            >
              <article className="flex h-full flex-col">
                <CardHeader className="flex-1 p-6 md:p-7">
                  <div className="mb-8 flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary text-primary [&_svg]:size-6 [&_svg]:stroke-[1.5]"
                    >
                      {icons[index]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5 motion-reduce:transition-none"
                    >
                      <ArrowUpRight className="size-5 stroke-[1.5]" />
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium tracking-tight text-primary md:text-3xl">
                    <a
                      href="#products"
                      onClick={() => onSelect(index)}
                      className="rounded-sm outline-offset-4 after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {product.name}
                      <span className="sr-only">: explore product</span>
                    </a>
                  </h3>
                  <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground">
                    {product.category}
                  </p>
                </CardHeader>
                <CardContent className="mt-auto p-6 pt-0 md:px-7 md:pb-7">
                  <p className="max-w-[43ch] text-sm leading-[1.7] text-muted-foreground">
                    {product.headline}
                  </p>
                </CardContent>
              </article>
            </Card>
          ))}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
