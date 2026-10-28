import type { Metadata } from "next";
import { SITE_ROUTES } from "~/config/routes";
import AboutPage from "~/features/about/components/about-page";
import { ABOUT_PAGE_CONTENT } from "~/features/about/config/about-page-content";

export const metadata: Metadata = {
  title: ABOUT_PAGE_CONTENT.title,
  description: ABOUT_PAGE_CONTENT.metadataDescription,
  alternates: { canonical: SITE_ROUTES.about },
  openGraph: {
    title: `${ABOUT_PAGE_CONTENT.title} | Healthalyst Africa`,
    description: ABOUT_PAGE_CONTENT.metadataDescription,
    url: SITE_ROUTES.about,
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
