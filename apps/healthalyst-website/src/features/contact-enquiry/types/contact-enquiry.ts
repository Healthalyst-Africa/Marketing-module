import type {
  FormFieldDefinition,
  FormFieldGroup,
} from "@healthalyst/ui/types/form-definition";

/** Names of the controls collected by the public enquiry form. */
export type ContactEnquiryFieldName =
  | "firstName"
  | "lastName"
  | "organisation"
  | "email"
  | "phoneNumber"
  | "institutionType"
  | "productInterest"
  | "message";

/**
 * One field collected by the public enquiry form. Every field states whether
 * it is required and its longest accepted value, which the server enforces.
 */
export type ContactEnquiryField = FormFieldDefinition & {
  /** Control name; also the request key and the validation key. */
  name: ContactEnquiryFieldName;
  required: boolean;
  /** Longest accepted value, enforced in the browser and on the server. */
  maxLength: number;
};

/** Fields presented together under one legend in the enquiry form. */
export type ContactEnquiryFieldGroup = FormFieldGroup<ContactEnquiryField>;

/** A validated enquiry, ready to be stored. */
export interface ContactEnquirySubmission {
  firstName: string;
  lastName: string;
  organisation: string;
  email: string;
  phoneNumber: string;
  institutionType: string;
  productInterest: string;
  message: string;
}
