"use client";

import {
  CalendarDays,
  FlaskConical,
  Pill,
  Smile,
  ScanLine,
  PackageCheck,
} from "lucide-react";
import { ProductDetails } from "@healthalyst/ui/components/product-details";
import { PRODUCT_DETAILS_CONTENT } from "~/data/homepage-content";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";

const PRODUCT_ILLUSTRATIONS = [
  <CalendarDays key="scheduling" />,
  <FlaskConical key="laboratory" />,
  <Pill key="pharmacy" />,
  <Smile key="dental" />,
  <ScanLine key="imaging" />,
  <PackageCheck key="supply" />,
];

export default function ProductsDive() {
  const { state, selectProduct } = useProducts();
  return (
    <ProductDetails
      content={PRODUCT_DETAILS_CONTENT}
      products={PRODUCTS}
      selectedIndex={state.activeProduct}
      onSelect={selectProduct}
      illustrations={PRODUCT_ILLUSTRATIONS}
    />
  );
}
