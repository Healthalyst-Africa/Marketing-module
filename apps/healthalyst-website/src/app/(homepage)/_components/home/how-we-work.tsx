"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { STEPS } from "~/data/steps";
import { useReveal } from "~/hooks/use-reveal";
import { scrollTo } from "~/utils/scroll";
import { Reveal, SectionHeading, SectionLabel } from "./section-heading";
import StepButton from "./step-button";

export default function HowWeWork() {
  const [ref, visible] = useReveal<HTMLElement>();
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <section
      id="how-we-work"
      ref={ref}
      className="bg-cream px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <Reveal visible={visible} className="mb-20">
          <SectionLabel>How We Work</SectionLabel>
          <div className="grid grid-cols-1 items-end gap-[60px] tablet:grid-cols-2">
            <SectionHeading>
              From discovery to
              <br />
              <em className="italic">continuous growth</em>
            </SectionHeading>
            <p className="text-[16px] font-light leading-[1.82] text-ink-soft">
              Our implementation process is designed around one principle: your
              institution&apos;s reality comes first. We don&apos;t fit your
              workflows into our template — we build platforms from your ground
              up.
            </p>
          </div>
        </Reveal>

        {/* Interactive process */}
        <Reveal
          visible={visible}
          className="grid grid-cols-1 gap-10 tablet:grid-cols-[1fr_2fr] tablet:gap-20"
        >
          {/* Step selector */}
          <div>
            {STEPS.map((s, index) => (
              <StepButton
                key={s.number}
                step={s}
                active={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          {/* Step content */}
          <div key={activeStep} className="pt-2">
            <div className="mb-6 font-mono text-[10px] tracking-[0.2em] text-gold">
              {step.tag}
            </div>
            <h3 className="mb-6 font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-[1.2] text-forest">
              {step.headline}
            </h3>
            <div className="mb-7 h-px w-8 bg-gold" />
            <p className="mb-9 text-[16px] font-light leading-[1.9] text-ink-soft">
              {step.body}
            </p>
            {activeStep < STEPS.length - 1 ? (
              <Button
                variant="secondary"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next: {STEPS[activeStep + 1].title} →
              </Button>
            ) : (
              <Button variant="primary" onClick={() => scrollTo("contact")}>
                Start a Conversation →
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
