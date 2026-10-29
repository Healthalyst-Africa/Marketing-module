"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MarketingIllustratedLinkRow } from "@healthalyst/ui/components/marketing-illustrated-link-row";
import { HOMEPAGE_BUILT_FOR_LABEL } from "~/features/homepage/config/homepage-content";
import { INSTITUTIONS } from "~/shared/products/config/institutions";
import { PRODUCT_ILLUSTRATIONS_BY_NAME } from "~/shared/products/config/product-illustrations";
import { PRODUCTS } from "~/shared/products/config/products";
import { useProducts } from "~/shared/products/store/products-provider";
import { scrollToSamePageSection } from "~/shared/navigation/utilities/scroll-to-same-page-section";
import { SITE_ROUTES } from "~/config/routes";

/** The six institution types, each opening its product in the product suite. */
export default function BuiltFor() {
  const { selectProduct } = useProducts();
  const currentPath = usePathname();

  return (
    <MarketingIllustratedLinkRow
      label={HOMEPAGE_BUILT_FOR_LABEL}
      links={INSTITUTIONS.map((institution) => ({
        label: institution.name,
        illustration: PRODUCT_ILLUSTRATIONS_BY_NAME[institution.product],
        link: (
          <Link
            href="#products"
            onClick={(clickEvent) => {
              selectProduct(
                Math.max(
                  PRODUCTS.findIndex(
                    (product) => product.name === institution.product
                  ),
                  0
                )
              );
              scrollToSamePageSection(
                clickEvent,
                `${SITE_ROUTES.home}#products`,
                currentPath
              );
            }}
          />
        ),
      }))}
    />
  );
}
