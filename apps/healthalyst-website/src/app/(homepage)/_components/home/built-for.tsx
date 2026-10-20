"use client";

import Link from "next/link";
import { MarketingChipRow } from "@healthalyst/ui/components/marketing-chip-row";
import { PRODUCT_ICONS_BY_NAME } from "~/components/product-icons";
import { HOMEPAGE_BUILT_FOR_LABEL } from "~/data/homepage-page-content";
import { PRODUCTS } from "~/data/products";
import { INSTITUTIONS } from "~/data/site";
import { useProducts } from "~/store/ProductsContext";

/** The six institution types, each opening its product in the product suite. */
export default function BuiltFor() {
  const { selectProduct } = useProducts();

  return (
    <MarketingChipRow
      label={HOMEPAGE_BUILT_FOR_LABEL}
      chips={INSTITUTIONS.map((institution) => ({
        label: institution.name,
        icon: PRODUCT_ICONS_BY_NAME[institution.product],
        link: (
          <Link
            href="#products"
            onClick={() =>
              selectProduct(
                Math.max(
                  PRODUCTS.findIndex(
                    (product) => product.name === institution.product
                  ),
                  0
                )
              )
            }
          />
        ),
      }))}
    />
  );
}
