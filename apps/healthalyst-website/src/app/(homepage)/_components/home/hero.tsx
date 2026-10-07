import Image from "next/image";
import Link from "next/link";
import { MarketingHero } from "@healthalyst/ui/components/marketing-hero";
import { HERO_CONTENT } from "~/data/homepage-content";
import ProductNavigation from "./product-navigation";

export default function Hero() {
  return (
    <MarketingHero
      {...HERO_CONTENT}
      primaryAction={<Link href="#products">Explore our products →</Link>}
      secondaryAction={<Link href="#contact">Speak to our team</Link>}
      image={
        <Image
          src="/images/doctor-at-clinic.webp"
          alt="A Black female doctor in a white coat and stethoscope at her clinic desk."
          fill
          preload
          sizes="(min-width: 1280px) 640px, (min-width: 1024px) 42vw, (min-width: 640px) 480px, calc(100vw - 40px)"
          className="object-cover object-center"
        />
      }
      productNavigation={<ProductNavigation />}
    />
  );
}
