import { PRODUCTS } from "~/data/products";
import {
  CONTACT_PRODUCT_OPTIONS,
  CONTACT_REPRESENTATION_OPTIONS,
} from "~/data/site";
import type {
  ContactEnquiryField,
  ContactEnquiryFieldGroup,
  ContactEnquiryFieldName,
} from "~/types";

/** Product options, in the order the select presents them. */
export const CONTACT_PRODUCT_INTEREST_OPTIONS: readonly string[] = [
  ...PRODUCTS.map((product) => `${product.name}: ${product.category}`),
  ...CONTACT_PRODUCT_OPTIONS,
];

/**
 * Fields collected by the public enquiry form.
 *
 * This is the single source of truth for field names, labels, limits and
 * requirements: the form renders from it and the server validates against it.
 * Field meanings are unchanged — first name, last name, organisation, email,
 * optional phone, institution type, product of interest and message.
 */
export const CONTACT_ENQUIRY_FIELDS: readonly ContactEnquiryField[] = [
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
    placeholder: "name@institution.org",
    required: true,
    requiredMessage: "Email address is required.",
    formatMessage: "Enter a valid email address.",
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
    name: "organisation",
    kind: "text",
    label: "Organisation or institution",
    autoComplete: "organization",
    required: true,
    requiredMessage: "Organisation or institution is required.",
    maxLength: 160,
  },
  {
    name: "institutionType",
    kind: "select",
    label: "Institution type",
    placeholder: "Select the option that fits best",
    options: CONTACT_REPRESENTATION_OPTIONS,
    required: true,
    maxLength: 120,
    requiredMessage: "Select the option that best describes your institution.",
  },
  {
    name: "productInterest",
    kind: "select",
    label: "What would you like to discuss?",
    description:
      "Choose a product, or Full Product Suite if you are not sure yet.",
    placeholder: "Select a product or topic",
    options: CONTACT_PRODUCT_INTEREST_OPTIONS,
    required: true,
    maxLength: 160,
    requiredMessage: "Select the product or topic you would like to discuss.",
  },
  {
    name: "message",
    kind: "textarea",
    label: "Message",
    placeholder:
      "Tell us about your institution and what you want to achieve. Please do not include patient information.",
    rows: 5,
    required: true,
    requiredMessage: "Message is required.",
    maxLength: 5000,
  },
];

/** Fields in the order named, so each group controls its own sequence. */
function selectFields(
  fieldNames: readonly ContactEnquiryFieldName[]
): readonly ContactEnquiryField[] {
  return fieldNames.flatMap((fieldName) =>
    CONTACT_ENQUIRY_FIELDS.filter((field) => field.name === fieldName)
  );
}

/**
 * The same fields, grouped the way the form presents them. Visitors say who
 * they represent and what they need before giving personal details, so the
 * team can route the enquiry.
 */
export const CONTACT_ENQUIRY_FIELD_GROUPS: readonly ContactEnquiryFieldGroup[] =
  [
    {
      fields: selectFields(["organisation", "institutionType"]),
    },
    {
      fields: selectFields(["productInterest", "message"]),
    },
    {
      fields: selectFields(["firstName", "lastName", "email", "phoneNumber"]),
    },
  ];
