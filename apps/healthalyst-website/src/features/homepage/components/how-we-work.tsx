import Link from "next/link";
import {
  ConfigurationIcon,
  DiscoveryIcon,
  IntegrationIcon,
  TrainingIcon,
} from "@healthalyst/icons";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingNumberedSteps } from "@healthalyst/ui/components/marketing-numbered-steps";
import { APPROACH_STAGES } from "~/features/homepage/config/approach-stages";
import { HOMEPAGE_APPROACH_CONTENT } from "~/features/homepage/config/homepage-content";
import { SITE_ROUTES } from "~/config/routes";

/** One icon per stage, in stage order. */
const STAGE_ICONS = [
  <DiscoveryIcon key="discovery" />,
  <ConfigurationIcon key="configuration" />,
  <IntegrationIcon key="integration" />,
  <TrainingIcon key="training" />,
];

export default function HowWeWork() {
  return (
    <MarketingContentSection
      identifier={HOMEPAGE_APPROACH_CONTENT.identifier}
      alignment="center"
      heading={HOMEPAGE_APPROACH_CONTENT.heading}
      introduction={<p>{HOMEPAGE_APPROACH_CONTENT.introduction}</p>}
    >
      <MarketingNumberedSteps
        steps={APPROACH_STAGES.map((stage, stageIndex) => ({
          title: stage.title,
          description: stage.description,
          icon: STAGE_ICONS[stageIndex],
        }))}
      />
      <div className="mt-12 flex justify-center">
        <ActionLink size="extraLarge" shape="pill">
          <Link href={SITE_ROUTES.contact}>
            {HOMEPAGE_APPROACH_CONTENT.action}
          </Link>
        </ActionLink>
      </div>
    </MarketingContentSection>
  );
}
