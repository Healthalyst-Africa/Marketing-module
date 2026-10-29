import { SITE_ROUTES } from "~/config/routes";
import {
  CONTACT_PRODUCT_PARAMETER,
  ENQUIRY_FORM_IDENTIFIER,
} from "~/shared/contact/config/contact-destinations";

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
