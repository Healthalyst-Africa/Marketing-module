/**
 * How the company works with a health organisation, in order: the homepage
 * steps and the About page summary. Drafted in health-workflow terms,
 * awaiting approval; facts are limited to ones the site already states.
 */
export const APPROACH_STAGES = [
  {
    title: "Understand your workflows",
    description:
      "We spend time with your clinical, administrative and management teams to learn how patients, records, results and supplies move through your organisation.",
  },
  {
    title: "Fit the product to your setting",
    description:
      "We configure the product for your services, roles and approval steps, so it follows the way your staff already work.",
  },
  {
    title: "Connect and automate",
    description:
      "We connect our products to each other and to the systems you already use, so information is not entered twice.",
  },
  {
    title: "Train, launch and support",
    description:
      "We train your staff, support you through launch and keep improving the product as your organisation grows.",
  },
] as const;
