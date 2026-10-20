import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingCareNetwork } from "@healthalyst/ui/components/marketing-care-network";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingFigure } from "@healthalyst/ui/components/marketing-figure";
import { MarketingHubDiagram } from "@healthalyst/ui/components/marketing-hub-diagram";
import { MarketingPageHeader } from "@healthalyst/ui/components/marketing-page-header";
import { MarketingTextRotator } from "@healthalyst/ui/components/marketing-text-rotator";
import {
  MarketingMotionPauseButton,
  MarketingMotionPauseProvider,
} from "@healthalyst/ui/components/marketing-motion-pause";
import { ABOUT_PAGE_CONTENT } from "~/data/about-page-content";
import { ClosingCall } from "~/components/closing-call";
import { PrinciplesStory } from "~/components/principles-story";
import { INSTITUTIONS, SITE_ROUTES } from "~/data/site";
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
      <MarketingMotionPauseProvider>
        <MarketingPageHeader
          tone="brand"
          shape="card"
          alignment="center"
          decoration={
            <>
              <MarketingCareNetwork showNetwork={false} />
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
      <PrinciplesStory
        identifier="what-guides-our-work"
        heading={ABOUT_PAGE_CONTENT.principlesHeading}
        introduction={ABOUT_PAGE_CONTENT.principlesIntroduction}
      />
      <ClosingCall identifier="talk-to-our-team" />
    </>
  );
}
