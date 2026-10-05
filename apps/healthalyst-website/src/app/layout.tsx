import type { Metadata } from "next";
import type React from "react";
import { Cormorant_Garamond, DM_Mono, DM_Sans } from "next/font/google";
import "@healthalyst/ui/styles.css";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Healthalyst Africa | Health Technology Company",
    template: "%s | Healthalyst Africa",
  },
  description:
    "Healthalyst Africa builds purpose-built digital products for healthcare institutions across the African continent — from hospital scheduling to laboratory diagnostics, pharmacy management, and medical equipment supply.",
  keywords: [
    "Healthalyst Africa",
    "health technology Africa",
    "hospital scheduling software",
    "laboratory management platform",
    "pharmacy management software",
    "dental practice management",
    "radiology imaging platform",
    "medical supply procurement",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Healthalyst Africa",
    description: "Building the digital infrastructure of African healthcare.",
    url: "/",
    siteName: "Healthalyst Africa",
    images: [
      {
        url: "/logo.svg",
        width: 64,
        height: 64,
        alt: "Healthalyst Africa",
      },
    ],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthalyst Africa",
    description: "Building the digital infrastructure of African healthcare.",
    images: ["/logo.svg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
