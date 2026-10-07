"use client";

import { ProductDetails } from "@healthalyst/ui/components/product-details";
import { PRODUCT_DETAILS_CONTENT } from "~/data/homepage-content";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";
import { PRODUCT_ICONS } from "./product-icons";

export default function ProductsDive() {
  const { state, selectProduct } = useProducts();
  return (
    <ProductDetails
      content={PRODUCT_DETAILS_CONTENT}
      products={PRODUCTS}
      selectedIndex={state.activeProduct}
      onSelect={selectProduct}
      illustrations={PRODUCT_ICONS}
    />
  );
}
