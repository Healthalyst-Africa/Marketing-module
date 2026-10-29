import { SITE_ROUTES } from "~/config/routes";

/** The address of one role's page, such as `/careers/product-designer`. */
export function createJobOpeningDestination(slug: string): string {
  return `${SITE_ROUTES.careers}/${slug}`;
}
