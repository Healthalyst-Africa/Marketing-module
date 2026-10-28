import Link from "next/link";
import { MarketingContentSection } from "@healthalyst/ui/components/marketing-content-section";
import { MarketingHubDiagram } from "@healthalyst/ui/components/marketing-hub-diagram";
import { LogoMark } from "~/components/ui/healthalyst-brand";
import { PRODUCT_ICONS_BY_NAME } from "~/shared/products/config/product-icons";
import { HOMEPAGE_ECOSYSTEM_CONTENT } from "~/features/homepage/config/homepage-content";
import { PRODUCTS } from "~/shared/products/config/products";
import { createContactDestination } from "~/shared/contact/utilities/create-contact-destination";

export default function Ecosystem() {
  return (
    <MarketingContentSection
      identifier={HOMEPAGE_ECOSYSTEM_CONTENT.identifier}
      alignment="center"
      heading={HOMEPAGE_ECOSYSTEM_CONTENT.heading}
      introduction={<p>{HOMEPAGE_ECOSYSTEM_CONTENT.introduction}</p>}
    >
      <MarketingHubDiagram
        hub={<LogoMark />}
        listLabel={HOMEPAGE_ECOSYSTEM_CONTENT.listLabel}
        nodes={PRODUCTS.map((product) => ({
          title: product.name,
          detail: product.tagline,
          icon: PRODUCT_ICONS_BY_NAME[product.name],
          accessibleSuffix: `: enquire about ${product.name}`,
          link: <Link href={createContactDestination(product.name)} />,
        }))}
      />
      <p className="mx-auto mt-10 max-w-[60ch] lg:mt-4 text-center text-base leading-relaxed text-muted-foreground md:text-[17px]">
        {HOMEPAGE_ECOSYSTEM_CONTENT.example}
      </p>
    </MarketingContentSection>
  );
}
