import { MarketingFAQ } from "@healthalyst/ui/components/marketing-faq";
import { HOMEPAGE_FAQ_CONTENT } from "~/features/homepage/config/homepage-content";
import { FAQS } from "~/features/homepage/config/faqs";

export default function FAQ() {
  return (
    <MarketingFAQ
      heading={HOMEPAGE_FAQ_CONTENT.heading}
      introduction={HOMEPAGE_FAQ_CONTENT.introduction}
      questions={FAQS}
    />
  );
}
