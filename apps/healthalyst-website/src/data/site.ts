import type {
  Institution,
  NavigationLink,
  Pillar,
  SiteLink,
  Statistic,
} from "~/types";

/** Published routes. Add a page here when it is released. */
export const SITE_ROUTES = {
  home: "/",
  about: "/about",
  contact: "/contact",
} as const;

/** The company's office, one entry per displayed line. */
export const COMPANY_OFFICE_ADDRESS = {
  label: "Office",
  lines: [
    "11 Adenubi Close, off Majekodunmi Street,",
    "off Allen Avenue, Ikeja,",
    "Lagos, Nigeria",
  ],
  /**
   * The address as a map search. The "off …" directions are left out so the
   * map service matches the street address itself.
   */
  mapQuery: "11 Adenubi Close, Ikeja, Lagos, Nigeria",
} as const;

/** Element on the contact page that enquiry links scroll to. */
export const ENQUIRY_FORM_IDENTIFIER = "enquiry-form";

/** Query parameter that starts an enquiry on a particular topic. */
export const CONTACT_TOPIC_PARAMETER = "enquiry";

/** Contact page addresses that open the form with a topic already chosen. */
export const CONTACT_TOPIC_DESTINATIONS = {
  partnership: `${SITE_ROUTES.contact}?${CONTACT_TOPIC_PARAMETER}=partnership#${ENQUIRY_FORM_IDENTIFIER}`,
  investment: `${SITE_ROUTES.contact}?${CONTACT_TOPIC_PARAMETER}=investment#${ENQUIRY_FORM_IDENTIFIER}`,
} as const;

/**
 * Routes whose site header starts in the brand colour. None at present: the
 * contact page's green opening is a card below the white site header.
 */
export const BRAND_HEADER_ROUTES: readonly string[] = [];

/** Header links shown after the Solutions menu. */
export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: "How we work", destination: `${SITE_ROUTES.home}#how-we-work` },
  { label: "About", destination: SITE_ROUTES.about },
];

/** The header's Solutions menu, listing products by the institution they serve. */
export const SOLUTIONS_MENU_CONTENT = {
  label: "Solutions",
  footerPrompt: "Not sure which product fits your institution?",
  footerAction: "Talk to our team",
} as const;
export const STATISTICS: Statistic[] = [
  {
    number: "6",
    label: "Digital Product Lines",
    supportingText: "Purpose-built, not adapted",
  },
  {
    number: "54+",
    label: "African Nations",
    supportingText: "Continent-wide expansion",
  },
  {
    number: "100%",
    label: "African-Context Design",
    supportingText: "Offline-first architecture",
  },
  {
    number: "1",
    label: "Connected Ecosystem",
    supportingText: "All products interoperable",
  },
];

export const PILLARS: Pillar[] = [
  {
    icon: "◈",
    title: "African Infrastructure First",
    body: "Offline-first architecture. Low-bandwidth optimisation. Short message service and unstructured supplementary service data fallback. Multilingual support. These are foundations, not optional features.",
  },
  {
    icon: "⬡",
    title: "Interoperable by Design",
    body: "A patient's journey across a hospital, laboratory, imaging centre, and pharmacy exists as one coherent digital record. No data silos. No manual transfers.",
  },
  {
    icon: "◇",
    title: "Institution-Grade Security",
    body: "Role-based access control, encrypted data storage, full audit trails, and compliance with international health data protection standards.",
  },
  {
    icon: "◎",
    title: "Long-Term Partnership",
    body: "We measure success by the health outcomes your institution delivers, alongside the implementation, training, and evolution built into how we work.",
  },
];

export const INSTITUTIONS: Institution[] = [
  {
    name: "Hospitals and clinics",
    product: "HealthSchedule",
    description: "patient scheduling and clinical operations",
  },
  {
    name: "Laboratories",
    product: "LabConnect",
    description: "end-to-end digital diagnostic workflows",
  },
  {
    name: "Pharmacies",
    product: "PharmaDesk",
    description: "prescription and inventory management",
  },
  {
    name: "Dental practices",
    product: "DentaFlow",
    description: "scheduling, charting and patient management",
  },
  {
    name: "Imaging centres",
    product: "ImagingHub",
    description: "referral management and radiology reporting",
  },
  {
    name: "Equipment suppliers and institutions",
    product: "MedSupply",
    description: "digital procurement and supply chain",
  },
];

/**
 * Footer destinations. A link without a destination has no published page yet
 * and is shown as plain text. Links that point at the contact page or at a
 * section of another page are interim destinations until their own page is
 * released.
 */
export const FOOTER_COMPANY_LINKS: readonly SiteLink[] = [
  { label: "About us", destination: SITE_ROUTES.about },
  { label: "Our approach", destination: `${SITE_ROUTES.about}#how-we-work` },
  { label: "Careers" },
  { label: "Press and media" },
  { label: "Partners", destination: CONTACT_TOPIC_DESTINATIONS.partnership },
];

export const FOOTER_CONNECT_LINKS: readonly SiteLink[] = [
  { label: "Contact us", destination: SITE_ROUTES.contact },
  {
    label: "Partnership enquiries",
    destination: CONTACT_TOPIC_DESTINATIONS.partnership,
  },
  {
    label: "Investor relations",
    destination: CONTACT_TOPIC_DESTINATIONS.investment,
  },
  { label: "Support", destination: SITE_ROUTES.contact },
];

export const CONTACT_REPRESENTATION_OPTIONS = [
  "Hospital or Clinic",
  "Laboratory / Diagnostic Centre",
  "Pharmacy",
  "Dental Practice",
  "X-Ray / Imaging Centre",
  "Medical Equipment Supplier",
  "Investor / Fund",
  "Government Health Institution",
  "Non-Governmental Organisation / Development Organisation",
  "Technology Partner",
  "Other",
] as const;

export const CONTACT_PRODUCT_OPTIONS = [
  "Full Product Suite",
  "General Partnership",
  "Investment Enquiry",
] as const;
