import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@healthalyst/ui/primitives/accordion";
import {
  MarketingContainer,
  MarketingSection,
} from "@healthalyst/ui/components/marketing-section";

/**
 * Frequently asked questions in two columns: the heading and a line on the
 * left, the questions as an accordion on the right. The heading follows the
 * content sections' 40 / 32 px scale. `assistant`, such as a
 * `MarketingQuestionAssistant`, sits under the last question.
 */
export function MarketingFAQ({
  heading,
  introduction,
  questions,
  assistant,
}: {
  heading: ReactNode;
  introduction?: string;
  questions: readonly { question: string; answer: string }[];
  assistant?: ReactNode;
}) {
  return (
    <MarketingSection
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-card py-12 md:py-20"
    >
      <MarketingContainer className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-5">
          <h2
            id="faq-heading"
            className="text-balance text-[28px] font-serif font-normal leading-[1.15] tracking-[-0.01em] text-foreground md:text-[40px]"
          >
            {heading}
          </h2>
          {introduction && (
            <p className="max-w-[44ch] text-base font-normal leading-relaxed text-muted-foreground md:text-[17px]">
              {introduction}
            </p>
          )}
        </div>
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible>
            {questions.map((question, index) => (
              <AccordionItem key={question.question} value={String(index)}>
                <AccordionTrigger className="gap-3 py-4 text-left text-[13px] font-medium leading-snug text-primary md:gap-5 md:py-6 md:text-base md:leading-relaxed">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[65ch] pb-4 text-[13px] leading-relaxed text-muted-foreground md:pb-6 md:text-base md:leading-[1.8]">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {assistant}
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
