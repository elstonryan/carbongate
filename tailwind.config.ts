import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        /* ── CarbonGate — European Commission institutional system ──
           Anchored on the official EC colour palette (ECL "EU" theme):
           EC Blue #004494 · EC Yellow #ffd617 · EC grey scale on white. */
        background: "#ffffff",
        surface: "#f4f6fa",
        foreground: "#13284b", // deep institutional navy ink
        border: "#dbe3ec",
        input: "#c9d4e2",
        ring: "#004494",

        card: { DEFAULT: "#ffffff", foreground: "#13284b" },
        popover: { DEFAULT: "#ffffff", foreground: "#13284b" },

        primary: {
          DEFAULT: "#004494", // EC Blue 100
          dark: "#003776", // EC Blue 120
          light: "#1c63b5",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#006fb4", // EC info blue — interactive accent
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#ffd617", // EC Yellow 100 — used sparingly
          dark: "#f8ae21",
          foreground: "#13284b",
        },
        muted: {
          DEFAULT: "#eef2f7",
          foreground: "#5a6b85",
        },

        success: "#2f7d33",
        warning: "#f29527",
        danger: "#da2130",
        destructive: { DEFAULT: "#da2130", foreground: "#ffffff" },

        /* Direct-access EC scales */
        ec: {
          blue: "#004494",
          "blue-dark": "#003776",
          "blue-deep": "#002a5c",
          "blue-75": "#4073af",
          "blue-50": "#7fa1c9",
          "blue-25": "#bfd0e4",
          "blue-5": "#f2f5f9",
          yellow: "#ffd617",
          "yellow-dark": "#f8ae21",
          grey: "#404040",
          "grey-75": "#707070",
          "grey-50": "#9f9f9f",
          "grey-25": "#cfcfcf",
          "grey-15": "#e3e3e3",
          "grey-5": "#f5f5f5",
        },

        /* Sector accents — muted for institutional use as small chips */
        industry: {
          steel: "#b4531f",
          aluminium: "#0f7c8c",
          cement: "#b07d1e",
          fertilizers: "#3f7d3f",
          hydrogen: "#5b53b8",
          electricity: "#9a7d10",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(19,40,75,0.04), 0 8px 24px -18px rgba(19,40,75,0.16)",
        "card-hover":
          "0 2px 4px rgba(19,40,75,0.06), 0 16px 40px -20px rgba(19,40,75,0.26)",
        focus: "0 0 0 3px rgba(0,68,148,0.25)",
      },
      backdropBlur: {
        xs: "2px",
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
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "ticker-scroll": "ticker-scroll 20s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
