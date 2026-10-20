import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#000000",
        surface: {
          DEFAULT: "#ffffff",
          base: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
          card: "#ffffff",
          elevated: "#f4f4f5",
          overlay: "#e4e4e7",
          dark: "#0a0a0a",
          darkCard: "#121212",
          border: "#e4e4e7",
        },
        border: {
          subtle: "#e4e4e7",
          hover: "#d4d4d8",
          dark: "#27272a",
          brand: "rgba(147, 51, 234, 0.40)",
          razer: "rgba(147, 51, 234, 0.40)",
        },
        accent: {
          brand: {
            DEFAULT: "#9333ea",
            bright: "#a855f7",
            hover: "#7e22ce",
            dark: "#581c87",
            dim: "#f3e8ff",
            subtle: "rgba(147, 51, 234, 0.08)",
          },
          razer: {
            DEFAULT: "#9333ea",
            bright: "#a855f7",
            hover: "#7e22ce",
            dim: "#f3e8ff",
            subtle: "rgba(147, 51, 234, 0.08)",
          },
          titanium: {
            DEFAULT: "#52525b",
            light: "#71717a",
            pure: "#09090b",
          },
        },
        text: {
          primary: "#09090b",
          secondary: "#27272a",
          muted: "#71717a",
          disabled: "#a1a1aa",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Cascadia Code",
          "Consolas",
          "monospace",
        ],
        display: [
          "var(--font-sans)",
          "Inter",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        "brand-sm": "0 2px 10px -2px rgba(147, 51, 234, 0.35)",
        "razer-sm": "0 2px 10px -2px rgba(147, 51, 234, 0.35)",
        "card-clean": "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
      },
      transitionTimingFunction: {
        fluent: "cubic-bezier(0.1, 0.9, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
