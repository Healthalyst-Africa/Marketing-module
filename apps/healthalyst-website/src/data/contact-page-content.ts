import type { MarketingSequenceStep } from "@healthalyst/ui/components/marketing-sequence";
import {
  COMPANY_OFFICE_ADDRESS,
  CONTACT_TOPIC_DESTINATIONS,
} from "~/data/site";

/**
 * Contact page copy. Text marked as drafted in `docs/website-revamp.md` awaits
 * company approval before release.
 */
export const CONTACT_PAGE_CONTENT = {
  title: "Contact us",
  metadataDescription:
    "Contact Healthalyst Africa about software for your hospital, laboratory, pharmacy, dental practice, imaging centre or supply organisation, or about partnership and investment.",
  heading: "Contact us",
  lede: "Tell us about your institution and what you need. Our team aims to respond within two business days.",
  otherRoutesHeading: "Other ways to reach us",
  contactDetailsHeading: "Contact details",
  nextStepsHeading: "What happens next",
} as const;

export const CONTACT_FORM_CONTENT = {
  heading: "Send an enquiry",
  submitLabel: "Send enquiry",
  submittingLabel: "Sending enquiry…",
  helperText: "All fields are required unless marked optional.",
  successHeading: "Enquiry sent",
  successMessage:
    "Thank you. Our team aims to respond within two business days.",
  resetLabel: "Send another enquiry",
  failureMessage:
    "Your enquiry was not sent. Check your connection and try again.",
} as const;

/** Enquiries that use the same form with a topic already chosen. */
export const CONTACT_OTHER_ROUTES = [
  {
    term: "Partnerships",
    description:
      "Technology, implementation and development partners working in African healthcare.",
    destination: CONTACT_TOPIC_DESTINATIONS.partnership,
    actionLabel: "Start a partnership enquiry",
  },
  {
    term: "Investors",
    description:
      "Funds and investors who would like to speak with the company.",
    destination: CONTACT_TOPIC_DESTINATIONS.investment,
    actionLabel: "Start an investment enquiry",
  },
] as const;

/**
 * Direct contact details. Each entry appears on the page only once the company
 * supplies it; nothing is shown in its place until then.
 */
export const CONTACT_DETAILS: {
  email?: string;
  phoneNumber?: string;
  officeAddress?: string;
} = {};

export const CONTACT_NEXT_STEPS: readonly MarketingSequenceStep[] = [
  {
    title: "We reply within two business days",
    description: "Our team aims to respond within two business days.",
  },
  {
    title: "We arrange a discovery consultation",
    description:
      "A structured conversation to understand your institution’s context.",
  },
  {
    title: "We recommend a way forward",
    description:
      "We identify the right products and outline an implementation approach.",
  },
];

const OFFICE_MAP_QUERY = encodeURIComponent(COMPANY_OFFICE_ADDRESS.mapQuery);

/**
 * The office map above the footer. Google's keyless address embed, loaded
 * lazily; directions use Google's documented Maps URLs. The heading,
 * introduction and labels are drafts awaiting approval.
 */
export const CONTACT_OFFICE_MAP = {
  identifier: "visit-our-office",
  heading: "Visit our office",
  introduction: "Our office is in Ikeja, Lagos.",
  organisationName: "Healthalyst Africa",
  addressLines: COMPANY_OFFICE_ADDRESS.lines,
  mapTitle: "Map of the Healthalyst Africa office in Ikeja, Lagos",
  embedSource: `https://maps.google.com/maps?q=${OFFICE_MAP_QUERY}&z=16&hl=en&output=embed`,
  directionsDestination: `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_MAP_QUERY}`,
  directionsLabel: "Get directions",
} as const;
