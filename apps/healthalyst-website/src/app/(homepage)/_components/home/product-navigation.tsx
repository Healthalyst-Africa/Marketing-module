"use client";

import { ProductNavigation as SharedProductNavigation } from "@healthalyst/ui/components/product-catalogue";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";

export default function ProductNavigation() {
  const { selectProduct } = useProducts();
  return (
    <SharedProductNavigation products={PRODUCTS} onSelect={selectProduct} />
  );
}
