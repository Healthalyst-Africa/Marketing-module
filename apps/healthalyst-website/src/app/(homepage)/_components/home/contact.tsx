"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { PRODUCTS } from "~/data/products";
import {
  CONTACT_PRODUCT_OPTIONS,
  CONTACT_REPRESENTATION_OPTIONS,
  INSTITUTIONS,
} from "~/data/site";
import { useReveal } from "~/hooks/use-reveal";
import { Reveal, SectionHeading, SectionLabel } from "./section-heading";

export default function Contact() {
  const [elementReference, visible] = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={elementReference}
      className="bg-cream-dark px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal
          visible={visible}
          className="grid grid-cols-1 items-start gap-[60px] tablet:grid-cols-[1fr_1.1fr] tablet:gap-[100px]"
        >
          {/* Left */}
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionHeading className="mb-7 text-[clamp(2.2rem,4.5vw,3.4rem)]">
              Ready to build better
              <br />
              <em className="italic">healthcare technology?</em>
            </SectionHeading>
            <p className="mb-8 text-[16px] font-light leading-[1.82] text-ink-soft">
              Whether you&rsquo;re a hospital, laboratory, pharmacy, or any
              other healthcare institution — we&rsquo;d like to understand your
              context and explore how Healthalyst Africa can serve your needs.
            </p>
            <div className="mb-8 h-px bg-sand" />
            <div className="flex flex-col gap-6">
              {INSTITUTIONS.map((institution) => (
                <div key={institution.name} className="flex items-start gap-4">
                  <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <div>
                    <div className="mb-0.5 text-[14px] font-semibold text-forest">
                      {institution.name}
                    </div>
                    <div className="text-[13px] font-light text-muted">
                      {institution.product} — {institution.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded border border-sand bg-white px-[clamp(28px,4.5vw,48px)] py-[clamp(36px,5vw,52px)]">
            <SectionLabel className="mb-7">Send us a message</SectionLabel>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col gap-3.5"
            >
              <div className="grid grid-cols-1 gap-3.5 smallScreen:grid-cols-2">
                <Input placeholder="First Name" autoComplete="given-name" />
                <Input placeholder="Last Name" autoComplete="family-name" />
              </div>
              <Input
                type="text"
                placeholder="Organisation / Institution Name"
                autoComplete="organization"
              />
              <Input
                type="email"
                placeholder="Email Address"
                autoComplete="email"
              />
              <Input
                type="tel"
                placeholder="Phone Number (optional)"
                autoComplete="tel"
              />
              <Select defaultValue="">
                <option value="" disabled>
                  I represent a…
                </option>
                {CONTACT_REPRESENTATION_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
              <Select defaultValue="">
                <option value="" disabled>
                  Product of interest…
                </option>
                {PRODUCTS.map((product) => (
                  <option key={product.name}>
                    {product.name} — {product.category}
                  </option>
                ))}
                {CONTACT_PRODUCT_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
              <Textarea
                rows={4}
                placeholder="Tell us about your institution and what you're looking to achieve…"
                style={{ minHeight: 104 }}
              />
              <Button type="submit" size="block" className="mt-1">
                Send Message →
              </Button>
              <p className="mt-1 text-center text-[12px] font-light text-muted">
                We respond to all enquiries within two business days.
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
