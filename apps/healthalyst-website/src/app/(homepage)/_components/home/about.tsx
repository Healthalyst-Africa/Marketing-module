import Image from "next/image";
import Link from "next/link";
import { MarketingAbout } from "@healthalyst/ui/components/marketing-about";
import { ABOUT_CONTENT } from "~/data/homepage-content";
import { PILLARS } from "~/data/site";

export default function About() {
  return (
    <MarketingAbout
      content={ABOUT_CONTENT}
      quotation="“Africa’s healthcare system doesn’t need software written elsewhere and adapted. It needs technology built here, for here.”"
      partnershipAction={<Link href="#contact">Partner with us →</Link>}
      pillars={PILLARS}
      approachLabel="Our approach"
      illustration={
        <Image
          src="/images/clinical-team.webp"
          alt="Two African doctors reviewing a patient chart in a hospital."
          fill
          sizes="(min-width: 1024px) 510px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)"
          className="object-cover"
        />
      }
    />
  );
}
