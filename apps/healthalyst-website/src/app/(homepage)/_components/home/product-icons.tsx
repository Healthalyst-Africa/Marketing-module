import { PRODUCT_ICONS_BY_NAME } from "~/components/product-icons";
import { PRODUCTS } from "~/data/products";

/** The product icons in the order of `PRODUCTS`. */
export const PRODUCT_ICONS = PRODUCTS.map(
  (product) => PRODUCT_ICONS_BY_NAME[product.name]
);
