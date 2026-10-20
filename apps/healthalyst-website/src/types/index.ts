import type {
  FormFieldDefinition,
  FormFieldGroup,
} from "@healthalyst/ui/lib/form-definition";

/** A single Healthalyst Africa product line. */
export interface Product {
  /** Zero-padded display index, for example `01`. */
  number: string;
  name: string;
  category: string;
  tagline: string;
  headline: string;
  supportingHeadline: string;
  description: string;
  /** Human-readable list of the institution types this product serves. */
  builtFor: string;
  capabilities: string[];
}

/** One stage of the implementation process. */
export interface Step {
  number: string;
  title: string;
  tag: string;
  headline: string;
  body: string;
}

/** A frequently asked question and its answer. */
export interface FAQ {
  question: string;
  answer: string;
}

/** A headline figure shown in the statistics bar. */
export interface Statistic {
  number: string;
  label: string;
  supportingText: string;
}

/** A supporting principle shown in the About section. */
export interface Pillar {
  icon: string;
  title: string;
  body: string;
}

/** An institution type listed in the Contact section. */
export interface Institution {
  name: string;
  product: string;
  description: string;
}

/** A footer or navigation destination; omit `destination` while the page is unpublished. */
export interface SiteLink {
  label: string;
  destination?: string;
}

/** A header navigation entry: a page or a section anchor on a page. */
export interface NavigationLink {
  label: string;
  destination: string;
}

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
