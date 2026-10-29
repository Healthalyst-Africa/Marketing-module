import AfricanConditions from "~/features/homepage/components/african-conditions";
import BuiltFor from "~/features/homepage/components/built-for";
import Ecosystem from "~/features/homepage/components/ecosystem";
import FAQ from "~/features/homepage/components/faq";
import Hero from "~/features/homepage/components/hero";
import ProductSuite from "~/features/homepage/components/product-suite";
import Testimonials from "~/shared/page-sections/components/testimonials";
import { HOMEPAGE_BENEFITS_CONTENT } from "~/features/homepage/config/homepage-content";
import { ClosingCall } from "~/shared/page-sections/components/closing-call";
import { PrinciplesStory } from "~/shared/page-sections/components/principles-story";

export default function Homepage() {
  return (
    <>
      <Hero />
      <BuiltFor />
      <PrinciplesStory {...HOMEPAGE_BENEFITS_CONTENT} />
      <ProductSuite />
      <Ecosystem />
      {/* "How we work with you" is hidden for now at the user's request; the
          component stays in `features/homepage/components/how-we-work.tsx`. */}
      <AfricanConditions />
      <Testimonials />
      <FAQ />
      {/* Keeps the `#contact` anchor for existing links. */}
      <ClosingCall identifier="contact" />
    </>
  );
}
