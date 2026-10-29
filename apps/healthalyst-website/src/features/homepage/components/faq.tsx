import Link from "next/link";
import { MarketingFAQ } from "@healthalyst/ui/components/marketing-faq";
import { MarketingQuestionAssistant } from "@healthalyst/ui/components/marketing-question-assistant";
import {
  FAQ_ASSISTANT_CONTENT,
  FAQ_ASSISTANT_LIMITS,
} from "~/features/homepage/config/faq-assistant-content";
import { HOMEPAGE_FAQ_CONTENT } from "~/features/homepage/config/homepage-content";
import { FAQS } from "~/features/homepage/config/faqs";
import { SITE_ROUTES } from "~/config/routes";

export default function FAQ() {
  return (
    <MarketingFAQ
      heading={HOMEPAGE_FAQ_CONTENT.heading}
      introduction={HOMEPAGE_FAQ_CONTENT.introduction}
      questions={FAQS}
      assistant={
        <MarketingQuestionAssistant
          endpoint={FAQ_ASSISTANT_CONTENT.endpoint}
          label={FAQ_ASSISTANT_CONTENT.label}
          placeholder={FAQ_ASSISTANT_CONTENT.placeholder}
          compactPlaceholder={FAQ_ASSISTANT_CONTENT.compactPlaceholder}
          submitLabel={FAQ_ASSISTANT_CONTENT.submitLabel}
          submittingLabel={FAQ_ASSISTANT_CONTENT.submittingLabel}
          notice={FAQ_ASSISTANT_CONTENT.notice}
          answerLabel={FAQ_ASSISTANT_CONTENT.answerLabel}
          failureMessage={FAQ_ASSISTANT_CONTENT.failureMessage}
          maximumLength={FAQ_ASSISTANT_LIMITS.maximumQuestionLength}
          contactPrompt={FAQ_ASSISTANT_CONTENT.contactPrompt}
          contactLink={
            <Link href={SITE_ROUTES.contact}>
              {FAQ_ASSISTANT_CONTENT.contactLabel}
            </Link>
          }
        />
      }
    />
  );
}
