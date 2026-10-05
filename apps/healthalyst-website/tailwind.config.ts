import type { Config } from "tailwindcss";

const config = {
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
          DEFAULT: "#9A9282",
          foreground: "hsl(var(--muted-foreground))",
        },
        /** Healthalyst Africa brand palette */
        forest: {
          DEFAULT: "#183020",
          mid: "#254533",
          deep: "#0E1510",
        },
        gold: {
          DEFAULT: "#B8935A",
          light: "#CFA96E",
        },
        cream: {
          DEFAULT: "#F9F6F0",
          dark: "#F2EDE3",
          light: "#FAF4EB",
        },
        sand: {
          DEFAULT: "#E2D9C8",
          dark: "#C8BCA8",
        },
        ink: {
          DEFAULT: "#0E1510",
          soft: "#3D3830",
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
        xs: "600px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
