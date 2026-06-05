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
        // CarbonGate dark design system
        background: "#0a0f1e",
        surface: "#111827",
        card: {
          DEFAULT: "rgba(17, 24, 39, 0.8)",
          foreground: "#f9fafb",
        },
        border: "rgba(255,255,255,0.08)",
        input: "rgba(255,255,255,0.08)",
        ring: "#10b981",
        primary: {
          DEFAULT: "#10b981",
          dark: "#059669",
          foreground: "#0a0f1e",
        },
        secondary: {
          DEFAULT: "#3b82f6",
          foreground: "#f9fafb",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          foreground: "#f9fafb",
        },
        muted: {
          DEFAULT: "#6b7280",
          foreground: "#9ca3af",
        },
        foreground: "#f9fafb",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f9fafb",
        },
        popover: {
          DEFAULT: "#111827",
          foreground: "#f9fafb",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
