import type { FAQ } from "~/types";

export const FAQS: FAQ[] = [
  {
    q: "What kinds of institutions does Healthalyst Africa work with?",
    a: "We work with the full spectrum of healthcare providers — hospitals and clinics, diagnostic laboratories, pharmacies, dental practices, radiology and imaging centres, and medical equipment suppliers and institutions. Each has a dedicated product module built for their specific workflows.",
  },
  {
    q: "Is Healthalyst Africa a patient-facing platform or a consumer app?",
    a: "Neither. Healthalyst Africa is a B2B health technology company. We build and deploy the digital infrastructure that healthcare institutions use to run their operations. We are not a patient marketplace, consumer app, or scheduling aggregator.",
  },
  {
    q: "Do your six products work together as a connected system?",
    a: "Yes — interoperability is a core architectural principle, not a bolt-on feature. A patient record created in HealthSchedule is accessible in LabConnect and PharmaDesk. A radiology referral initiated in ImagingHub connects back to the originating clinician in HealthSchedule. The suite is modular but unified.",
  },
  {
    q: "How does the technology handle low-connectivity environments?",
    a: "Every platform we build is engineered with an offline-first architecture. Core scheduling, record access, and dispensing functions operate with intermittent connectivity. Where internet access is unavailable, SMS and USSD fallback protocols ensure continuity. We design for the continent's infrastructure reality.",
  },
  {
    q: "Can the platforms be customised for our institution's specific needs?",
    a: "Yes. Our core platforms are production-ready and deployable, but we offer deep configuration and customisation layers for institutions with specific workflow requirements, existing legacy systems, branding standards, or regulatory compliance needs.",
  },
  {
    q: "How does an institution begin working with Healthalyst Africa?",
    a: "Submit an enquiry through our contact form. Our team will reach out to schedule a discovery consultation — a structured conversation to understand your institution's context, identify the right products, and outline an implementation approach. We work with institutions of all sizes and budgets.",
  },
];
