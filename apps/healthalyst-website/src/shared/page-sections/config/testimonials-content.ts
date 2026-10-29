export const TESTIMONIALS_CONTENT = {
  label: "What our partners say",
  previousLabel: "Previous testimonial",
  nextLabel: "Next testimonial",
} as const;

/**
 * Testimonials shared by the homepage and the About page. Only entries with `isApproved: true` are
 * published: each must be the real words of a named person who agreed to be
 * quoted, confirmed by an accountable company owner. The entries below are
 * dummy samples with invented names and stock portraits (models, not the
 * people named), for the design only: they are shown in
 * development and never in production, until approved testimonials replace
 * them.
 */
export const TESTIMONIALS = [
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
