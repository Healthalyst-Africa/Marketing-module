import type React from "react";
import { MarketingScrollToTop } from "@healthalyst/ui/components/marketing-scroll-to-top";
import SiteFooter from "~/features/site-navigation/components/site-footer";
import SiteHeader from "~/features/site-navigation/components/site-header";
import { ProductsProvider } from "~/shared/products/store/products-provider";

/** Shared shell for the homepage and every published inner page. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProductsProvider>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <MarketingScrollToTop
        label="Back to top"
        focusTargetIdentifier="main-content"
      />
    </ProductsProvider>
  );
}
