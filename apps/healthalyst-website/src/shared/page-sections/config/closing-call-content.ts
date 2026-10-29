/**
 * The closing band shared by the homepage and the About page. The description
 * reuses approved homepage copy; the heading is a draft awaiting approval.
 * Get started, its main action, uses the shared sign-up label.
 */
export const CLOSING_CALL_CONTENT = {
  heading: "Ready to get started?",
  description:
    "Whether you’re a hospital, laboratory, pharmacy, or any other healthcare institution, we’d like to understand your context and explore how Healthalyst Africa can serve your needs.",
  secondaryAction: "Talk to our team",
  photograph: {
    source: "/images/doctors-discussing.webp",
    alternative:
      "Three doctors in white coats talking, one holding a tablet and one an X-ray.",
  },
} as const;
