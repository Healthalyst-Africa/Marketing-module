"use client";

import { LogoMark } from "~/components/layout/logo";
import { FOOTER_COMPANY_LINKS, FOOTER_CONNECT_LINKS } from "~/data/site";
import { PRODUCTS } from "~/data/products";
import { useProducts } from "~/store/ProductsContext";
import { scrollTo } from "~/utils/scroll";

function FooterLinkColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <nav>
      <div className="mb-6 font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold">
        {heading}
      </div>
      {children}
    </nav>
  );
}

export default function Footer() {
  const { selectProduct } = useProducts();

  const linkClass =
    "mb-3 block border-none bg-transparent p-0 text-left font-sans text-[13px] font-light text-white/[0.38] transition-colors hover:text-gold-light";

  return (
    <footer className="bg-forest-deep pb-10 pt-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="mb-14 grid grid-cols-1 gap-10 xs:grid-cols-2 tablet:grid-cols-[1.2fr_1fr_1fr_1fr] tablet:gap-[60px]">
          {/* Brand column */}
          <div>
            <LogoMark size="sm" subClassName="text-white/25" className="mb-5" />
            <p className="mb-5 max-w-[260px] font-sans text-[13px] font-light leading-[1.7] text-white/35">
              Building the digital infrastructure of African healthcare — one
              institution at a time.
            </p>
            <div className="font-mono text-[9px] tracking-[0.1em] text-white/20">
              PAN-AFRICAN / HEALTH TECHNOLOGY
            </div>
          </div>

          {/* Products */}
          <FooterLinkColumn heading="Products">
            {PRODUCTS.map((product, index) => (
              <button
                key={product.name}
                className={linkClass}
                onClick={() => {
                  selectProduct(index);
                  scrollTo("products");
                }}
              >
                {product.name}
              </button>
            ))}
          </FooterLinkColumn>

          {/* Company */}
          <FooterLinkColumn heading="Company">
            {FOOTER_COMPANY_LINKS.map((link) => (
              <button
                key={link}
                className={linkClass}
                onClick={() => scrollTo("about")}
              >
                {link}
              </button>
            ))}
          </FooterLinkColumn>

          {/* Connect */}
          <FooterLinkColumn heading="Connect">
            {FOOTER_CONNECT_LINKS.map((link) => (
              <button
                key={link}
                className={linkClass}
                onClick={() => scrollTo("contact")}
              >
                {link}
              </button>
            ))}
          </FooterLinkColumn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-7">
          <span className="font-sans text-[12px] text-white/[0.22]">
            © 2025 Healthalyst Africa. All rights reserved.
          </span>
          <span className="font-mono text-[9px] tracking-[0.08em] text-white/[0.18]">
            BUILDING THE DIGITAL INFRASTRUCTURE OF AFRICAN HEALTHCARE
          </span>
        </div>
      </div>
    </footer>
  );
}
