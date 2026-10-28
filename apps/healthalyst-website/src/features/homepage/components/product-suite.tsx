"use client";

import Link from "next/link";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingProductSuite } from "@healthalyst/ui/components/marketing-product-suite";
import { PRODUCT_ICONS_BY_NAME } from "~/shared/products/config/product-icons";
import {
  HOMEPAGE_PRODUCT_GROUPS,
  HOMEPAGE_PRODUCT_SUITE_CONTENT,
} from "~/features/homepage/config/homepage-content";
import { PRODUCTS } from "~/shared/products/config/products";
import { createContactDestination } from "~/shared/contact/utilities/create-contact-destination";
import { useProducts } from "~/shared/products/store/products-provider";

export default function ProductSuite() {
  const { state, selectProduct } = useProducts();

  return (
    <MarketingContentSection
      identifier={HOMEPAGE_PRODUCT_SUITE_CONTENT.identifier}
      tone="brand"
      alignment="center"
      heading={HOMEPAGE_PRODUCT_SUITE_CONTENT.heading}
      introduction={<p>{HOMEPAGE_PRODUCT_SUITE_CONTENT.introduction}</p>}
    >
      <MarketingProductSuite
        groupsLabel={HOMEPAGE_PRODUCT_SUITE_CONTENT.groupsLabel}
        selectedProductIndex={state.activeProduct}
        onSelectProduct={selectProduct}
        groups={HOMEPAGE_PRODUCT_GROUPS.map((group) => ({
          label: group.label,
          productIndexes: group.productNames.map((productName) =>
            PRODUCTS.findIndex((product) => product.name === productName)
          ),
        }))}
        products={PRODUCTS.map((product) => ({
          name: product.name,
          summary: product.supportingHeadline,
          capabilities: product.capabilities,
          icon: PRODUCT_ICONS_BY_NAME[product.name],
          action: (
            <Link href={createContactDestination(product.name)}>
              Enquire about {product.name}
            </Link>
          ),
        }))}
      />
    </MarketingContentSection>
  );
}
