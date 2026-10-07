"use client";

import type { ReactNode } from "react";
import { Button } from "@healthalyst/ui/components/button";
import type { ProductPresentation } from "@healthalyst/ui/components/product-catalogue";
import {
  MarketingContainer,
  MarketingIntroduction,
  MarketingSection,
  type MarketingSectionContent,
} from "@healthalyst/ui/components/marketing-section";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@healthalyst/ui/components/tabs";

export function ProductDetails({
  content,
  products,
  selectedIndex,
  onSelect,
  illustrations,
}: {
  content: MarketingSectionContent;
  products: readonly ProductPresentation[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  illustrations: readonly ReactNode[];
}) {
  return (
    <MarketingSection id="products" className="bg-secondary">
      <MarketingContainer>
        <MarketingIntroduction content={content} className="mb-6" />
        <Tabs
          value={products[selectedIndex]?.name}
          onValueChange={(identifier) => {
            const index = products.findIndex(
              (product) => product.name === identifier
            );
            if (index >= 0) onSelect(index);
          }}
        >
          <div className="-mx-1 mb-4 overflow-x-auto px-1 py-1">
            <TabsList
              aria-label="Select a product"
              className="h-auto min-w-max justify-start gap-1 bg-transparent p-0"
            >
              {products.map((product) => (
                <TabsTrigger
                  key={product.name}
                  value={product.name}
                  className="min-h-12 border-b-2 border-transparent px-4 text-sm text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  {product.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {products.map((product, index) => (
            <TabsContent
              key={product.name}
              value={product.name}
              forceMount
              hidden={index !== selectedIndex}
              className="mt-0"
            >
              <article className="grid overflow-hidden rounded-sm border bg-card lg:grid-cols-[1fr_1fr]">
                <div className="flex flex-col gap-6 p-6 md:p-10">
                  <p className="text-sm text-muted-foreground">
                    {product.tagline}
                  </p>
                  <h3 className="font-serif text-[clamp(2rem,3vw,2.75rem)] font-medium leading-[1.15] text-primary">
                    {product.headline}
                  </h3>
                  <p className="text-base font-medium text-primary">
                    {product.supportingHeadline}
                  </p>
                  <p className="text-base leading-[1.8] text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="border-t border-border pt-4">
                    <h4 className="mb-2 text-sm font-semibold text-primary">
                      Built for
                    </h4>
                    <p className="text-sm leading-[1.8] text-muted-foreground">
                      {product.builtFor}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="large"
                    className="mt-2 h-auto min-h-12 w-fit whitespace-normal rounded-full"
                  >
                    <a href="#contact">Enquire about {product.name}</a>
                  </Button>
                </div>
                <div className="flex flex-col gap-6 bg-background p-6 md:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-base font-semibold text-primary">
                      Platform capabilities
                    </h4>
                    <span
                      aria-hidden="true"
                      className="text-primary [&_svg]:size-12 [&_svg]:stroke-[1.25]"
                    >
                      {illustrations[index]}
                    </span>
                  </div>
                  <ul className="flex flex-1 flex-col divide-y divide-border">
                    {product.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex gap-4 py-4 text-sm leading-[1.75] text-foreground md:text-base"
                      >
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Interoperable · Offline-first · Multilingual
                  </p>
                </div>
              </article>
            </TabsContent>
          ))}
        </Tabs>
      </MarketingContainer>
    </MarketingSection>
  );
}
