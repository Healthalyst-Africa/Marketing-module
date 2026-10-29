import type {
  FormFieldDefinition,
  FormFieldGroup,
} from "@healthalyst/ui/types/form-definition";

/** Names of the controls collected by the job application form. */
export type JobApplicationFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "location"
  | "cvAddress"
  | "portfolioAddress"
  | "linkedInAddress"
  | "coverNote";

/**
 * One field collected by the job application form. Every field states whether
 * it is required and its longest accepted value, which the server enforces.
 */
export type JobApplicationField = FormFieldDefinition & {
  name: JobApplicationFieldName;
  required: boolean;
  maxLength: number;
};

/** Fields presented together under one legend in the application form. */
export type JobApplicationFieldGroup = FormFieldGroup<JobApplicationField>;

/** A validated application, ready to be stored. */
export interface JobApplicationSubmission {
  roleSlug: string;
  roleTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  cvAddress: string;
  portfolioAddress: string;
  linkedInAddress: string;
  coverNote: string;
}
