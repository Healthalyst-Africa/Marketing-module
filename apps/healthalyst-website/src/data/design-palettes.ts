import type { DesignPaletteOption } from "@healthalyst/ui/components/palette-selector";
import type { ThemePreferenceConfiguration } from "@healthalyst/ui/lib/theme-preference";

interface PaletteColors {
  primary: string;
  emphasis: string;
  deep: string;
  accent: string;
  accentLight: string;
  accentOnPrimary: string;
  background: string;
  backgroundAlternate: string;
  backgroundLight: string;
  border: string;
  borderStrong: string;
  controlBorder: string;
  decorativeMuted: string;
  foreground: string;
  secondaryForeground: string;
}

interface WebsitePalette {
  identifier: string;
  name: string;
  description: string;
  colors: PaletteColors;
}

export const WEBSITE_PALETTES: readonly WebsitePalette[] = [
  {
    identifier: "original",
    name: "Forest and gold",
    description:
      "The original HealthAlyst palette. Calm, grounded and familiar.",
    colors: {
      primary: "#183020",
      emphasis: "#254533",
      deep: "#0E1510",
      accent: "#B8935A",
      accentLight: "#CFA96E",
      accentOnPrimary: "#B8935A",
      background: "#F9F6F0",
      backgroundAlternate: "#F2EDE3",
      backgroundLight: "#FAF4EB",
      border: "#E2D9C8",
      borderStrong: "#C8BCA8",
      controlBorder: "#8C8170",
      decorativeMuted: "#9A9282",
      foreground: "#0E1510",
      secondaryForeground: "#3D3830",
    },
  },
  {
    identifier: "green-coral",
    name: "Green and coral",
    description: "Fresh green with a warm coral accent. Open and approachable.",
    colors: {
      primary: "#145A46",
      emphasis: "#0F4637",
      deep: "#112C23",
      accent: "#ED927D",
      accentLight: "#F5B6A6",
      accentOnPrimary: "#F5B6A6",
      background: "#FAF7EF",
      backgroundAlternate: "#EAF2EC",
      backgroundLight: "#FFF9F5",
      border: "#CDDCD2",
      borderStrong: "#9CB9AA",
      controlBorder: "#748B80",
      decorativeMuted: "#80968A",
      foreground: "#112C23",
      secondaryForeground: "#40584E",
    },
  },
  {
    identifier: "cobalt-citrus",
    name: "Cobalt and citrus",
    description: "Clear blue with a citrus accent. Energetic and precise.",
    colors: {
      primary: "#224CC7",
      emphasis: "#193BA2",
      deep: "#162440",
      accent: "#E7CF58",
      accentLight: "#F2E29B",
      accentOnPrimary: "#E7CF58",
      background: "#F6F8FE",
      backgroundAlternate: "#EAF0FC",
      backgroundLight: "#FCFDFF",
      border: "#CCD7EE",
      borderStrong: "#A0B3DA",
      controlBorder: "#7C8FB2",
      decorativeMuted: "#8495B8",
      foreground: "#162440",
      secondaryForeground: "#47536C",
    },
  },
  {
    identifier: "plum-peach",
    name: "Plum and peach",
    description: "Rich plum with soft peach. Warm, thoughtful and expressive.",
    colors: {
      primary: "#582D64",
      emphasis: "#45224F",
      deep: "#2C2030",
      accent: "#F0B39D",
      accentLight: "#F7D4C6",
      accentOnPrimary: "#F0B39D",
      background: "#FBF6F3",
      backgroundAlternate: "#F1E8F0",
      backgroundLight: "#FFFAF7",
      border: "#DDCFDC",
      borderStrong: "#BEA6BD",
      controlBorder: "#958097",
      decorativeMuted: "#AC95AD",
      foreground: "#2C2030",
      secondaryForeground: "#5D4B60",
    },
  },
];

export const DESIGN_PALETTE_OPTIONS: readonly DesignPaletteOption[] =
  WEBSITE_PALETTES.map((palette) => ({
    identifier: palette.identifier,
    name: palette.name,
    description: palette.description,
    colors: [
      { label: "Primary", value: palette.colors.primary },
      { label: "Accent", value: palette.colors.accent },
      { label: "Background", value: palette.colors.background },
      { label: "Foreground", value: palette.colors.foreground },
      { label: "Surface", value: "#FFFFFF" },
      { label: "Border", value: palette.colors.border },
    ],
  }));

export const THEME_PREFERENCE_CONFIGURATION: ThemePreferenceConfiguration = {
  cookieName: "healthalyst-design-palette",
  defaultIdentifier: "original",
  paletteIdentifiers: WEBSITE_PALETTES.map((palette) => palette.identifier),
};

function colorChannels(hexadecimal: string): number[] {
  return [1, 3, 5].map((offset) =>
    Number.parseInt(hexadecimal.slice(offset, offset + 2), 16)
  );
}

function hueSaturationLightness(hexadecimal: string): string {
  const [red = 0, green = 0, blue = 0] = colorChannels(hexadecimal).map(
    (channel) => channel / 255
  );
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const difference = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  const saturation =
    difference === 0 ? 0 : difference / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;
  if (difference !== 0) {
    if (maximum === red) hue = ((green - blue) / difference) % 6;
    else if (maximum === green) hue = (blue - red) / difference + 2;
    else hue = (red - green) / difference + 4;
    hue = (hue * 60 + 360) % 360;
  }
  return `${hue.toFixed(2)} ${(saturation * 100).toFixed(2)}% ${(lightness * 100).toFixed(2)}%`;
}

// Brand aliases support the existing pages; new shared components use semantic roles.
export const WEBSITE_THEME_STYLES = WEBSITE_PALETTES.map((palette) => {
  const colors = palette.colors;
  const semanticColors = {
    background: colors.background,
    foreground: colors.foreground,
    card: "#FFFFFF",
    "card-foreground": colors.foreground,
    popover: "#FFFFFF",
    "popover-foreground": colors.foreground,
    primary: colors.primary,
    "primary-foreground": "#FFFFFF",
    secondary: colors.backgroundAlternate,
    "secondary-foreground": colors.primary,
    muted: colors.backgroundAlternate,
    "muted-foreground": colors.secondaryForeground,
    accent: colors.accent,
    "accent-foreground": colors.foreground,
    destructive: "#B42318",
    "destructive-foreground": "#FFFFFF",
    border: colors.border,
    input: colors.controlBorder,
    ring: colors.primary,
  };
  const brandColors = {
    forest: colors.primary,
    "forest-mid": colors.emphasis,
    "forest-deep": colors.deep,
    gold: colors.accent,
    "gold-light": colors.accentLight,
    "accent-on-primary": colors.accentOnPrimary,
    cream: colors.background,
    "cream-dark": colors.backgroundAlternate,
    "cream-light": colors.backgroundLight,
    sand: colors.border,
    "sand-dark": colors.borderStrong,
    ink: colors.foreground,
    "ink-soft": colors.secondaryForeground,
    muted: colors.decorativeMuted,
  };
  const semanticDeclarations = Object.entries(semanticColors).map(
    ([role, color]) => `--${role}:${hueSaturationLightness(color)};`
  );
  const brandDeclarations = Object.entries(brandColors).map(
    ([role, color]) => `--brand-${role}:${colorChannels(color).join(" ")};`
  );
  return `html[data-palette="${palette.identifier}"]{${semanticDeclarations.join("")}${brandDeclarations.join("")}}`;
}).join("\n");
