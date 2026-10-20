import { MarketingFAQ } from "@healthalyst/ui/components/marketing-faq";
import { HOMEPAGE_FAQ_CONTENT } from "~/data/homepage-page-content";
import { FAQS } from "~/data/faqs";

export default function FAQ() {
  return (
    <MarketingFAQ
      heading={HOMEPAGE_FAQ_CONTENT.heading}
      introduction={HOMEPAGE_FAQ_CONTENT.introduction}
      questions={FAQS}
    />
  );
}
