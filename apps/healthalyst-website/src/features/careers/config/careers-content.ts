/**
 * Copy for the careers pages and the application form. Headings, ledes and
 * the form wording are drafts awaiting approval.
 */
export const CAREERS_PAGE_CONTENT = {
  title: "Careers",
  metadataDescription:
    "Join Healthalyst Africa and help build the digital infrastructure of African healthcare. See our open roles.",
  heading: "Careers",
  lede: "Help build the digital infrastructure of African healthcare, with a team that works closely with the institutions that deliver care.",
  openRolesIdentifier: "open-roles",
  openRolesHeading: "Open roles",
  describeOpenRoleCount: (count: number) =>
    `${count} open ${count === 1 ? "role" : "roles"}`,
  noRolesMessage:
    "There are no open roles right now. We still welcome a note through the contact page.",
  speculativeHeading: "Don’t see your role?",
  speculativeDescription:
    "We are always glad to hear from people who want to build for African healthcare. Tell us about yourself through the contact page.",
  speculativeAction: "Get in touch",
};

export const JOB_OPENING_PAGE_CONTENT = {
  introductionHeading: "About the role",
  responsibilitiesHeading: "What you will do",
  requirementsHeading: "What you will bring",
  niceToHaveHeading: "Nice to have",
  otherRolesHeading: "Other open roles",
  viewRoleLabel: "View role and apply",
} as const;

export const JOB_APPLICATION_FORM_CONTENT = {
  endpoint: "/api/careers/applications",
  heading: "Apply for this role",
  submitLabel: "Send application",
  submittingLabel: "Sending application…",
  successHeading: "Application sent",
  successMessage:
    "Thank you for applying. We review every application and will reply by email.",
  resetLabel: "Send another application",
  failureMessage:
    "Your application was not sent. Check your connection and try again.",
} as const;
