import type { Metadata } from "next";
import Link from "next/link";
import { MarketingEnquiryForm } from "@healthalyst/ui/components/marketing-contact";
import { MarketingPageHeader } from "@healthalyst/ui/components/marketing-page-header";
import {
  MarketingRecordList,
  type MarketingRecord,
} from "@healthalyst/ui/components/marketing-record-list";
import { MarketingSequence } from "@healthalyst/ui/components/marketing-sequence";
import {
  MarketingTaskLayout,
  type MarketingTaskAside,
} from "@healthalyst/ui/components/marketing-task-layout";
import { CONTACT_ENQUIRY_FIELD_GROUPS } from "~/data/contact-enquiry-fields";
import {
  CONTACT_DETAILS,
  CONTACT_FORM_CONTENT,
  CONTACT_NEXT_STEPS,
  CONTACT_OTHER_ROUTES,
  CONTACT_PAGE_CONTENT,
} from "~/data/contact-page-content";
import { ENQUIRY_FORM_IDENTIFIER, SITE_ROUTES } from "~/data/site";
import { readContactEnquiryPreset } from "~/lib/contact-destination";

/** Enquiry endpoint that validates and stores a contact submission. */
const CONTACT_ENQUIRY_ENDPOINT = "/api/contact";

export const metadata: Metadata = {
  title: CONTACT_PAGE_CONTENT.title,
  description: CONTACT_PAGE_CONTENT.metadataDescription,
  alternates: { canonical: SITE_ROUTES.contact },
  openGraph: {
    title: `${CONTACT_PAGE_CONTENT.title} | Healthalyst Africa`,
    description: CONTACT_PAGE_CONTENT.metadataDescription,
    url: SITE_ROUTES.contact,
  },
};

/** Rows for whichever direct contact details the company has supplied. */
function createContactDetailRecords(): MarketingRecord[] {
  const records: MarketingRecord[] = [];

  if (CONTACT_DETAILS.email) {
    records.push({
      term: "Email",
      description: (
        <a
          href={`mailto:${CONTACT_DETAILS.email}`}
          className="font-medium text-primary underline underline-offset-4"
        >
          {CONTACT_DETAILS.email}
        </a>
      ),
    });
  }

  if (CONTACT_DETAILS.phoneNumber) {
    records.push({
      term: "Phone",
      description: (
        <a
          href={`tel:${CONTACT_DETAILS.phoneNumber.replace(/\s+/g, "")}`}
          className="font-medium text-primary underline underline-offset-4"
        >
          {CONTACT_DETAILS.phoneNumber}
        </a>
      ),
    });
  }

  if (CONTACT_DETAILS.officeAddress) {
    records.push({
      term: "Office",
      description: (
        <address className="not-italic">
          {CONTACT_DETAILS.officeAddress}
        </address>
      ),
    });
  }

  return records;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const enquiryPreset = readContactEnquiryPreset(await searchParams);
  const contactDetailRecords = createContactDetailRecords();

  const asides: MarketingTaskAside[] = [
    {
      identifier: "other-routes",
      heading: CONTACT_PAGE_CONTENT.otherRoutesHeading,
      content: (
        <MarketingRecordList
          records={CONTACT_OTHER_ROUTES.map((route) => ({
            term: route.term,
            description: route.description,
            action: <Link href={route.destination}>{route.actionLabel}</Link>,
          }))}
        />
      ),
    },
    ...(contactDetailRecords.length > 0
      ? [
          {
            identifier: "contact-details",
            heading: CONTACT_PAGE_CONTENT.contactDetailsHeading,
            content: <MarketingRecordList records={contactDetailRecords} />,
          },
        ]
      : []),
    {
      identifier: "next-steps",
      heading: CONTACT_PAGE_CONTENT.nextStepsHeading,
      content: <MarketingSequence steps={CONTACT_NEXT_STEPS} />,
    },
  ];

  return (
    <>
      <MarketingPageHeader
        tone="brand"
        shape="card"
        overlapBelow
        heading={CONTACT_PAGE_CONTENT.heading}
        lede={<p>{CONTACT_PAGE_CONTENT.lede}</p>}
      />
      <MarketingTaskLayout
        task={
          <MarketingEnquiryForm
            // A new preset (for example from a partnership link) starts a fresh form.
            key={JSON.stringify(enquiryPreset)}
            identifier={ENQUIRY_FORM_IDENTIFIER}
            heading={CONTACT_FORM_CONTENT.heading}
            fieldGroups={CONTACT_ENQUIRY_FIELD_GROUPS}
            defaultValues={enquiryPreset}
            endpoint={CONTACT_ENQUIRY_ENDPOINT}
            submitLabel={CONTACT_FORM_CONTENT.submitLabel}
            submittingLabel={CONTACT_FORM_CONTENT.submittingLabel}
            helperText={CONTACT_FORM_CONTENT.helperText}
            successHeading={CONTACT_FORM_CONTENT.successHeading}
            successMessage={CONTACT_FORM_CONTENT.successMessage}
            resetLabel={CONTACT_FORM_CONTENT.resetLabel}
            failureMessage={CONTACT_FORM_CONTENT.failureMessage}
          />
        }
        asides={asides}
      />
    </>
  );
}
