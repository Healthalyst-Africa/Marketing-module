import { ABOUT_CONTENT, CATALOGUE_CONTENT } from "~/data/homepage-content";

/**
 * Copy for the About us page. Paragraphs reuse approved homepage content;
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
  whatWeDoParagraphs: ABOUT_CONTENT.paragraphs,
  whatWeDoPrimaryAction: "Explore our products",
  whatWeDoSecondaryAction: "See how we work",
  imageAlternative: "A woman with braided hair using a tablet computer.",
  audienceHeading: "Who we build for",
  audienceIntroduction: CATALOGUE_CONTENT.paragraphs[0],
  audienceListLabel: "Institutions we build for",
  approachSummary:
    "We work with each organisation in four stages: we learn how your teams work, set the product up around your services and roles, connect it to the systems you already use so information is not entered twice, and train and support your staff from launch onwards.",
  principlesHeading: "What guides our work",
  principlesIntroduction:
    "Four commitments shape every product we build and every institution we work with.",
} as const;
