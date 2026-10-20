import type { MarketingSectionContent } from "@healthalyst/ui/components/marketing-section";

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

export const CONTACT_CONTENT = {
  heading: "Ready to build better healthcare technology?",
  paragraphs: [
    "Whether you’re a hospital, laboratory, pharmacy, or any other healthcare institution, we’d like to understand your context and explore how Healthalyst Africa can serve your needs.",
  ],
} satisfies MarketingSectionContent;
