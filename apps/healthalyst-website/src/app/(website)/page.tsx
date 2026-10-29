import type { Metadata } from "next";
import Homepage from "~/features/homepage/components/homepage";

export const metadata: Metadata = {
  description:
    "Healthalyst Africa builds purpose-built digital products for healthcare institutions across the African continent: hospital scheduling, laboratory diagnostics, pharmacy management, dental practice software, diagnostic imaging and medical equipment supply.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Healthalyst Africa",
    description: "Building the digital infrastructure of African healthcare.",
    url: "/",
  },
};

export default function HomeRoute() {
  return <Homepage />;
}
