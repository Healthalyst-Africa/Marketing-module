import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingArrowLink } from "@healthalyst/ui/components/marketing-arrow-link";
import { MarketingCareNetwork } from "@healthalyst/ui/components/marketing-care-network";
import { MarketingRotatingHero } from "@healthalyst/ui/components/marketing-rotating-hero";
import { HOMEPAGE_HERO_CONTENT } from "~/data/homepage-page-content";
import { SITE_ROUTES } from "~/data/site";

export default function Hero() {
  return (
    <MarketingRotatingHero
      identifier="hero"
      headingLead={HOMEPAGE_HERO_CONTENT.headingLead}
      spokenEnding={HOMEPAGE_HERO_CONTENT.spokenEnding}
      stillWord={HOMEPAGE_HERO_CONTENT.stillWord}
      decoration={<MarketingCareNetwork showNetwork={false} />}
      slides={HOMEPAGE_HERO_CONTENT.slides.map((slide, slideIndex) => ({
        word: slide.word,
        photograph: (
          <Image
            src={slide.source}
            alt=""
            fill
            preload={slideIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        ),
      }))}
      lede={<p>{HOMEPAGE_HERO_CONTENT.lede}</p>}
      actions={
        <>
          <ActionLink
            variant="inverse"
            size="extraLarge"
            shape="pill"
            className="w-full sm:w-auto"
          >
            <Link href={SITE_ROUTES.contact}>
              {HOMEPAGE_HERO_CONTENT.primaryAction}
            </Link>
          </ActionLink>
          <MarketingArrowLink
            tone="inverse"
            link={
              <Link href="#products">
                {HOMEPAGE_HERO_CONTENT.secondaryAction}
              </Link>
            }
          />
        </>
      }
    />
  );
}
