"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FAQS } from "~/data/faqs";
import { useReveal } from "~/hooks/use-reveal";
import { Reveal, SectionHeading, SectionLabel } from "./section-heading";

export default function FAQ() {
  const [elementReference, visible] = useReveal<HTMLElement>();

  return (
    <section
      id="faq"
      ref={elementReference}
      className="bg-cream px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[860px]">
        <Reveal visible={visible} className="mb-16">
          <SectionLabel>Questions</SectionLabel>
          <SectionHeading>
            Frequently asked <em className="italic">questions</em>
          </SectionHeading>
        </Reveal>

        <Reveal visible={visible} className="border-b border-sand">
          <Accordion type="single" collapsible>
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>
                  <span className="flex-1 font-sans text-[16px] font-medium leading-[1.45] text-forest">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-block shrink-0 text-[22px] font-normal leading-[1.2] text-gold transition-transform duration-300 group-data-[state=open]:rotate-45"
                  >
                    +
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-[680px] text-[15px] font-light leading-[1.85] text-ink-soft">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
