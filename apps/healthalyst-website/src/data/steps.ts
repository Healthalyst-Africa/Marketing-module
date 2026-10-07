import type { Step } from "~/types";

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Discovery & Scoping",
    tag: "Discovery & scoping",
    headline: "Understanding your institution before writing a line of code",
    body: "We begin with your institution. Before any design or code, our team immerses itself in your workflows, clinical realities, infrastructure constraints, and staff contexts. The brief emerges from your world, rather than from a template.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    tag: "Design & architecture",
    headline: "Built for African operating conditions from the ground up",
    body: "We architect platforms for African operating conditions from day one. Offline-first capability, low-bandwidth optimisation, unstructured supplementary service data and short message service fallback, multilingual interfaces, and field-level mobile usability are structural foundations.",
  },
  {
    number: "03",
    title: "Build & Integration",
    tag: "Build & integration",
    headline: "Platforms that talk to each other and to your existing systems",
    body: "Our platforms are built to integrate into your existing systems and to communicate with each other. A laboratory result processed in LabConnect flows automatically into HealthSchedule. A prescription verified in PharmaDesk creates a traceable dispensing record.",
  },
  {
    number: "04",
    title: "Launch & Continuous Improvement",
    tag: "Launch & continuous improvement",
    headline: "A long-term technology partner, not a one-time vendor",
    body: "Go-live is a beginning, not an end. We provide full implementation support, staff training, and ongoing product iterations. As your institution grows, your platform evolves with it. We are a long-term technology partner, not a one-time vendor.",
  },
];
