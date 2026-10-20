"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketingNavigation } from "@healthalyst/ui/components/marketing-navigation";
import { LogoLink } from "~/components/layout/logo";
import { PRODUCT_ICONS_BY_NAME } from "~/components/product-icons";
import { PRODUCTS } from "~/data/products";
import {
  BRAND_HEADER_ROUTES,
  INSTITUTIONS,
  NAVIGATION_LINKS,
  SITE_ROUTES,
  SOLUTIONS_MENU_CONTENT,
} from "~/data/site";
import { useProducts } from "~/store/ProductsContext";

export default function Header() {
  const currentPath = usePathname();
  const { selectProduct } = useProducts();
  const isContactPage = currentPath === SITE_ROUTES.contact;

  return (
    <MarketingNavigation
      brand={<LogoLink />}
      tone={BRAND_HEADER_ROUTES.includes(currentPath) ? "brand" : "default"}
      menu={{
        label: SOLUTIONS_MENU_CONTENT.label,
        items: INSTITUTIONS.map((institution) => {
          const productIndex = PRODUCTS.findIndex(
            (product) => product.name === institution.product
          );

          return {
            title: institution.name,
            description: `${institution.product} for ${institution.description}`,
            icon: PRODUCT_ICONS_BY_NAME[institution.product],
            link: (
              <Link
                href={`${SITE_ROUTES.home}#products`}
                onClick={() => selectProduct(Math.max(productIndex, 0))}
              />
            ),
          };
        }),
        footer: {
          prompt: SOLUTIONS_MENU_CONTENT.footerPrompt,
          link: (
            <Link href={SITE_ROUTES.contact}>
              {SOLUTIONS_MENU_CONTENT.footerAction}
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
