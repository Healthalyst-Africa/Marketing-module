import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { CareNetworkIllustration } from "@healthalyst/ui/illustrations/care-network-illustration";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingFigure } from "@healthalyst/ui/components/marketing-figure";
import { MarketingHubDiagram } from "@healthalyst/ui/components/marketing-hub-diagram";
import { MarketingPageHeader } from "@healthalyst/ui/components/marketing-page-header";
import { MarketingTextRotator } from "@healthalyst/ui/components/marketing-text-rotator";
import {
  MarketingMotionPauseButton,
  MarketingMotionPauseProvider,
} from "@healthalyst/ui/components/marketing-motion-pause";
import { ABOUT_PAGE_CONTENT } from "~/features/about/config/about-page-content";
import { ClosingCall } from "~/shared/page-sections/components/closing-call";
import Testimonials from "~/shared/page-sections/components/testimonials";
import { INSTITUTIONS } from "~/shared/products/config/institutions";
import {
  ORGANIZATION_APP_ACTIONS,
  ORGANIZATION_APP_ROUTES,
} from "~/config/organization-app";
import { SITE_ROUTES } from "~/config/routes";
import { LogoMark } from "~/components/ui/healthalyst-brand";
import { PRODUCT_ICONS_BY_NAME } from "~/shared/products/config/product-icons";
import { PRODUCT_ILLUSTRATIONS_BY_NAME } from "~/shared/products/config/product-illustrations";
import { createContactDestination } from "~/shared/contact/utilities/create-contact-destination";

export default function AboutPage() {
  return (
    <>
      <MarketingMotionPauseProvider>
        <MarketingPageHeader
          tone="brand"
          shape="card"
          alignment="center"
          decoration={
            <>
              <CareNetworkIllustration showNetwork={false} />
              <MarketingMotionPauseButton className="absolute right-3 top-3 z-10 md:right-5 md:top-5" />
            </>
          }
          heading={ABOUT_PAGE_CONTENT.heading}
          lede={<p>{ABOUT_PAGE_CONTENT.lede}</p>}
          tagline={
            <p>
              {ABOUT_PAGE_CONTENT.taglineLead}{" "}
              <span className="sr-only">
                {ABOUT_PAGE_CONTENT.taglineWords.join(", ")}
              </span>
              <MarketingTextRotator
                words={ABOUT_PAGE_CONTENT.taglineWords}
                stillWord={ABOUT_PAGE_CONTENT.taglineStillWord}
                className="text-left text-accent"
              />
            </p>
          }
        />
      </MarketingMotionPauseProvider>
      <MarketingContentSection
        identifier="what-we-do"
        heading={ABOUT_PAGE_CONTENT.whatWeDoHeading}
        introduction={ABOUT_PAGE_CONTENT.whatWeDoParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        actions={
          <>
            <ActionLink size="extraLarge" shape="pill">
              <a href={ORGANIZATION_APP_ROUTES.signUp}>
                {ORGANIZATION_APP_ACTIONS.signUpLabel}
              </a>
            </ActionLink>
            <ActionLink variant="outline" size="extraLarge" shape="pill">
              <Link href={`${SITE_ROUTES.home}#products`}>
                {ABOUT_PAGE_CONTENT.whatWeDoSecondaryAction}
              </Link>
            </ActionLink>
          </>
        }
        media={
          <MarketingFigure
            aspect="portrait"
            image={
              <Image
                src="/images/clinician-tablet.webp"
                alt={ABOUT_PAGE_CONTENT.imageAlternative}
                fill
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 36vw, calc(100vw - 40px)"
                className="object-cover"
              />
            }
          />
        }
      />
      <MarketingContentSection
        identifier="who-we-build-for"
        alignment="center"
        heading={ABOUT_PAGE_CONTENT.audienceHeading}
        introduction={<p>{ABOUT_PAGE_CONTENT.audienceIntroduction}</p>}
      >
        <MarketingHubDiagram
          hub={<LogoMark />}
          listLabel={ABOUT_PAGE_CONTENT.audienceListLabel}
          nodes={INSTITUTIONS.map((institution) => ({
            title: institution.name,
            detail: institution.product,
            icon: PRODUCT_ICONS_BY_NAME[institution.product],
            illustration: PRODUCT_ILLUSTRATIONS_BY_NAME[institution.product],
            accessibleSuffix: `: enquire about ${institution.product}`,
            link: <Link href={createContactDestination(institution.product)} />,
          }))}
        />
        <p
          id="how-we-work"
          className="mx-auto mt-12 max-w-[68ch] scroll-mt-28 text-center text-base leading-relaxed text-muted-foreground md:text-[17px]"
        >
          {ABOUT_PAGE_CONTENT.approachSummary}
        </p>
      </MarketingContentSection>
      <Testimonials />
      <ClosingCall identifier="talk-to-our-team" />
    </>
  );
}
