import type { Config as TailwindConfiguration } from "tailwindcss";

const tailwindConfiguration = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        /** Healthalyst Africa brand palette */
        forest: {
          DEFAULT: "rgb(var(--brand-forest) / <alpha-value>)",
          mid: "rgb(var(--brand-forest-mid) / <alpha-value>)",
          deep: "rgb(var(--brand-forest-deep) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--brand-gold) / <alpha-value>)",
          light: "rgb(var(--brand-gold-light) / <alpha-value>)",
        },
        "accent-on-primary":
          "rgb(var(--brand-accent-on-primary) / <alpha-value>)",
        cream: {
          DEFAULT: "rgb(var(--brand-cream) / <alpha-value>)",
          dark: "rgb(var(--brand-cream-dark) / <alpha-value>)",
          light: "rgb(var(--brand-cream-light) / <alpha-value>)",
        },
        sand: {
          DEFAULT: "rgb(var(--brand-sand) / <alpha-value>)",
          dark: "rgb(var(--brand-sand-dark) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--brand-ink) / <alpha-value>)",
          soft: "rgb(var(--brand-ink-soft) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        mono: ["var(--font-mono)", "DM Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        /** Matches the source design's 900px collapse point */
        tablet: "900px",
        /** Matches the source design's 600px collapse point */
        smallScreen: "600px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies TailwindConfiguration;

export default tailwindConfiguration;
