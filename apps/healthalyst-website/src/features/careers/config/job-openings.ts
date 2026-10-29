import type { JobOpening } from "~/features/careers/types/job-opening";

/**
 * Open roles, in the order the careers page lists them. Remove a role here to
 * close it; its page then returns "not found". The descriptions are drafts
 * awaiting the hiring manager's approval, and no salary or benefits are stated
 * until the company confirms them.
 */
export const JOB_OPENINGS: readonly JobOpening[] = [
  {
    slug: "product-designer",
    title: "Product Designer",
    team: "Product",
    location: "Hybrid, Lagos",
    employmentType: "Full time",
    summary:
      "Design clear, dependable software for the hospitals, laboratories and pharmacies that use our products.",
    introduction:
      "You will design across our six products, working with product, engineering and the people who use them every day: clinicians, laboratory scientists, pharmacists and administrators. The work is used in busy facilities, on shared devices and slow connections, so clarity matters more than decoration.",
    responsibilities: [
      "Design complete flows, from research and early sketches to high-fidelity designs and prototypes.",
      "Turn real clinical and administrative workflows into simple, consistent interfaces with product and engineering.",
      "Plan and run usability tests with healthcare staff, and act on what you learn.",
      "Design for low bandwidth, offline use, shared devices and several languages.",
      "Maintain and extend our design system together with engineering.",
    ],
    requirements: [
      "A portfolio of shipped product work that shows how you reached your decisions.",
      "Several years designing web or mobile products, ideally software people use all day.",
      "Strong interaction and visual design skills, with Figma as your main tool.",
      "Experience planning and running user research and usability tests.",
      "Clear writing and the confidence to explain design decisions to non-designers.",
    ],
    niceToHave: [
      "Experience designing for healthcare, enterprise or operations software.",
      "A working knowledge of accessibility standards such as WCAG.",
    ],
    isPortfolioRequired: true,
  },
  {
    slug: "marketing-strategist",
    title: "Marketing Strategist",
    team: "Marketing",
    location: "Hybrid, Lagos",
    employmentType: "Full time",
    summary:
      "Shape how hospitals, laboratories and other institutions across Africa discover and choose Healthalyst.",
    introduction:
      "You will own how we take six products to the institutions they serve, from positioning and messaging to the campaigns that bring in enquiries. You will work closely with product and with the team that talks to institutions every day.",
    responsibilities: [
      "Build and run the marketing plan for our products and the institutions they serve.",
      "Define positioning and messaging for each audience, with product and the commercial team.",
      "Plan, launch and measure campaigns across the website, email, events and social media.",
      "Produce case studies and content with partner institutions.",
      "Report on what is working, and adjust plans based on results.",
    ],
    requirements: [
      "Several years in business-to-business marketing, ideally software or health technology.",
      "A record of campaigns tied to measurable results, such as qualified enquiries.",
      "Excellent written English and the ability to explain technical products simply.",
      "Comfort with web analytics and customer relationship management tools.",
    ],
    niceToHave: [
      "Knowledge of healthcare markets in Nigeria or across Africa.",
      "Experience marketing to hospitals, laboratories or pharmacies.",
    ],
    isPortfolioRequired: false,
  },
];

/** The opening with this slug, or undefined when no such role is open. */
export function findJobOpening(slug: string): JobOpening | undefined {
  return JOB_OPENINGS.find((jobOpening) => jobOpening.slug === slug);
}
