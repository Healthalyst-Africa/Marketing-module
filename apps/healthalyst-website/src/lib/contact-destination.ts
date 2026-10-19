import { PRODUCTS } from "~/data/products";
import { CONTACT_PRODUCT_INTEREST_OPTIONS } from "~/data/contact-enquiry-fields";
import {
  CONTACT_TOPIC_PARAMETER,
  ENQUIRY_FORM_IDENTIFIER,
  SITE_ROUTES,
} from "~/data/site";
import type { ContactEnquiryFieldName } from "~/types";

/** Query parameter that names the product an enquiry starts from. */
export const CONTACT_PRODUCT_PARAMETER = "product";

/** Values a link can place in the enquiry form before the visitor starts. */
export type ContactEnquiryPreset = Partial<
  Record<ContactEnquiryFieldName, string>
>;

/** Topics that a link can open the form with, and the answers they imply. */
const TOPIC_PRESETS: Readonly<Record<string, ContactEnquiryPreset>> = {
  partnership: { productInterest: "General Partnership" },
  investment: {
    productInterest: "Investment Enquiry",
    institutionType: "Investor / Fund",
  },
};

/** Address of the contact page, optionally starting from one product. */
export function createContactDestination(productName?: string): string {
  if (!productName) {
    return SITE_ROUTES.contact;
  }

  const searchParameters = new URLSearchParams({
    [CONTACT_PRODUCT_PARAMETER]: productName,
  });

  return `${SITE_ROUTES.contact}?${searchParameters.toString()}#${ENQUIRY_FORM_IDENTIFIER}`;
}

/**
 * Turns a product name from the address into the matching select option.
 * Unknown or repeated values are ignored so the visitor chooses for themselves.
 */
export function readProductInterestFromParameter(
  parameterValue: string | string[] | undefined
): string | undefined {
  if (typeof parameterValue !== "string") {
    return undefined;
  }

  const product = PRODUCTS.find(
    (candidate) => candidate.name === parameterValue
  );

  if (!product) {
    return undefined;
  }

  return CONTACT_PRODUCT_INTEREST_OPTIONS.find(
    (option) => option === `${product.name}: ${product.category}`
  );
}

/**
 * Reads the product or topic named in the contact page address and returns the
 * form values it implies. A product takes precedence over a topic.
 */
export function readContactEnquiryPreset(
  searchParameters: Readonly<Record<string, string | string[] | undefined>>
): ContactEnquiryPreset {
  const productInterest = readProductInterestFromParameter(
    searchParameters[CONTACT_PRODUCT_PARAMETER]
  );

  if (productInterest) {
    return { productInterest };
  }

  const topic = searchParameters[CONTACT_TOPIC_PARAMETER];

  if (typeof topic === "string" && Object.hasOwn(TOPIC_PRESETS, topic)) {
    return { ...TOPIC_PRESETS[topic] };
  }

  return {};
}
