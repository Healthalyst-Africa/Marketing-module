import type { Product } from "~/types";

export const PRODUCTS: Product[] = [
  {
    number: "01",
    name: "HealthSchedule",
    category: "Scheduling & Patient Flow",
    tagline: "01 — Scheduling & patient flow",
    headline: "The scheduling layer for hospitals and clinics",
    supportingHeadline:
      "Appointment & scheduling platform for hospitals and clinics",
    description:
      "A comprehensive digital scheduling platform purpose-built for hospitals and clinics. Manages outpatient bookings, specialist queues, inpatient admissions, and multi-department workflows — reducing no-shows and improving patient throughput.",
    builtFor:
      "Hospitals · General Clinics · Specialist Centres · Community Health Facilities",
    capabilities: [
      "Multi-department appointment routing and queue management",
      "Automated patient reminders via short message service, WhatsApp and email",
      "Telehealth and virtual consultation integration",
      "Walk-in triage and emergency queue prioritisation",
      "Cross-visit patient health record linkage",
      "Administrator dashboards and performance analytics",
    ],
  },
  {
    number: "02",
    name: "LabConnect",
    category: "Laboratory & Diagnostics",
    tagline: "02 — Laboratory & diagnostics",
    headline: "End-to-end digital workflow for diagnostic laboratories",
    supportingHeadline: "Laboratory management & digital results platform",
    description:
      "Digitises every step of the laboratory process — from receiving test requests to delivering verified results. Eliminates paper-based reporting, closes the communication gap between laboratories and clinicians, and dramatically reduces result turnaround times.",
    builtFor:
      "Clinical Laboratories · Diagnostic Centres · Pathology Laboratories · Research Institutions",
    capabilities: [
      "Digital laboratory test request management from any connected provider",
      "Sample tracking from collection through to processing",
      "Automated result verification and patient notification",
      "Clinician and referring doctor result-sharing portal",
      "Quality control and accreditation audit logging",
      "Reagent and consumable inventory management",
    ],
  },
  {
    number: "03",
    name: "PharmaDesk",
    category: "Pharmacy & Dispensing",
    tagline: "03 — Pharmacy & dispensing",
    headline: "Digital pharmacy operations from prescription to dispensing",
    supportingHeadline: "Pharmacy & dispensing management platform",
    description:
      "Connects pharmacies to the broader healthcare network. Enables digital prescription intake, intelligent stock management, and refill coordination — improving medication access, reducing dispensing errors, and creating a traceable audit trail.",
    builtFor:
      "Retail Pharmacies · Hospital Pharmacies · Pharmaceutical Chains · Dispensing Clinics",
    capabilities: [
      "Digital prescription intake and verification from connected providers",
      "Medication dispensing records and full audit trails",
      "Real-time stock and inventory management",
      "Patient medication history and refill tracking",
      "Drug interaction and contraindication alert system",
      "Multi-branch stock visibility for pharmacy chains",
    ],
  },
  {
    number: "04",
    name: "DentaFlow",
    category: "Dental Practice Management",
    tagline: "04 — Dental practice management",
    headline: "Scheduling and clinical management built for dentistry",
    supportingHeadline: "Dental practice management platform",
    description:
      "Purpose-built for dental practices — understanding procedure-specific chair time, recall scheduling, treatment plan phasing, and the patient experience in ways that generic clinic systems never do.",
    builtFor:
      "General Dental Clinics · Orthodontic Practices · Oral Surgery Centres · Dental Chains",
    capabilities: [
      "Procedure-specific appointment time blocking per chair",
      "Dental treatment plan creation, tracking and phasing",
      "Automated patient recall and routine check-up reminders",
      "Digital dental charting and clinical notes",
      "Dental X-ray and intraoral imaging system integration",
      "Insurance pre-authorisation and billing workflow support",
    ],
  },
  {
    number: "05",
    name: "ImagingHub",
    category: "Radiology & Imaging",
    tagline: "05 — Radiology & imaging",
    headline: "Digital referral and reporting platform for imaging centres",
    supportingHeadline: "X-ray, radiology & diagnostics referral platform",
    description:
      "Manages the complete imaging workflow — from clinician referral through scan acquisition to radiologist reporting and result delivery. Built for X-ray, computed tomography, magnetic resonance imaging, and ultrasound facilities, with image management compatible with Digital Imaging and Communications in Medicine.",
    builtFor:
      "X-Ray Centres · Radiology Departments · Magnetic Resonance Imaging & Computed Tomography Facilities · Ultrasound Clinics",
    capabilities: [
      "Digital imaging referral intake from any connected provider",
      "Modality-specific scheduling — X-ray, computed tomography, magnetic resonance imaging, Ultrasound",
      "Radiologist reporting queue and workflow management",
      "Image management compatible with Digital Imaging and Communications in Medicine, with secure delivery",
      "Contrast and patient preparation instruction automation",
      "Cross-facility referral tracking and outcome feedback",
    ],
  },
  {
    number: "06",
    name: "MedSupply",
    category: "Equipment & Supply Procurement",
    tagline: "06 — Equipment & supply procurement",
    headline: "Digital procurement for medical equipment and supplies",
    supportingHeadline: "Medical equipment & healthcare supplies platform",
    description:
      "Connects healthcare institutions with vetted medical equipment suppliers and healthcare product distributors. Simplifies the sourcing, ordering, and lifecycle management of devices, diagnostic tools, and clinical consumables.",
    builtFor:
      "Hospitals · Laboratories · Clinics · Government Health Institutions · Non-Governmental Organisation Health Programmes",
    capabilities: [
      "Curated catalogue of verified medical equipment and supplies",
      "Digital procurement and purchase order management",
      "Supplier verification, rating and compliance documentation",
      "Equipment lifecycle and maintenance scheduling",
      "Bulk ordering and institutional pricing frameworks",
      "Last-mile delivery coordination and tracking",
    ],
  },
];
