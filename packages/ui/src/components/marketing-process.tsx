"use client";

import { useRef } from "react";
import { Button } from "@healthalyst/ui/components/button";
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

interface ProcessStep {
  number: string;
  title: string;
  tag: string;
  headline: string;
  body: string;
}

export function MarketingProcess({
  content,
  steps,
  selectedIndex,
  onSelect,
}: {
  content: MarketingSectionContent;
  steps: readonly ProcessStep[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const stepTriggerReferences = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <MarketingSection id="how-we-work">
      <MarketingContainer>
        <MarketingIntroduction content={content} className="mb-12" />
        <Tabs
          orientation="vertical"
          value={steps[selectedIndex]?.number}
          onValueChange={(identifier) => {
            const index = steps.findIndex((step) => step.number === identifier);
            if (index >= 0) onSelect(index);
          }}
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <TabsList
            aria-label="Implementation stages"
            className="h-auto flex-col items-stretch justify-start gap-0 bg-transparent p-0"
          >
            {steps.map((step, index) => (
              <TabsTrigger
                key={step.number}
                value={step.number}
                ref={(elementReference) => {
                  stepTriggerReferences.current[index] = elementReference;
                }}
                className="justify-start gap-5 whitespace-normal rounded-none border-b px-0 py-5 text-left text-base leading-relaxed text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <span>{step.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {steps.map((step, index) => (
            <TabsContent
              key={step.number}
              value={step.number}
              forceMount
              hidden={index !== selectedIndex}
              className="m-0 flex-col rounded-sm bg-primary p-7 text-primary-foreground md:p-10"
            >
              <p className="mb-7 text-sm text-accent-on-primary">{step.tag}</p>
              <h3 className="mb-6 font-serif text-3xl font-medium leading-tight md:text-4xl">
                {step.headline}
              </h3>
              <p className="mb-8 text-base leading-[1.8] text-primary-foreground/90">
                {step.body}
              </p>
              {index < steps.length - 1 ? (
                <Button
                  variant="link"
                  className="h-auto min-h-12 justify-start whitespace-normal p-0 text-left text-primary-foreground underline underline-offset-8 focus-visible:ring-accent"
                  onClick={() => {
                    onSelect(index + 1);
                    stepTriggerReferences.current[index + 1]?.focus();
                  }}
                >
                  Next: {steps[index + 1]?.title} →
                </Button>
              ) : (
                <Button
                  asChild
                  variant="link"
                  className="h-auto min-h-12 justify-start whitespace-normal p-0 text-primary-foreground underline underline-offset-8 focus-visible:ring-accent"
                >
                  <a href="#contact">Start a conversation →</a>
                </Button>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </MarketingContainer>
    </MarketingSection>
  );
}
