"use client";

import { ProductCatalogue } from "@healthalyst/ui/components/product-catalogue";
import { CATALOGUE_CONTENT } from "~/data/homepage-content";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";

export default function WhatWeBuild() {
  const { selectProduct } = useProducts();
  return (
    <ProductCatalogue
      content={CATALOGUE_CONTENT}
      products={PRODUCTS}
      onSelect={selectProduct}
    />
  );
}
