import type { MarketingSectionContent } from "@healthalyst/ui/components/marketing-section";

export const HERO_CONTENT = {
  heading: (
    <>
      We build the digital
      <br className="hidden xl:block" /> infrastructure of
      <br className="hidden xl:block" />{" "}
      <span className="font-normal not-italic">African healthcare.</span>
    </>
  ),
  paragraphs: [
    "Healthalyst Africa is a health technology company. We design and develop purpose-built digital products for hospitals, laboratories, pharmacies, dental practices, diagnostic imaging centres, and medical equipment suppliers across the continent.",
    "We don't build generic software. We build technology that understands the specific workflows, infrastructure realities, and clinical needs of African healthcare, from the ground up.",
  ],
} satisfies MarketingSectionContent;

export const CATALOGUE_CONTENT = {
  heading: (
    <>
      Six product lines. <em>One connected</em> healthcare ecosystem.
    </>
  ),
  paragraphs: [
    "Each product is purpose-built for a specific healthcare institution type. It is designed from the ground up to address the exact workflows, operational challenges, and clinical realities of that setting.",
    "Together, they form a unified ecosystem where a patient's journey across hospitals, laboratories, pharmacies, and imaging centres is a single, coherent digital experience.",
  ],
} satisfies MarketingSectionContent;

export const PRODUCT_DETAILS_CONTENT = {
  heading: (
    <>
      Explore our <em>product suite</em>
    </>
  ),
  paragraphs: [
    "Each product is engineered for its specific healthcare context. Select a product to explore its capabilities, use cases, and the institutions it serves.",
  ],
} satisfies MarketingSectionContent;

export const PROCESS_CONTENT = {
  heading: (
    <>
      From discovery to <em>continuous growth</em>
    </>
  ),
  paragraphs: [
    "Our implementation process is designed around one principle: your institution's reality comes first. We don't fit your workflows into our template. We build platforms from your ground up.",
  ],
} satisfies MarketingSectionContent;

export const ABOUT_CONTENT = {
  heading: (
    <>
      Technology built for <em>African healthcare future</em>
    </>
  ),
  paragraphs: [
    "Healthalyst Africa is a health technology company with a singular focus: building the digital infrastructure that will transform how healthcare is accessed, delivered, and managed across the African continent.",
    "We develop purpose-built software for the full spectrum of healthcare provision, from primary care scheduling to laboratory diagnostics, pharmaceutical management, dental practice operations, diagnostic imaging, and medical supply chains.",
    "Our platforms are designed from first principles for African operating conditions. They function in low-connectivity environments, support multiple languages, and scale from a single-facility deployment to continent-wide rollout.",
  ],
} satisfies MarketingSectionContent;

export const FAQ_CONTENT = {
  heading: (
    <>
      Frequently asked <em>questions</em>
    </>
  ),
  paragraphs: [],
} satisfies MarketingSectionContent;

export const CONTACT_CONTENT = {
  heading: (
    <>
      Ready to build better <em>healthcare technology?</em>
    </>
  ),
  paragraphs: [
    "Whether you’re a hospital, laboratory, pharmacy, or any other healthcare institution, we’d like to understand your context and explore how Healthalyst Africa can serve your needs.",
  ],
} satisfies MarketingSectionContent;
