import type { Metadata } from "next";
import { ClosingCall } from "~/components/closing-call";
import { PrinciplesStory } from "~/components/principles-story";
import { HOMEPAGE_BENEFITS_CONTENT } from "~/data/homepage-page-content";
import Hero from "./_components/home/hero";
import BuiltFor from "./_components/home/built-for";
import ProductSuite from "./_components/home/product-suite";
import Ecosystem from "./_components/home/ecosystem";
import AfricanConditions from "./_components/home/african-conditions";
import Testimonials from "./_components/home/testimonials";
import FAQ from "./_components/home/faq";

export const metadata: Metadata = {
  description:
    "Healthalyst Africa builds purpose-built digital products for healthcare institutions across the African continent: hospital scheduling, laboratory diagnostics, pharmacy management, dental practice software, diagnostic imaging and medical equipment supply.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Healthalyst Africa",
    description: "Building the digital infrastructure of African healthcare.",
    url: "/",
  },
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <BuiltFor />
      <PrinciplesStory {...HOMEPAGE_BENEFITS_CONTENT} />
      <ProductSuite />
      <Ecosystem />
      {/* "How we work with you" is hidden for now at the user's request; the
          component stays in `_components/home/how-we-work.tsx`. */}
      <AfricanConditions />
      <Testimonials />
      <FAQ />
      {/* Keeps the `#contact` anchor for existing links. */}
      <ClosingCall identifier="contact" />
    </>
  );
};

export default HomePage;
