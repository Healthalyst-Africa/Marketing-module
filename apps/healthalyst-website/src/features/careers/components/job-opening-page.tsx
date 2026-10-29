import Link from "next/link";
import { MarketingEnquiryForm } from "@healthalyst/ui/components/marketing-contact";
import { MarketingPageHeader } from "@healthalyst/ui/components/marketing-page-header";
import { MarketingRecordList } from "@healthalyst/ui/components/marketing-record-list";
import {
  MarketingTaskLayout,
  type MarketingTaskAside,
} from "@healthalyst/ui/components/marketing-task-layout";
import { CareNetworkIllustration } from "@healthalyst/ui/illustrations/care-network-illustration";
import {
  JOB_APPLICATION_FORM_CONTENT,
  JOB_OPENING_PAGE_CONTENT,
} from "~/features/careers/config/careers-content";
import { createJobApplicationFieldGroups } from "~/features/careers/config/job-application-fields";
import { JOB_OPENINGS } from "~/features/careers/config/job-openings";
import type { JobOpening } from "~/features/careers/types/job-opening";
import { createJobOpeningDestination } from "~/features/careers/utilities/job-opening-destination";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted-foreground marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * One role: the details beside the application form, with the form in the
 * card that overlaps the header, as on the contact page.
 */
export default function JobOpeningPage({
  jobOpening,
}: {
  jobOpening: JobOpening;
}) {
  const otherOpenings = JOB_OPENINGS.filter(
    (candidate) => candidate.slug !== jobOpening.slug
  );

  const asides: MarketingTaskAside[] = [
    {
      identifier: "about-the-role",
      heading: JOB_OPENING_PAGE_CONTENT.introductionHeading,
      content: (
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {jobOpening.introduction}
        </p>
      ),
    },
    {
      identifier: "responsibilities",
      heading: JOB_OPENING_PAGE_CONTENT.responsibilitiesHeading,
      content: <BulletList items={jobOpening.responsibilities} />,
    },
    {
      identifier: "requirements",
      heading: JOB_OPENING_PAGE_CONTENT.requirementsHeading,
      content: <BulletList items={jobOpening.requirements} />,
    },
    ...(jobOpening.niceToHave.length > 0
      ? [
          {
            identifier: "nice-to-have",
            heading: JOB_OPENING_PAGE_CONTENT.niceToHaveHeading,
            content: <BulletList items={jobOpening.niceToHave} />,
          },
        ]
      : []),
    ...(otherOpenings.length > 0
      ? [
          {
            identifier: "other-roles",
            heading: JOB_OPENING_PAGE_CONTENT.otherRolesHeading,
            content: (
              <MarketingRecordList
                records={otherOpenings.map((otherOpening) => ({
                  term: otherOpening.title,
                  description: [
                    otherOpening.team,
                    otherOpening.location,
                    otherOpening.employmentType,
                  ].join(" · "),
                  action: (
                    <Link href={createJobOpeningDestination(otherOpening.slug)}>
                      {JOB_OPENING_PAGE_CONTENT.viewRoleLabel}
                      <span className="sr-only">: {otherOpening.title}</span>
                    </Link>
                  ),
                }))}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <MarketingPageHeader
        tone="brand"
        shape="card"
        overlapBelow
        decoration={<CareNetworkIllustration showNetwork={false} />}
        heading={jobOpening.title}
        lede={<p>{jobOpening.summary}</p>}
        tagline={
          <p>
            {[
              jobOpening.team,
              jobOpening.location,
              jobOpening.employmentType,
            ].join(" · ")}
          </p>
        }
      />
      <MarketingTaskLayout
        task={
          <MarketingEnquiryForm
            identifier="application-form"
            heading={JOB_APPLICATION_FORM_CONTENT.heading}
            fieldGroups={createJobApplicationFieldGroups(jobOpening)}
            endpoint={`${JOB_APPLICATION_FORM_CONTENT.endpoint}?role=${encodeURIComponent(jobOpening.slug)}`}
            submitLabel={JOB_APPLICATION_FORM_CONTENT.submitLabel}
            submittingLabel={JOB_APPLICATION_FORM_CONTENT.submittingLabel}
            successHeading={JOB_APPLICATION_FORM_CONTENT.successHeading}
            successMessage={JOB_APPLICATION_FORM_CONTENT.successMessage}
            resetLabel={JOB_APPLICATION_FORM_CONTENT.resetLabel}
            failureMessage={JOB_APPLICATION_FORM_CONTENT.failureMessage}
          />
        }
        asides={asides}
      />
    </>
  );
}
