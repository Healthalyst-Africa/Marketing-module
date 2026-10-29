import { SITE_ROUTES } from "~/config/routes";

/** Element on the contact page that enquiry links scroll to. */
export const ENQUIRY_FORM_IDENTIFIER = "enquiry-form";

/** Query parameter that starts an enquiry on a particular topic. */
export const CONTACT_TOPIC_PARAMETER = "enquiry";

/** Contact page addresses that open the form with a topic already chosen. */
export const CONTACT_TOPIC_DESTINATIONS = {
  partnership: `${SITE_ROUTES.contact}?${CONTACT_TOPIC_PARAMETER}=partnership#${ENQUIRY_FORM_IDENTIFIER}`,
  investment: `${SITE_ROUTES.contact}?${CONTACT_TOPIC_PARAMETER}=investment#${ENQUIRY_FORM_IDENTIFIER}`,
} as const;

/** Query parameter that names the product an enquiry starts from. */
export const CONTACT_PRODUCT_PARAMETER = "product";
