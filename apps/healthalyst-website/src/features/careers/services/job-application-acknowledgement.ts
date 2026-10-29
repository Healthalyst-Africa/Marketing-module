import { Resend } from "resend";

import type { JobApplicationSubmission } from "~/features/careers/types/job-application";

/** Result of sending an applicant a receipt after their application is saved. */
export type JobApplicationAcknowledgementOutcome =
  { outcome: "sent" } | { outcome: "unavailable" };

/** Escapes applicant-controlled text before including it in the email markup. */
function escapeMarkup(value: string): string {
  const escapedCharacters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) => escapedCharacters[character] ?? character
  );
}

/**
 * Sends a minimal receipt to the applicant. It names the role but repeats
 * none of the links or the cover note.
 */
export async function sendJobApplicationAcknowledgement(
  submission: JobApplicationSubmission
): Promise<JobApplicationAcknowledgementOutcome> {
  const resendApiKey = process.env["RESEND_API_KEY"]?.trim();
  const senderAddress = process.env["RESEND_FROM_EMAIL"]?.trim();

  if (!resendApiKey || !senderAddress) {
    console.error("Job application acknowledgement email is not configured.");
    return { outcome: "unavailable" };
  }

  try {
    const resendClient = new Resend(resendApiKey);
    const emailResult = await resendClient.emails.send({
      from: senderAddress,
      to: submission.email,
      subject: `We received your application: ${submission.roleTitle}`,
      text: `Hello ${submission.firstName},\n\nThank you for applying for the ${submission.roleTitle} role at Healthalyst Africa. We have received your application and review every one. We will reply by email.\n\nHealthalyst Africa`,
      html: `<p>Hello ${escapeMarkup(submission.firstName)},</p><p>Thank you for applying for the ${escapeMarkup(submission.roleTitle)} role at Healthalyst Africa. We have received your application and review every one. We will reply by email.</p><p>Healthalyst Africa</p>`,
    });

    if (emailResult.error) {
      console.error("Job application acknowledgement email failed.");
      return { outcome: "unavailable" };
    }

    return { outcome: "sent" };
  } catch {
    console.error("Job application acknowledgement email failed.");
    return { outcome: "unavailable" };
  }
}
