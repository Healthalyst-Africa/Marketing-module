import Image from "next/image";
import Link from "next/link";
import { CareNetworkIllustration } from "@healthalyst/ui/illustrations/care-network-illustration";
import { MarketingClosingBand } from "@healthalyst/ui/components/marketing-closing-band";
import { CLOSING_CALL_CONTENT } from "~/shared/page-sections/config/closing-call-content";
import {
  ORGANIZATION_APP_ACTIONS,
  ORGANIZATION_APP_ROUTES,
} from "~/config/organization-app";
import { SITE_ROUTES } from "~/config/routes";

/**
 * The closing band shared by the homepage and the About page: Get started
 * opens sign-up in the organisation app, and Talk to our team the contact
 * page for those who want to speak to someone first.
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
        <a href={ORGANIZATION_APP_ROUTES.signUp}>
          {ORGANIZATION_APP_ACTIONS.signUpLabel}
        </a>
      }
      secondaryAction={
        <Link href={SITE_ROUTES.contact}>
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
