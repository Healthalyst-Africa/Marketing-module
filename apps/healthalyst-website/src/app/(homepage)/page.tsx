import type { Metadata } from "next";
import Hero from "./_components/home/hero";
import StatisticsBar from "./_components/home/statistics-bar";
import WhatWeBuild from "./_components/home/what-we-build";
import ProductsDive from "./_components/home/products-dive";
import HowWeWork from "./_components/home/how-we-work";
import About from "./_components/home/about";
import FAQ from "./_components/home/faq";
import Contact from "./_components/home/contact";

export const metadata: Metadata = {
  description:
    "Healthalyst Africa builds purpose-built digital products for healthcare institutions across the African continent — hospital scheduling, laboratory diagnostics, pharmacy management, dental practice software, diagnostic imaging and medical equipment supply.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Healthalyst Africa",
    description: "Building the digital infrastructure of African healthcare.",
    url: "/",
  },
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <StatisticsBar />
      <WhatWeBuild />
      <ProductsDive />
      <HowWeWork />
      <About />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
