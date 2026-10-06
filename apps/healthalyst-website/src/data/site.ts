import type { Institution, NavigationLink, Pillar, Statistic } from "~/types";

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: "Products", identifier: "products" },
  { label: "What We Build", identifier: "what-we-build" },
  { label: "How We Work", identifier: "how-we-work" },
  { label: "About", identifier: "about" },
];

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
    body: "We measure success by the health outcomes your institution delivers — not by licences sold. Implementation, training, and evolution are built into how we work.",
  },
];

export const INSTITUTIONS: Institution[] = [
  {
    name: "Hospitals & Clinics",
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
    name: "Dental Practices",
    product: "DentaFlow",
    description: "scheduling, charting and patient management",
  },
  {
    name: "Imaging Centres",
    product: "ImagingHub",
    description: "referral management and radiology reporting",
  },
  {
    name: "Equipment Suppliers & Institutions",
    product: "MedSupply",
    description: "digital procurement and supply chain",
  },
];

export const FOOTER_COMPANY_LINKS = [
  "About Us",
  "Our Approach",
  "Careers",
  "Press & Media",
  "Partners",
] as const;

export const FOOTER_CONNECT_LINKS = [
  "Contact Us",
  "Partnership Enquiries",
  "Investor Relations",
  "Support",
] as const;

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
