"use client";

import Image from "next/image";
import {
  InteroperabilityIcon,
  OfflineIcon,
  PartnershipIcon,
  SecurityIcon,
} from "@healthalyst/icons";
import { MarketingScrollStory } from "@healthalyst/ui/components/marketing-scroll-story";
import {
  MarketingContainer,
  MarketingSection,
} from "@healthalyst/ui/components/marketing-section";
import { PRINCIPLES } from "~/shared/page-sections/config/principles";

/** One icon per approved principle, in principle order. */
const PRINCIPLE_ICONS = [
  <OfflineIcon key="offline" />,
  <InteroperabilityIcon key="interoperability" />,
  <SecurityIcon key="security" />,
  <PartnershipIcon key="partnership" />,
];

/**
 * The approved principles as a pinned scroll story, shared by the homepage
 * ("Why HealthAlyst") and the About page ("What guides our work"). A client
 * component so the icons reach the client story intact.
 */
export function PrinciplesStory({
  identifier,
  heading,
  introduction,
}: {
  /** Anchor for links to the section; also names its heading. */
  identifier: string;
  heading: string;
  introduction: string;
}) {
  const headingIdentifier = `${identifier}-heading`;

  return (
    <MarketingSection
      id={identifier}
      aria-labelledby={headingIdentifier}
      className="bg-card pb-12 pt-12 md:pb-20 md:pt-16 lg:pb-10 lg:pt-10"
    >
      <MarketingContainer>
        <MarketingScrollStory
          headingIdentifier={headingIdentifier}
          heading={heading}
          introduction={<p>{introduction}</p>}
          chapters={PRINCIPLES.map((principle, principleIndex) => ({
            title: principle.title,
            description: principle.description,
            icon: PRINCIPLE_ICONS[principleIndex],
            photograph: (
              <Image
                src={principle.photograph.source}
                alt=""
                fill
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 40px)"
                className="object-cover"
                style={{ objectPosition: principle.photograph.focus }}
              />
            ),
          }))}
        />
      </MarketingContainer>
    </MarketingSection>
  );
}
