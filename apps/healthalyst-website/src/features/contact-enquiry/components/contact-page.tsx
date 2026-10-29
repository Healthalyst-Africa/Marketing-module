import Link from "next/link";
import { EmailIcon, PhoneIcon } from "@healthalyst/icons";
import type { ReactNode } from "react";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { CareNetworkIllustration } from "@healthalyst/ui/illustrations/care-network-illustration";
import { InvestmentIllustration } from "@healthalyst/ui/illustrations/investment-illustration";
import { PartnershipIllustration } from "@healthalyst/ui/illustrations/partnership-illustration";
import { MarketingEnquiryForm } from "@healthalyst/ui/components/marketing-contact";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingLocationMap } from "@healthalyst/ui/components/marketing-location-map";
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
import { CONTACT_ENQUIRY_FIELD_GROUPS } from "~/features/contact-enquiry/config/contact-enquiry-fields";
import {
  CONTACT_DETAILS,
  CONTACT_FORM_CONTENT,
  CONTACT_NEXT_STEPS,
  CONTACT_OFFICE_MAP,
  CONTACT_OTHER_ROUTES,
  CONTACT_PAGE_CONTENT,
} from "~/features/contact-enquiry/config/contact-page-content";
import { ENQUIRY_FORM_IDENTIFIER } from "~/shared/contact/config/contact-destinations";
import type { ContactEnquiryPreset } from "~/features/contact-enquiry/utilities/contact-enquiry-preset";

/** Enquiry endpoint that validates and stores a contact submission. */
const CONTACT_ENQUIRY_ENDPOINT = "/api/contact";

/** One illustration per partnership and investment route. */
const OTHER_ROUTE_ILLUSTRATIONS: Record<
  (typeof CONTACT_OTHER_ROUTES)[number]["topic"],
  ReactNode
> = {
  partnership: <PartnershipIllustration />,
  investment: <InvestmentIllustration />,
};

/** Rows for whichever direct contact details the company has supplied. */
function createContactDetailRecords(): MarketingRecord[] {
  const records: MarketingRecord[] = [];

  if (CONTACT_DETAILS.email) {
    records.push({
      term: "Email",
      icon: <EmailIcon />,
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
      icon: <PhoneIcon />,
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

export default function ContactPage({
  enquiryPreset,
}: {
  /** Form values implied by the address, such as a chosen product. */
  enquiryPreset: ContactEnquiryPreset;
}) {
  const contactDetailRecords = createContactDetailRecords();

  const asides: MarketingTaskAside[] = [
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
        decoration={<CareNetworkIllustration showNetwork={false} />}
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
      <MarketingContentSection
        identifier={CONTACT_PAGE_CONTENT.otherRoutesIdentifier}
        tone="subtle"
        heading={CONTACT_PAGE_CONTENT.otherRoutesHeading}
        introduction={<p>{CONTACT_PAGE_CONTENT.otherRoutesIntroduction}</p>}
      >
        <MarketingRecordList
          className="grid gap-8 sm:grid-cols-2 lg:gap-12"
          records={CONTACT_OTHER_ROUTES.map((route) => ({
            term: route.term,
            description: route.description,
            illustration: OTHER_ROUTE_ILLUSTRATIONS[route.topic],
            action: <Link href={route.destination}>{route.actionLabel}</Link>,
          }))}
        />
      </MarketingContentSection>
      <MarketingContentSection
        identifier={CONTACT_OFFICE_MAP.identifier}
        heading={CONTACT_OFFICE_MAP.heading}
        introduction={<p>{CONTACT_OFFICE_MAP.introduction}</p>}
      >
        <MarketingLocationMap
          embedSource={CONTACT_OFFICE_MAP.embedSource}
          mapTitle={CONTACT_OFFICE_MAP.mapTitle}
          name={CONTACT_OFFICE_MAP.organisationName}
          addressLines={CONTACT_OFFICE_MAP.addressLines}
          action={
            <ActionLink
              variant="inverse"
              size="extraLarge"
              shape="pill"
              className="w-full sm:w-auto"
            >
              <a
                href={CONTACT_OFFICE_MAP.directionsDestination}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_OFFICE_MAP.directionsLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </ActionLink>
          }
        />
      </MarketingContentSection>
    </>
  );
}
