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
import {
  ORGANIZATION_APP_ACTIONS,
  ORGANIZATION_APP_ROUTES,
} from "~/config/organization-app";
import { SITE_ROUTES } from "~/config/routes";
import { scrollToSamePageSection } from "~/features/site-navigation/utilities/scroll-to-same-page-section";
import { SOLUTION_GROUPS } from "~/shared/products/config/solution-groups";
import { useProducts } from "~/shared/products/store/products-provider";

export default function SiteHeader() {
  const currentPath = usePathname();
  const { selectProduct } = useProducts();

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
                    onClick={(clickEvent) => {
                      selectProduct(Math.max(productIndex, 0));
                      scrollToSamePageSection(
                        clickEvent,
                        `${SITE_ROUTES.home}#products`,
                        currentPath
                      );
                    }}
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
            onClick={(clickEvent) =>
              scrollToSamePageSection(
                clickEvent,
                navigationLink.destination,
                currentPath
              )
            }
          >
            {navigationLink.label}
          </Link>
        ),
      }))}
      primaryAction={
        <a href={ORGANIZATION_APP_ROUTES.signUp}>
          {ORGANIZATION_APP_ACTIONS.signUpLabel}
        </a>
      }
      secondaryAction={
        <a href={ORGANIZATION_APP_ROUTES.signIn}>
          {ORGANIZATION_APP_ACTIONS.signInLabel}
        </a>
      }
    />
  );
}
