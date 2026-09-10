import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
          DEFAULT: "#0a0a0a",
          base: "#0a0a0a",
          elevated: "#121212",
          card: "#161616",
          overlay: "#1c1c1c",
          border: "#1f1f1f",
        },
        border: {
          subtle: "#1f1f1f",
          hover: "#333333",
          fluent: "rgba(255, 255, 255, 0.08)",
          razer: "rgba(0, 255, 85, 0.40)",
        },
        accent: {
          razer: {
            DEFAULT: "#00ff55",
            hover: "#00e64d",
            dim: "#003814",
            subtle: "rgba(0, 255, 85, 0.08)",
          },
          titanium: {
            DEFAULT: "#e2e4e9",
            muted: "#94a3b8",
            pure: "#ffffff",
          },
        },
        text: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          muted: "#888888",
          disabled: "#52525b",
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
          "SF Mono",
          "Consolas",
          "monospace",
        ],
        display: [
          "var(--font-display)",
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
        "2xl": "16px",
      },
      boxShadow: {
        "razer-sm": "0 0 12px -2px rgba(0, 255, 85, 0.25)",
        "razer-md": "0 0 24px -4px rgba(0, 255, 85, 0.35)",
        "razer-edge": "0 0 0 1px #00ff55, 0 0 16px -2px rgba(0, 255, 85, 0.3)",
        "fluent-rest": "0 4px 16px -2px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
        "fluent-elevated": "0 12px 32px -4px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "fluent-hairline": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      transitionTimingFunction: {
        fluent: "cubic-bezier(0.1, 0.9, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
