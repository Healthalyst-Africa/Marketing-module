import {
  ABOUT_CONTENT,
  CATALOGUE_CONTENT,
  CONTACT_CONTENT,
} from "~/data/homepage-content";
import { PILLARS } from "~/data/site";

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
  closingHeading: "Talk to our team",
  closingDescription: CONTACT_CONTENT.paragraphs[0],
  closingPrimaryAction: "Contact us",
  closingSecondaryAction: "Start a partnership enquiry",
} as const;

/** Keeps the first letter and lowers the rest, for the site's sentence case. */
function toSentenceCase(title: string): string {
  return title.charAt(0) + title.slice(1).toLowerCase();
}

/** The approved pillars, with titles in the site's sentence case. */
export const ABOUT_PRINCIPLES = PILLARS.map((pillar) => ({
  term: toSentenceCase(pillar.title),
  description: pillar.body,
}));
