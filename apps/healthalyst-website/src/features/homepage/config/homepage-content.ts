import { SOLUTION_GROUPS } from "~/shared/products/config/solution-groups";

/**
 * Copy for the rebuilt homepage (`docs/website-refactor-plan.md`). Section
 * headings, ledes and labels are drafts awaiting approval; the facts come
 * from approved content.
 */
export const HOMEPAGE_HERO_CONTENT = {
  headingLead: "Digital infrastructure for",
  /** Shown instead of the rotation under reduced motion. */
  stillWord: "African healthcare",
  spokenEnding:
    "hospitals, laboratories, pharmacies, dental practices, imaging centres and medical suppliers",
  lede: "Purpose-built products that run the daily work of the institutions delivering care across Africa.",
  primaryAction: "Talk to our team",
  secondaryAction: "See our products",
  /** Each institution type and the photograph shown behind it. */
  slides: [
    { word: "hospitals", source: "/images/hero-hospital.webp" },
    { word: "laboratories", source: "/images/hero-laboratory.webp" },
    { word: "pharmacies", source: "/images/hero-pharmacy.webp" },
    { word: "dental practices", source: "/images/hero-dental.webp" },
    { word: "imaging centres", source: "/images/hero-imaging.webp" },
    { word: "medical suppliers", source: "/images/hero-supply.webp" },
  ],
} as const;

export const HOMEPAGE_BUILT_FOR_LABEL =
  "Built for the institutions that deliver care";

export const HOMEPAGE_BENEFITS_CONTENT = {
  identifier: "why-healthalyst",
  heading: "Why HealthAlyst",
  introduction:
    "Four commitments shape every product we build and every institution we work with.",
} as const;

export const HOMEPAGE_PRODUCT_SUITE_CONTENT = {
  identifier: "products",
  heading: "Our product suite",
  introduction:
    "Six products, grouped by the work they support. Each one is built for its own kind of institution.",
  groupsLabel: "Product groups",
} as const;

/** Product groups by need; shared with the Solutions menu. */
export const HOMEPAGE_PRODUCT_GROUPS = SOLUTION_GROUPS;

export const HOMEPAGE_ECOSYSTEM_CONTENT = {
  identifier: "ecosystem",
  heading: "One connected ecosystem",
  introduction:
    "Together, the products form one ecosystem: a patient's journey across hospitals, laboratories, pharmacies and imaging centres becomes a single, coherent digital experience.",
  example:
    "A laboratory result processed in LabConnect flows automatically into HealthSchedule. A prescription verified in PharmaDesk creates a traceable dispensing record.",
  listLabel: "Products in the ecosystem",
} as const;

export const HOMEPAGE_APPROACH_CONTENT = {
  identifier: "how-we-work",
  heading: "How we work with you",
  introduction:
    "Four stages take your organisation from first conversation to a product your staff rely on every day.",
  action: "Start a conversation",
} as const;

export const HOMEPAGE_CONDITIONS_CONTENT = {
  identifier: "african-conditions",
  heading: "Built for African operating conditions",
  introduction:
    "Our platforms are designed from first principles for African operating conditions. These are foundations, not optional features.",
  carouselLabel: "Operating conditions our products are built for",
  chipsLabel: "Choose an operating condition",
} as const;

/**
 * The operating conditions from the approved "African infrastructure first"
 * pillar and about copy. Titles and sentences are drafts awaiting approval.
 */
export const HOMEPAGE_CONDITIONS = [
  {
    title: "Works offline",
    description:
      "Offline-first architecture, so products keep working in low-connectivity environments.",
  },
  {
    title: "Low bandwidth",
    description:
      "Low-bandwidth optimisation is part of the design from the start, not added later.",
  },
  {
    title: "SMS and USSD fallback",
    description:
      "Short message service and unstructured supplementary service data fallback are built into the foundation.",
  },
  {
    title: "Multilingual",
    description:
      "Multilingual support, so teams can work in the languages they use every day.",
  },
  {
    title: "From one facility to a continent",
    description:
      "Products scale from a single-facility deployment to continent-wide rollout.",
  },
] as const;

export const HOMEPAGE_TESTIMONIALS_CONTENT = {
  label: "What our partners say",
  previousLabel: "Previous testimonial",
  nextLabel: "Next testimonial",
} as const;

/**
 * Testimonials for the homepage. Only entries with `isApproved: true` are
 * published: each must be the real words of a named person who agreed to be
 * quoted, confirmed by an accountable company owner. The entries below are
 * dummy samples with invented names and stock portraits (models, not the
 * people named), for the design only: they are shown in
 * development and never in production, until approved testimonials replace
 * them.
 */
export const HOMEPAGE_TESTIMONIALS = [
  {
    quote:
      "Our front desk now sees the whole day at a glance, and patients spend far less time waiting to be seen.",
    name: "Adaeze Okafor",
    role: "Medical director",
    institution: "Private hospital, Lagos",
    portrait: "/images/testimonial-adaeze-okafor.webp",
    isApproved: false,
  },
  {
    quote:
      "Results reach the doctors who ordered them without a single phone call. Our laboratory finally runs on one system.",
    name: "Kwame Mensah",
    role: "Laboratory manager",
    institution: "Diagnostic laboratory, Accra",
    portrait: "/images/testimonial-kwame-mensah.webp",
    isApproved: false,
  },
  {
    quote:
      "Every prescription we dispense is traceable now, and stock counts no longer take a whole weekend.",
    name: "Fatima Bello",
    role: "Superintendent pharmacist",
    institution: "Community pharmacy, Abuja",
    portrait: "/images/testimonial-fatima-bello.webp",
    isApproved: false,
  },
] as const;

export const HOMEPAGE_FAQ_CONTENT = {
  heading: "Frequently asked questions",
  introduction: "Answers to the questions institutions ask us most often.",
} as const;
