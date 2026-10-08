import { Resend } from "resend";

import type { ContactEnquirySubmission } from "~/types";

/** Result of sending a visitor an acknowledgement after their enquiry is saved. */
export type ContactEnquiryAcknowledgementOutcome =
  { outcome: "sent" } | { outcome: "unavailable" };

/**
 * Sends a minimal receipt to the submitted email address. The acknowledgement
 * does not include the enquiry message or any institution details.
 */
export async function sendContactEnquiryAcknowledgement(
  submission: ContactEnquirySubmission
): Promise<ContactEnquiryAcknowledgementOutcome> {
  const resendApiKey = process.env["RESEND_API_KEY"]?.trim();
  const senderAddress = process.env["RESEND_FROM_EMAIL"]?.trim();

  if (!resendApiKey || !senderAddress) {
    console.error("Contact enquiry acknowledgement email is not configured.");
    return { outcome: "unavailable" };
  }

  try {
    const resendClient = new Resend(resendApiKey);
    const emailResult = await resendClient.emails.send({
      from: senderAddress,
      to: submission.email,
      subject: "We received your enquiry",
      text: `Hello ${submission.firstName},\n\nThank you for contacting Healthalyst Africa. We have received your enquiry and aim to respond within two business days.\n\nHealthalyst Africa`,
      html: `<p>Hello ${escapeMarkup(submission.firstName)},</p><p>Thank you for contacting Healthalyst Africa. We have received your enquiry and aim to respond within two business days.</p><p>Healthalyst Africa</p>`,
    });

    if (emailResult.error) {
      console.error("Contact enquiry acknowledgement email failed.");
      return { outcome: "unavailable" };
    }

    return { outcome: "sent" };
  } catch {
    console.error("Contact enquiry acknowledgement email failed.");
    return { outcome: "unavailable" };
  }
}

/** Escapes visitor-controlled text before including it in the email markup. */
function escapeMarkup(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const escapedCharacters: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return escapedCharacters[character] ?? character;
  });
}
