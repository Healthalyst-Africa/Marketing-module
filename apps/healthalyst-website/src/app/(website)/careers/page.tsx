import type { Metadata } from "next";
import { SITE_ROUTES } from "~/config/routes";
import CareersPage from "~/features/careers/components/careers-page";
import { CAREERS_PAGE_CONTENT } from "~/features/careers/config/careers-content";

export const metadata: Metadata = {
  title: CAREERS_PAGE_CONTENT.title,
  description: CAREERS_PAGE_CONTENT.metadataDescription,
  alternates: { canonical: SITE_ROUTES.careers },
  openGraph: {
    title: `${CAREERS_PAGE_CONTENT.title} | Healthalyst Africa`,
    description: CAREERS_PAGE_CONTENT.metadataDescription,
    url: SITE_ROUTES.careers,
  },
};

export default function CareersRoute() {
  return <CareersPage />;
}
