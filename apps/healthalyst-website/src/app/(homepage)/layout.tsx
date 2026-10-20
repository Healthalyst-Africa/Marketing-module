import type React from "react";
import { ProductsProvider } from "~/store/ProductsContext";
import Header from "./_components/header";
import Footer from "./_components/footer";

/** Shared shell for the homepage and every published inner page. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProductsProvider>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </ProductsProvider>
  );
}
