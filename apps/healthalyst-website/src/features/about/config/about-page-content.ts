/**
 * Copy for the About us page. Paragraphs are approved company copy;
 * the lede and section headings are drafts awaiting approval, as recorded in
 * `docs/website-revamp.md`.
 */
export const ABOUT_PAGE_CONTENT = {
  title: "About us",
  metadataDescription:
    "Healthalyst Africa builds purpose-built digital products for hospitals, laboratories, pharmacies, dental practices, imaging centres and medical suppliers across Africa.",
  heading: "About us",
  lede: "We build the digital infrastructure of African healthcare: purpose-built products for the institutions that deliver care across the continent.",
  /** The header's rotating line: "Built for" and each institution type. */
  taglineLead: "Built for",
  taglineWords: [
    "hospitals",
    "laboratories",
    "pharmacies",
    "dental practices",
    "imaging centres",
    "medical suppliers",
  ],
  /** Shown instead of the rotation under reduced motion. */
  taglineStillWord: "every institution that delivers care",
  whatWeDoHeading: "What we do",
  whatWeDoParagraphs: [
    "Healthalyst Africa is a health technology company with a singular focus: building the digital infrastructure that will transform how healthcare is accessed, delivered, and managed across the African continent.",
    "We develop purpose-built software for the full spectrum of healthcare provision, from primary care scheduling to laboratory diagnostics, pharmaceutical management, dental practice operations, diagnostic imaging, and medical supply chains.",
    "Our platforms are designed from first principles for African operating conditions. They function in low-connectivity environments, support multiple languages, and scale from a single-facility deployment to continent-wide rollout.",
  ],
  /** Beside Get started, which uses the shared sign-up label. */
  whatWeDoSecondaryAction: "Explore our products",
  imageAlternative: "A woman with braided hair using a tablet computer.",
  audienceHeading: "Who we build for",
  audienceIntroduction:
    "Each product is purpose-built for a specific healthcare institution type. It is designed from the ground up to address the exact workflows, operational challenges, and clinical realities of that setting.",
  audienceListLabel: "Institutions we build for",
  approachSummary:
    "We work with each organisation in four stages: we learn how your teams work, set the product up around your services and roles, connect it to the systems you already use so information is not entered twice, and train and support your staff from launch onwards.",
} as const;
