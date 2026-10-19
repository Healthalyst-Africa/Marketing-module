"use client";

import Link from "next/link";
import { MarketingFooter } from "@healthalyst/ui/components/marketing-footer";
import { LogoMark } from "~/components/layout/logo";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_CONNECT_LINKS,
  SITE_ROUTES,
} from "~/data/site";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";
import type { SiteLink } from "~/types";

function renderSiteLink(siteLink: SiteLink) {
  if (!siteLink.destination) {
    return (
      <span
        key={siteLink.label}
        className="inline-flex min-h-11 items-center text-sm text-muted-foreground"
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

export default function Footer() {
  const { selectProduct } = useProducts();
  const currentYear = new Date().getFullYear();
  return (
    <MarketingFooter
      brand={<LogoMark />}
      description="Building the digital infrastructure of African healthcare, one institution at a time."
      location="Pan-African / Health technology"
      copyright={`© ${currentYear} Healthalyst Africa. All rights reserved.`}
      closingText="Building the digital infrastructure of African healthcare"
      groups={[
        {
          heading: "Products",
          links: PRODUCTS.map((product, index) => (
            <Link
              key={product.name}
              href={`${SITE_ROUTES.home}#products`}
              onClick={() => selectProduct(index)}
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
