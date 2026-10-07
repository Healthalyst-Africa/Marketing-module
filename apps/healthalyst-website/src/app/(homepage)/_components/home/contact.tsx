import {
  MarketingContact,
  MarketingEnquiryForm,
} from "@healthalyst/ui/components/marketing-contact";
import { CONTACT_ENQUIRY_FIELDS } from "~/data/contact-enquiry-fields";
import { CONTACT_CONTENT } from "~/data/homepage-content";
import { INSTITUTIONS } from "~/data/site";

/** Enquiry endpoint that validates and stores a contact submission. */
const CONTACT_ENQUIRY_ENDPOINT = "/api/contact";

export default function Contact() {
  return (
    <MarketingContact
      content={CONTACT_CONTENT}
      institutions={INSTITUTIONS}
      form={
        <MarketingEnquiryForm
          heading="send us a message"
          endpoint={CONTACT_ENQUIRY_ENDPOINT}
          submitLabel="Send Message →"
          submittingLabel="Sending your message…"
          helperText="We respond to all enquiries within two business days."
          successMessage="Thank you. Your enquiry has been received."
          failureMessage="Your enquiry could not be sent. Check your connection and try again."
          fields={CONTACT_ENQUIRY_FIELDS}
        />
      }
    />
  );
}
