import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingCareNetwork } from "@healthalyst/ui/components/marketing-care-network";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingFigure } from "@healthalyst/ui/components/marketing-figure";
import { MarketingHubDiagram } from "@healthalyst/ui/components/marketing-hub-diagram";
import { MarketingPageHeader } from "@healthalyst/ui/components/marketing-page-header";
import { MarketingRecordList } from "@healthalyst/ui/components/marketing-record-list";
import {
  ABOUT_PAGE_CONTENT,
  ABOUT_PRINCIPLES,
} from "~/data/about-page-content";
import {
  CONTACT_TOPIC_DESTINATIONS,
  INSTITUTIONS,
  SITE_ROUTES,
} from "~/data/site";
import { LogoMark } from "~/components/layout/logo";
import { PRODUCT_ICONS_BY_NAME } from "~/components/product-icons";
import { createContactDestination } from "~/lib/contact-destination";

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

export default function AboutPage() {
  return (
    <>
      <MarketingPageHeader
        tone="brand"
        shape="card"
        decoration={<MarketingCareNetwork />}
        heading={ABOUT_PAGE_CONTENT.heading}
        lede={<p>{ABOUT_PAGE_CONTENT.lede}</p>}
      />
      <MarketingContentSection
        identifier="what-we-do"
        heading={ABOUT_PAGE_CONTENT.whatWeDoHeading}
        introduction={ABOUT_PAGE_CONTENT.whatWeDoParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        actions={
          <>
            <ActionLink size="extraLarge" shape="pill">
              <Link href={`${SITE_ROUTES.home}#products`}>
                {ABOUT_PAGE_CONTENT.whatWeDoPrimaryAction}
              </Link>
            </ActionLink>
            <ActionLink variant="outline" size="extraLarge" shape="pill">
              <Link href="#how-we-work">
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
      <MarketingContentSection
        identifier="what-guides-our-work"
        heading={ABOUT_PAGE_CONTENT.principlesHeading}
      >
        <MarketingRecordList
          className="sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10"
          records={ABOUT_PRINCIPLES}
        />
      </MarketingContentSection>
      <MarketingContentSection
        identifier="talk-to-our-team"
        heading={ABOUT_PAGE_CONTENT.closingHeading}
        introduction={<p>{ABOUT_PAGE_CONTENT.closingDescription}</p>}
        actions={
          <>
            <ActionLink size="extraLarge" shape="pill">
              <Link href={SITE_ROUTES.contact}>
                {ABOUT_PAGE_CONTENT.closingPrimaryAction}
              </Link>
            </ActionLink>
            <ActionLink variant="outline" size="extraLarge" shape="pill">
              <Link href={CONTACT_TOPIC_DESTINATIONS.partnership}>
                {ABOUT_PAGE_CONTENT.closingSecondaryAction}
              </Link>
            </ActionLink>
          </>
        }
      />
    </>
  );
}
