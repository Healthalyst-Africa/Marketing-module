import Link from "next/link";
import { MarketingNavigation } from "@healthalyst/ui/components/marketing-navigation";
import { LogoLink } from "~/components/layout/logo";
import { NAVIGATION_LINKS } from "~/data/site";

export default function Header() {
  return (
    <MarketingNavigation
      brand={<LogoLink />}
      navigationLinks={NAVIGATION_LINKS.map((link) => ({
        label: link.label,
        destination: `#${link.identifier}`,
      }))}
      contactAction={<Link href="#contact">Contact</Link>}
      partnershipAction={<Link href="#contact">Partner with us</Link>}
    />
  );
}
