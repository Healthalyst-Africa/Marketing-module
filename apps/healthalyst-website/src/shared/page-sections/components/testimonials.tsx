import Image from "next/image";
import { MarketingTestimonials } from "@healthalyst/ui/components/marketing-testimonials";
import {
  TESTIMONIALS,
  TESTIMONIALS_CONTENT,
} from "~/shared/page-sections/config/testimonials-content";

/** Samples are shown in development only, so the design can be reviewed. */
const SHOW_SAMPLE_TESTIMONIALS = process.env.NODE_ENV === "development";

export default function Testimonials() {
  const testimonials = TESTIMONIALS.filter(
    (testimonial) => testimonial.isApproved || SHOW_SAMPLE_TESTIMONIALS
  ).map((testimonial) => ({
    quote: testimonial.quote,
    name: testimonial.name,
    role: testimonial.role,
    institution: testimonial.institution,
    // Decorative: the name beside it identifies the person.
    portrait: (
      <Image
        src={testimonial.portrait}
        alt=""
        fill
        sizes="80px"
        className="object-cover"
      />
    ),
  }));

  // Nothing is published until an approved testimonial exists.
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <MarketingTestimonials
      label={TESTIMONIALS_CONTENT.label}
      previousLabel={TESTIMONIALS_CONTENT.previousLabel}
      nextLabel={TESTIMONIALS_CONTENT.nextLabel}
      testimonials={testimonials}
    />
  );
}
