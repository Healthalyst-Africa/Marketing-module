import Image from "next/image";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingTeam } from "@healthalyst/ui/components/marketing-team";
import {
  LEADERS,
  LEADERSHIP_CONTENT,
} from "~/features/about/config/leadership";

/** Samples are shown in development only, so the design can be reviewed. */
const SHOW_SAMPLE_LEADERS = process.env.NODE_ENV === "development";

/** The leadership team on the About page; absent until a leader is approved. */
export default function Leadership() {
  const leaders = LEADERS.filter(
    (leader) => leader.isApproved || SHOW_SAMPLE_LEADERS
  );

  if (leaders.length === 0) {
    return null;
  }

  return (
    <MarketingContentSection
      identifier={LEADERSHIP_CONTENT.identifier}
      tone="subtle"
      alignment="center"
      heading={LEADERSHIP_CONTENT.heading}
      introduction={<p>{LEADERSHIP_CONTENT.introduction}</p>}
    >
      <MarketingTeam
        listLabel={LEADERSHIP_CONTENT.listLabel}
        profileLinkLabel={LEADERSHIP_CONTENT.profileLinkLabel}
        members={leaders.map((leader) => ({
          name: leader.name,
          role: leader.role,
          background: leader.background,
          // Decorative: the name beside it identifies the person.
          portrait: leader.portrait ? (
            <Image
              src={leader.portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 45vw"
              className="object-cover"
            />
          ) : undefined,
          profileLink: leader.linkedInAddress ? (
            <a
              href={leader.linkedInAddress}
              target="_blank"
              rel="noopener noreferrer"
            />
          ) : undefined,
        }))}
      />
    </MarketingContentSection>
  );
}
