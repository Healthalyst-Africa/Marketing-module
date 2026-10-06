"use client";

import { Button } from "~/components/ui/button";
import { PILLARS } from "~/data/site";
import { useReveal } from "~/hooks/use-reveal";
import { scrollTo } from "~/utilities/scroll";
import { Reveal, SectionHeading, SectionLabel } from "./section-heading";

export default function About() {
  const [elementReference, visible] = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={elementReference}
      className="bg-forest px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel className="mb-14 text-primary-foreground/85">
          About Us
        </SectionLabel>

        {/* Main 2-col */}
        <Reveal
          visible={visible}
          className="mb-24 grid grid-cols-1 gap-20 tablet:grid-cols-2"
        >
          {/* Left */}
          <div>
            <SectionHeading className="mb-8 text-white">
              Technology built for
              <br />
              <em className="italic text-accent-on-primary">
                African healthcare future
              </em>
            </SectionHeading>

            <blockquote className="mb-9 border-l-[3px] border-gold pl-7">
              <p className="font-serif text-[clamp(1.15rem,1.8vw,1.5rem)] font-light italic leading-[1.6] text-primary-foreground/85">
                &ldquo;Africa&rsquo;s healthcare system doesn&rsquo;t need
                software written elsewhere and adapted. It needs technology
                built here, for here.&rdquo;
              </p>
            </blockquote>

            <Button variant="gold" onClick={() => scrollTo("contact")}>
              Partner With Us →
            </Button>
          </div>

          {/* Right */}
          <div>
            <p className="mb-7 text-[15px] font-light leading-[1.88] text-primary-foreground/85">
              Healthalyst Africa is a health technology company with a singular
              focus: building the digital infrastructure that will transform how
              healthcare is accessed, delivered, and managed across the African
              continent.
            </p>
            <p className="mb-7 text-[15px] font-light leading-[1.88] text-primary-foreground/85">
              We develop purpose-built software for the full spectrum of
              healthcare provision — from primary care scheduling to laboratory
              diagnostics, pharmaceutical management, dental practice
              operations, diagnostic imaging, and medical supply chains.
            </p>
            <p className="text-[15px] font-light leading-[1.88] text-primary-foreground/85">
              Our platforms are designed from first principles for African
              operating conditions — built to function in low-connectivity
              environments, support multiple languages, and scale from a
              single-facility deployment to continent-wide rollout.
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="mb-14 h-px bg-white/10" />

        {/* Approach pillars */}
        <SectionLabel className="mb-8 text-primary-foreground/85">
          Our Approach
        </SectionLabel>
        <Reveal
          visible={visible}
          className="grid grid-cols-1 gap-px bg-white/[0.07] smallScreen:grid-cols-2 tablet:grid-cols-4"
        >
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="bg-forest-mid px-9 py-11">
              <div className="mb-5 text-[22px] text-accent-on-primary">
                {pillar.icon}
              </div>
              <div className="mb-3.5 text-[14px] font-semibold text-white">
                {pillar.title}
              </div>
              <div className="text-[13px] font-light leading-[1.78] text-primary-foreground/85">
                {pillar.body}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
