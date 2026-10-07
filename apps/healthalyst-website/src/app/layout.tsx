import type { Metadata } from "next";
import type React from "react";
import { Cormorant_Garamond, DM_Mono, DM_Sans } from "next/font/google";
import { ThemePreferenceProvider } from "@healthalyst/ui/components/theme-preference-provider";
import { createThemeInitializationScript } from "@healthalyst/ui/lib/theme-preference";
import {
  THEME_PREFERENCE_CONFIGURATION,
  WEBSITE_THEME_STYLES,
} from "~/data/design-palettes";
import "@healthalyst/ui/styles.css";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sansSerifFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monospacedFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteAddress = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteAddress),
  title: {
    default: "Healthalyst Africa | Health Technology Company",
    template: "%s | Healthalyst Africa",
  },
  description:
    "Healthalyst Africa builds purpose-built digital products for healthcare institutions across the African continent, from hospital scheduling to laboratory diagnostics, pharmacy management, and medical equipment supply.",
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
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Healthalyst Africa",
    description: "Building the digital infrastructure of African healthcare.",
    url: "/",
    siteName: "Healthalyst Africa",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 1023,
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
    images: ["/logo.jpg"],
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
      data-palette={THEME_PREFERENCE_CONFIGURATION.defaultIdentifier}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${serifFont.variable} ${sansSerifFont.variable} ${monospacedFont.variable}`}
    >
      <head>
        <style id="website-palette-tokens">{WEBSITE_THEME_STYLES}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: createThemeInitializationScript(
              THEME_PREFERENCE_CONFIGURATION
            ),
          }}
        />
      </head>
      <body>
        <ThemePreferenceProvider configuration={THEME_PREFERENCE_CONFIGURATION}>
          {children}
        </ThemePreferenceProvider>
      </body>
    </html>
  );
}
