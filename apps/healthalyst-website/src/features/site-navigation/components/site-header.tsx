"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketingNavigation } from "@healthalyst/ui/components/marketing-navigation";
import { LogoLink } from "~/components/ui/healthalyst-brand";
import { PRODUCT_ILLUSTRATIONS_BY_NAME } from "~/shared/products/config/product-illustrations";
import { PRODUCTS } from "~/shared/products/config/products";
import {
  BRAND_HEADER_ROUTES,
  NAVIGATION_LINKS,
  SOLUTIONS_MENU_CONTENT,
} from "~/features/site-navigation/config/site-navigation";
import { INSTITUTIONS } from "~/shared/products/config/institutions";
import { SITE_ROUTES } from "~/config/routes";
import { SOLUTION_GROUPS } from "~/shared/products/config/solution-groups";
import { useProducts } from "~/shared/products/store/products-provider";

export default function SiteHeader() {
  const currentPath = usePathname();
  const { selectProduct } = useProducts();
  const isContactPage = currentPath === SITE_ROUTES.contact;

  return (
    <MarketingNavigation
      brand={<LogoLink />}
      tone={BRAND_HEADER_ROUTES.includes(currentPath) ? "brand" : "default"}
      menu={{
        label: SOLUTIONS_MENU_CONTENT.label,
        heading: SOLUTIONS_MENU_CONTENT.heading,
        groups: SOLUTION_GROUPS.map((group) => ({
          label: group.label,
          items: group.productNames.flatMap((productName) => {
            const institution = INSTITUTIONS.find(
              (candidate) => candidate.product === productName
            );
            const productIndex = PRODUCTS.findIndex(
              (product) => product.name === productName
            );

            if (!institution) {
              return [];
            }

            return [
              {
                title: institution.name,
                description: `${institution.product} for ${institution.description}`,
                illustration:
                  PRODUCT_ILLUSTRATIONS_BY_NAME[institution.product],
                link: (
                  <Link
                    href={`${SITE_ROUTES.home}#products`}
                    onClick={() => selectProduct(Math.max(productIndex, 0))}
                  />
                ),
              },
            ];
          }),
        })),
        feature: {
          photograph: (
            <Image
              src={SOLUTIONS_MENU_CONTENT.featurePhotograph}
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          ),
          description: SOLUTIONS_MENU_CONTENT.featureDescription,
          link: (
            <Link href={SITE_ROUTES.contact}>
              {SOLUTIONS_MENU_CONTENT.featureAction}
            </Link>
          ),
        },
      }}
      navigationLinks={NAVIGATION_LINKS.map((navigationLink) => ({
        label: navigationLink.label,
        link: (
          <Link
            href={navigationLink.destination}
            aria-current={
              currentPath === navigationLink.destination ? "page" : undefined
            }
          >
            {navigationLink.label}
          </Link>
        ),
      }))}
      contactAction={
        <Link
          href={SITE_ROUTES.contact}
          aria-current={isContactPage ? "page" : undefined}
        >
          Contact us
        </Link>
      }
    />
  );
}
