import Link from "next/link";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingPageHeader } from "@healthalyst/ui/components/marketing-page-header";
import { MarketingJobList } from "@healthalyst/ui/components/marketing-job-list";
import { CareNetworkIllustration } from "@healthalyst/ui/illustrations/care-network-illustration";
import { SITE_ROUTES } from "~/config/routes";
import { CAREERS_PAGE_CONTENT } from "~/features/careers/config/careers-content";
import { JOB_OPENINGS } from "~/features/careers/config/job-openings";
import { createJobOpeningDestination } from "~/features/careers/utilities/job-opening-destination";
import { groupJobOpeningsByTeam } from "~/features/careers/utilities/group-job-openings";

/** The careers page: an introduction, the open roles and a speculative note. */
export default function CareersPage() {
  return (
    <>
      <MarketingPageHeader
        tone="brand"
        shape="card"
        decoration={<CareNetworkIllustration showNetwork={false} />}
        heading={CAREERS_PAGE_CONTENT.heading}
        lede={<p>{CAREERS_PAGE_CONTENT.lede}</p>}
      />
      <MarketingContentSection
        identifier={CAREERS_PAGE_CONTENT.openRolesIdentifier}
        heading={CAREERS_PAGE_CONTENT.openRolesHeading}
      >
        {JOB_OPENINGS.length > 0 ? (
          <MarketingJobList
            countLabel={CAREERS_PAGE_CONTENT.describeOpenRoleCount(
              JOB_OPENINGS.length
            )}
            groups={groupJobOpeningsByTeam(JOB_OPENINGS).map((group) => ({
              heading: group.team,
              jobs: group.jobOpenings.map((jobOpening) => ({
                title: jobOpening.title,
                location: jobOpening.location,
                employmentType: jobOpening.employmentType,
                link: (
                  <Link href={createJobOpeningDestination(jobOpening.slug)} />
                ),
              })),
            }))}
          />
        ) : (
          <p className="text-base text-muted-foreground">
            {CAREERS_PAGE_CONTENT.noRolesMessage}
          </p>
        )}
      </MarketingContentSection>
      <MarketingContentSection
        identifier="speculative-applications"
        tone="subtle"
        heading={CAREERS_PAGE_CONTENT.speculativeHeading}
        introduction={<p>{CAREERS_PAGE_CONTENT.speculativeDescription}</p>}
        actions={
          <ActionLink variant="outline" size="extraLarge" shape="pill">
            <Link href={SITE_ROUTES.contact}>
              {CAREERS_PAGE_CONTENT.speculativeAction}
            </Link>
          </ActionLink>
        }
      />
    </>
  );
}
