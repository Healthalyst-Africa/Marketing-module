import { MarketingFAQ } from "@healthalyst/ui/components/marketing-faq";
import { FAQ_CONTENT } from "~/data/homepage-content";
import { FAQS } from "~/data/faqs";

export default function FAQ() {
  return <MarketingFAQ content={FAQ_CONTENT} questions={FAQS} />;
}
