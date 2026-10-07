import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@healthalyst/ui/components/accordion";
import {
  MarketingContainer,
  MarketingIntroduction,
  MarketingSection,
  type MarketingSectionContent,
} from "@healthalyst/ui/components/marketing-section";

export function MarketingFAQ({
  content,
  questions,
}: {
  content: MarketingSectionContent;
  questions: readonly { question: string; answer: string }[];
}) {
  return (
    <MarketingSection id="faq">
      <MarketingContainer className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <MarketingIntroduction content={content} className="lg:grid-cols-1" />
        <Accordion type="single" collapsible>
          {questions.map((question, index) => (
            <AccordionItem key={question.question} value={String(index)}>
              <AccordionTrigger className="gap-5 py-6 text-left text-base font-medium leading-relaxed text-primary">
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[65ch] pb-6 text-base leading-[1.8] text-muted-foreground">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MarketingContainer>
    </MarketingSection>
  );
}
