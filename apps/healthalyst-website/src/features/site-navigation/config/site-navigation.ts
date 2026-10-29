import { SITE_ROUTES } from "~/config/routes";
import type {
  NavigationLink,
  SiteLink,
} from "~/features/site-navigation/types/site-navigation";

/**
 * Routes whose site header starts in the brand colour. None at present: the
 * contact page's green opening is a card below the white site header.
 */
export const BRAND_HEADER_ROUTES: readonly string[] = [];

/** Header links shown after the Solutions menu. */
export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: "About", destination: SITE_ROUTES.about },
  { label: "FAQ", destination: `${SITE_ROUTES.home}#faq` },
  { label: "Contact us", destination: SITE_ROUTES.contact },
];

/** The header's Solutions menu, listing products by the institution they serve. */
export const SOLUTIONS_MENU_CONTENT = {
  label: "Solutions",
  heading: "Find the right product for your institution",
  featureDescription:
    "Not sure which product fits your institution? Our team will help you choose.",
  featureAction: "Talk to our team",
  featurePhotograph: "/images/clinician-tablet.webp",
} as const;

/**
 * Footer destinations. A link without a destination has no published page yet
 * and is shown as plain text. Links that point at the contact page or at a
 * section of another page are interim destinations until their own page is
 * released.
 */
export const FOOTER_COMPANY_LINKS: readonly SiteLink[] = [
  { label: "About us", destination: SITE_ROUTES.about },
  { label: "Careers", destination: SITE_ROUTES.careers },
  { label: "Terms and conditions" },
  { label: "Privacy policy" },
];

export const FOOTER_CONNECT_LINKS: readonly SiteLink[] = [
  { label: "Contact us", destination: SITE_ROUTES.contact },
];
