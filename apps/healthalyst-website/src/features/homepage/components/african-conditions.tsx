"use client";

import {
  FacilityScaleIcon,
  LowBandwidthIcon,
  MultilingualIcon,
  OfflineIcon,
  TextMessageIcon,
} from "@healthalyst/icons";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { ContourPatternIllustration } from "@healthalyst/ui/illustrations/contour-pattern-illustration";
import { MarketingFeatureCarousel } from "@healthalyst/ui/components/marketing-feature-carousel";
import {
  HOMEPAGE_CONDITIONS,
  HOMEPAGE_CONDITIONS_CONTENT,
} from "~/features/homepage/config/homepage-content";

/** One icon per condition, in order. */
const CONDITION_ICONS = [
  <OfflineIcon key="offline" />,
  <LowBandwidthIcon key="low-bandwidth" />,
  <TextMessageIcon key="text-message" />,
  <MultilingualIcon key="multilingual" />,
  <FacilityScaleIcon key="scale" />,
];

export default function AfricanConditions() {
  return (
    <MarketingContentSection
      identifier={HOMEPAGE_CONDITIONS_CONTENT.identifier}
      tone="subtle"
      alignment="center"
      decoration={<ContourPatternIllustration className="text-accent" />}
      heading={HOMEPAGE_CONDITIONS_CONTENT.heading}
      introduction={<p>{HOMEPAGE_CONDITIONS_CONTENT.introduction}</p>}
    >
      <MarketingFeatureCarousel
        carouselLabel={HOMEPAGE_CONDITIONS_CONTENT.carouselLabel}
        chipsLabel={HOMEPAGE_CONDITIONS_CONTENT.chipsLabel}
        features={HOMEPAGE_CONDITIONS.map((condition, conditionIndex) => ({
          title: condition.title,
          description: condition.description,
          icon: CONDITION_ICONS[conditionIndex],
        }))}
      />
    </MarketingContentSection>
  );
}
