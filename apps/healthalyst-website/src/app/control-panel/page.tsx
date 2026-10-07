import type { Metadata } from "next";
import Link from "next/link";
import { DesignControlPanel } from "@healthalyst/ui/components/design-control-panel";
import { DESIGN_PALETTE_OPTIONS } from "~/data/design-palettes";

export const metadata: Metadata = {
  title: "Design control panel",
  description:
    "Experimental colour palette preview for the HealthAlyst website.",
  alternates: { canonical: "/control-panel" },
  robots: { index: false, follow: false },
};

export default function ControlPanelPage() {
  return (
    <DesignControlPanel
      palettes={DESIGN_PALETTE_OPTIONS}
      websiteLink={<Link href="/">View website</Link>}
      previewContent={{
        heading: "We build the digital infrastructure of African healthcare.",
        description:
          "Healthalyst Africa is a health technology company. We design and develop purpose-built digital products for hospitals, laboratories, pharmacies, dental practices, diagnostic imaging centres, and medical equipment suppliers across the continent.",
        primaryAction: <Link href="/#products">Explore Our Products →</Link>,
        secondaryAction: <Link href="/#contact">Speak to Our Team</Link>,
      }}
    />
  );
}
