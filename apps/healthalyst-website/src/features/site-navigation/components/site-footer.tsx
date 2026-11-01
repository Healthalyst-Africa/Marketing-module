"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketingFooter } from "@healthalyst/ui/components/marketing-footer";
import { ContourPatternIllustration } from "@healthalyst/ui/illustrations/contour-pattern-illustration";
import { LogoMark } from "~/components/ui/healthalyst-brand";
import { COMPANY_OFFICE_ADDRESS } from "~/config/company-office";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_CONNECT_LINKS,
} from "~/features/site-navigation/config/site-navigation";
import { SITE_ROUTES } from "~/config/routes";
import { PRODUCTS } from "~/shared/products/config/products";
import { useProducts } from "~/shared/products/store/products-provider";
import { scrollToSamePageSection } from "~/shared/navigation/utilities/scroll-to-same-page-section";
import type { SiteLink } from "~/features/site-navigation/types/site-navigation";

function renderSiteLink(siteLink: SiteLink) {
  // An entry without a published page is shown disabled: greyed out, not a
  // link, with a not-allowed cursor, and announced as unavailable.
  if (!siteLink.destination) {
    return (
      <span
        key={siteLink.label}
        role="link"
        aria-disabled="true"
        className="inline-flex min-h-11 cursor-not-allowed items-center text-sm text-muted-foreground/50"
      >
        {siteLink.label}
      </span>
    );
  }

  return (
    <Link key={siteLink.label} href={siteLink.destination}>
      {siteLink.label}
    </Link>
  );
}

export default function SiteFooter() {
  const { selectProduct } = useProducts();
  const currentPath = usePathname();
  const currentYear = new Date().getFullYear();
  return (
    <MarketingFooter
      brand={<LogoMark />}
      description="Building the digital infrastructure of African healthcare, one institution at a time."
      address={COMPANY_OFFICE_ADDRESS}
      location="Pan-African / Health technology"
      copyright={`© ${currentYear} Healthalyst Africa. All rights reserved.`}
      closingText="Building the digital infrastructure of African healthcare"
      // The same contour field as the operating conditions band.
      decoration={<ContourPatternIllustration className="text-accent" />}
      groups={[
        {
          heading: "Products",
          links: PRODUCTS.map((product, index) => (
            <Link
              key={product.name}
              href={`${SITE_ROUTES.home}#products`}
              onClick={(clickEvent) => {
                selectProduct(index);
                scrollToSamePageSection(
                  clickEvent,
                  `${SITE_ROUTES.home}#products`,
                  currentPath
                );
              }}
            >
              {product.name}
            </Link>
          )),
        },
        {
          heading: "Company",
          links: FOOTER_COMPANY_LINKS.map(renderSiteLink),
        },
        {
          heading: "Connect",
          links: FOOTER_CONNECT_LINKS.map(renderSiteLink),
        },
      ]}
    />
  );
}
