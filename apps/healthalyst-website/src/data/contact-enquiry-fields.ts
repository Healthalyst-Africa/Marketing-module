import { PRODUCTS } from "~/data/products";
import {
  CONTACT_PRODUCT_OPTIONS,
  CONTACT_REPRESENTATION_OPTIONS,
} from "~/data/site";
import type { ContactEnquiryField } from "~/types";

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
    label: "First Name",
    placeholder: "First Name",
    autoComplete: "given-name",
    required: true,
    maxLength: 80,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    autoComplete: "family-name",
    required: true,
    maxLength: 80,
  },
  {
    name: "organisation",
    label: "Organisation / Institution Name",
    placeholder: "Organisation / Institution Name",
    autoComplete: "organization",
    required: true,
    maxLength: 160,
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Email Address",
    type: "email",
    autoComplete: "email",
    required: true,
    maxLength: 254,
  },
  {
    name: "phoneNumber",
    label: "Phone Number (optional)",
    placeholder: "Phone Number (optional)",
    type: "tel",
    autoComplete: "tel",
    required: false,
    maxLength: 40,
  },
  {
    name: "institutionType",
    label: "I represent a…",
    placeholder: "I represent a…",
    options: CONTACT_REPRESENTATION_OPTIONS,
    required: true,
    maxLength: 120,
    requiredMessage: "Select the option that best describes your institution.",
  },
  {
    name: "productInterest",
    label: "Product of interest…",
    placeholder: "Product of interest…",
    options: [
      ...PRODUCTS.map((product) => `${product.name}: ${product.category}`),
      ...CONTACT_PRODUCT_OPTIONS,
    ],
    required: true,
    maxLength: 160,
    requiredMessage: "Select the product you are interested in.",
  },
  {
    name: "message",
    label: "Message",
    placeholder:
      "Tell us about your institution and what you're looking to achieve…",
    multiline: true,
    required: true,
    maxLength: 5000,
  },
];
