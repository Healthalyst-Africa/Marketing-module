import Link from "next/link";
import { MarketingClosingBand } from "@healthalyst/ui/components/marketing-closing-band";
import { CONTACT_CONTENT } from "~/data/homepage-content";
import { SITE_ROUTES } from "~/data/site";

/**
 * Homepage invitation to enquire. Keeps the `#contact` anchor for existing
 * links; the full enquiry form lives on the contact page.
 */
export default function Contact() {
  return (
    <MarketingClosingBand
      identifier="contact"
      heading={CONTACT_CONTENT.heading}
      description={CONTACT_CONTENT.paragraphs[0] ?? ""}
      action={<Link href={SITE_ROUTES.contact}>Start an enquiry</Link>}
    />
  );
}
