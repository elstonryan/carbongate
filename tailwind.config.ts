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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Carbon Atlas — warm obsidian system
        background: "#0b0c0e",
        surface: "#141517",
        card: {
          DEFAULT: "rgba(20, 21, 24, 0.7)",
          foreground: "#f4f4f5",
        },
        border: "rgba(255,255,255,0.08)",
        input: "rgba(255,255,255,0.08)",
        ring: "#34d399",
        primary: {
          DEFAULT: "#34d399",
          dark: "#059669",
          foreground: "#06120c",
        },
        secondary: {
          DEFAULT: "#38e1d6",
          foreground: "#04110f",
        },
        accent: {
          DEFAULT: "#a78bfa",
          foreground: "#0c0814",
        },
        muted: {
          DEFAULT: "#71717a",
          foreground: "#a1a1aa",
        },
        foreground: "#f4f4f5",
        success: "#34d399",
        warning: "#f59e0b",
        danger: "#fb7185",
        destructive: {
          DEFAULT: "#fb7185",
          foreground: "#1a0a0c",
        },
        popover: {
          DEFAULT: "#141517",
          foreground: "#f4f4f5",
        },
        // Industry world accents
        industry: {
          steel: "#ff5a1f",
          aluminium: "#38e1d6",
          cement: "#f0a93b",
          fertilizers: "#4ade80",
          hydrogen: "#a78bfa",
          electricity: "#facc15",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
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
