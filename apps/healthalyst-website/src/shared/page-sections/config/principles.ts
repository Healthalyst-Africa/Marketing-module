/**
 * The approved pillars as principles, each with a photograph (and the point
 * to keep in view when the frame crops it), shared by the
 * homepage ("Why HealthAlyst") and the About page ("What guides our work").
 * The security pillar leaves out the unconfirmed compliance claim (see
 * `docs/website-revamp.md`).
 */
export const PRINCIPLES = [
  {
    title: "African infrastructure first",
    description:
      "Offline-first architecture. Low-bandwidth optimisation. Short message service and unstructured supplementary service data fallback. Multilingual support. These are foundations, not optional features.",
    photograph: {
      source: "/images/pillar-african-infrastructure.webp",
      alternative:
        "Health workers recording patients at a table during a community medical outreach in Kaduna, Nigeria.",
      focus: "40% center",
    },
  },
  {
    title: "Interoperable by design",
    description:
      "A patient's journey across a hospital, laboratory, imaging centre, and pharmacy exists as one coherent digital record. No data silos. No manual transfers.",
    photograph: {
      source: "/images/pillar-interoperability.webp",
      alternative:
        "Two clinicians working side by side on a tablet and a laptop at a clinic desk.",
      focus: "55% center",
    },
  },
  {
    title: "Institution-grade security",
    description:
      "Role-based access control, encrypted data storage and full audit trails.",
    photograph: {
      source: "/images/pillar-security.webp",
      alternative:
        "A nurse in gloves typing at a hospital records workstation as a colleague hands her a folder.",
      focus: "72% center",
    },
  },
  {
    title: "Long-term partnership",
    description:
      "We measure success by the health outcomes your institution delivers, alongside the implementation, training, and evolution built into how we work.",
    photograph: {
      source: "/images/pillar-partnership.webp",
      alternative:
        "A health educator in a white coat leading a session for a large seated group.",
      focus: "62% center",
    },
  },
] as const;
