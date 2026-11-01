import type { JobOpening } from "~/features/careers/types/job-opening";
import type {
  JobApplicationField,
  JobApplicationFieldGroup,
} from "~/features/careers/types/job-application";

const LINK_FORMAT_MESSAGE = "Enter a full web address, starting with https://.";

/**
 * Fields collected by the application form for one role. This is the single
 * source of truth for names, labels, limits and requirements: the form renders
 * from it and the server validates against it. A portfolio is required only
 * for roles that ask for one.
 */
export function createJobApplicationFields(
  jobOpening: JobOpening
): readonly JobApplicationField[] {
  return [
    {
      name: "firstName",
      kind: "text",
      label: "First name",
      autoComplete: "given-name",
      required: true,
      requiredMessage: "First name is required.",
      maxLength: 80,
      width: "half",
    },
    {
      name: "lastName",
      kind: "text",
      label: "Last name",
      autoComplete: "family-name",
      required: true,
      requiredMessage: "Last name is required.",
      maxLength: 80,
      width: "half",
    },
    {
      name: "email",
      kind: "email",
      label: "Email address",
      autoComplete: "email",
      placeholder: "name@example.com",
      required: true,
      requiredMessage: "Email address is required.",
      formatMessage: "Enter an email address such as name@example.com.",
      maxLength: 254,
      width: "half",
    },
    {
      name: "phoneNumber",
      kind: "tel",
      label: "Phone number",
      autoComplete: "tel",
      required: false,
      maxLength: 40,
      width: "half",
    },
    {
      name: "location",
      kind: "text",
      label: "Where are you based?",
      description: "City and country.",
      autoComplete: "address-level2",
      required: true,
      requiredMessage: "Tell us where you are based.",
      maxLength: 120,
    },
    {
      name: "cvAddress",
      kind: "url",
      label: "Link to your CV",
      autoComplete: "url",
      placeholder: "https://",
      required: true,
      requiredMessage: "Add a link to your CV.",
      formatMessage: LINK_FORMAT_MESSAGE,
      maxLength: 500,
    },
    {
      name: "portfolioAddress",
      kind: "url",
      label: jobOpening.isPortfolioRequired
        ? "Link to your portfolio"
        : "Link to your portfolio or work samples",
      autoComplete: "url",
      placeholder: "https://",
      required: jobOpening.isPortfolioRequired,
      requiredMessage: "Add a link to your portfolio.",
      formatMessage: LINK_FORMAT_MESSAGE,
      maxLength: 500,
    },
    {
      name: "linkedInAddress",
      kind: "url",
      label: "LinkedIn profile",
      autoComplete: "url",
      placeholder: "https://www.linkedin.com/in/",
      required: false,
      formatMessage: LINK_FORMAT_MESSAGE,
      maxLength: 500,
    },
    {
      name: "coverNote",
      kind: "textarea",
      label: "Why this role?",
      description:
        "A few sentences about why you want this role and what you would bring.",
      required: true,
      requiredMessage: "Tell us briefly why you want this role.",
      maxLength: 3000,
      rows: 6,
    },
  ];
}

/** The application fields for one role, grouped as the form presents them. */
export function createJobApplicationFieldGroups(
  jobOpening: JobOpening
): readonly JobApplicationFieldGroup[] {
  const fields = createJobApplicationFields(jobOpening);

  return [
    { legend: "About you", fields: fields.slice(0, 5) },
    { legend: "Your work", fields: fields.slice(5) },
  ];
}
