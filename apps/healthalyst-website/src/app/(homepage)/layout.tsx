import type { Metadata } from "next";
import type React from "react";
import { ProductsProvider } from "~/store/ProductsContext";
import Header from "./_components/header";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomeLayout({
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
