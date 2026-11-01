import type React from "react";
import { WhatsAppIcon } from "@healthalyst/icons";
import { MarketingFloatingActions } from "@healthalyst/ui/components/marketing-floating-actions";
import { MarketingFloatingLink } from "@healthalyst/ui/components/marketing-floating-link";
import { MarketingScrollToTop } from "@healthalyst/ui/components/marketing-scroll-to-top";
import { COMPANY_WHATSAPP_DESTINATION } from "~/config/company-phone";
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
      <MarketingFloatingActions>
        <MarketingScrollToTop
          label="Back to top"
          focusTargetIdentifier="main-content"
        />
        <MarketingFloatingLink
          destination={COMPANY_WHATSAPP_DESTINATION}
          label="Chat with us on WhatsApp"
          icon={<WhatsAppIcon aria-hidden="true" />}
        />
      </MarketingFloatingActions>
    </ProductsProvider>
  );
}
