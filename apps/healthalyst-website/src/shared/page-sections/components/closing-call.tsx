import Image from "next/image";
import Link from "next/link";
import { CareNetworkIllustration } from "@healthalyst/ui/illustrations/care-network-illustration";
import { MarketingClosingBand } from "@healthalyst/ui/components/marketing-closing-band";
import { CLOSING_CALL_CONTENT } from "~/shared/page-sections/config/closing-call-content";
import { CONTACT_TOPIC_DESTINATIONS } from "~/shared/contact/config/contact-destinations";
import { SITE_ROUTES } from "~/config/routes";

/**
 * The "Talk to our team" closing band, shared by the homepage and the About
 * page: an invitation to enquire that links to the contact page, where the
 * full enquiry form lives.
 */
export function ClosingCall({
  identifier,
}: {
  /** Anchor for links to the band, such as the homepage's `contact`. */
  identifier: string;
}) {
  return (
    <MarketingClosingBand
      identifier={identifier}
      heading={CLOSING_CALL_CONTENT.heading}
      description={CLOSING_CALL_CONTENT.description}
      decoration={<CareNetworkIllustration showNetwork={false} />}
      action={
        <Link href={SITE_ROUTES.contact}>
          {CLOSING_CALL_CONTENT.primaryAction}
        </Link>
      }
      secondaryAction={
        <Link href={CONTACT_TOPIC_DESTINATIONS.partnership}>
          {CLOSING_CALL_CONTENT.secondaryAction}
        </Link>
      }
      photograph={
        <Image
          src={CLOSING_CALL_CONTENT.photograph.source}
          alt={CLOSING_CALL_CONTENT.photograph.alternative}
          fill
          sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, calc(100vw - 40px)"
          className="object-cover"
        />
      }
    />
  );
}
