import type { Institution, NavLink, Pillar, Stat } from "~/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Products", id: "products" },
  { label: "What We Build", id: "what-we-build" },
  { label: "How We Work", id: "how-we-work" },
  { label: "About", id: "about" },
];

export const STATS: Stat[] = [
  {
    number: "6",
    label: "Digital Product Lines",
    sub: "Purpose-built, not adapted",
  },
  { number: "54+", label: "African Nations", sub: "Continent-wide expansion" },
  {
    number: "100%",
    label: "African-Context Design",
    sub: "Offline-first architecture",
  },
  {
    number: "1",
    label: "Connected Ecosystem",
    sub: "All products interoperable",
  },
];

export const PILLARS: Pillar[] = [
  {
    icon: "◈",
    title: "African Infrastructure First",
    body: "Offline-first architecture. Low-bandwidth optimisation. SMS and USSD fallback. Multilingual support. These are foundations, not optional features.",
  },
  {
    icon: "⬡",
    title: "Interoperable by Design",
    body: "A patient's journey across a hospital, lab, imaging centre, and pharmacy exists as one coherent digital record. No data silos. No manual transfers.",
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
    desc: "patient scheduling and clinical operations",
  },
  {
    name: "Laboratories",
    product: "LabConnect",
    desc: "end-to-end digital diagnostic workflows",
  },
  {
    name: "Pharmacies",
    product: "PharmaDesk",
    desc: "prescription and inventory management",
  },
  {
    name: "Dental Practices",
    product: "DentaFlow",
    desc: "scheduling, charting and patient management",
  },
  {
    name: "Imaging Centres",
    product: "ImagingHub",
    desc: "referral management and radiology reporting",
  },
  {
    name: "Equipment Suppliers & Institutions",
    product: "MedSupply",
    desc: "digital procurement and supply chain",
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
  "NGO / Development Organisation",
  "Technology Partner",
  "Other",
] as const;

export const CONTACT_PRODUCT_OPTIONS = [
  "Full Product Suite",
  "General Partnership",
  "Investment Enquiry",
] as const;
