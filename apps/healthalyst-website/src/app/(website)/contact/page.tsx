import type { Metadata } from "next";
import { SITE_ROUTES } from "~/config/routes";
import ContactPage from "~/features/contact-enquiry/components/contact-page";
import { CONTACT_PAGE_CONTENT } from "~/features/contact-enquiry/config/contact-page-content";
import { readContactEnquiryPreset } from "~/features/contact-enquiry/utilities/contact-enquiry-preset";

export const metadata: Metadata = {
  title: CONTACT_PAGE_CONTENT.title,
  description: CONTACT_PAGE_CONTENT.metadataDescription,
  alternates: { canonical: SITE_ROUTES.contact },
  openGraph: {
    title: `${CONTACT_PAGE_CONTENT.title} | Healthalyst Africa`,
    description: CONTACT_PAGE_CONTENT.metadataDescription,
    url: SITE_ROUTES.contact,
  },
};

export default async function ContactRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const enquiryPreset = readContactEnquiryPreset(await searchParams);

  return <ContactPage enquiryPreset={enquiryPreset} />;
}
