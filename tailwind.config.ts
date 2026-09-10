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
        background: "#080c14",
        surface: {
          DEFAULT: "#0f172a",
          muted: "#131e36",
          card: "#16223d",
          border: "#1e2f52",
        },
        arcade: {
          cyan: "#00f0ff",
          pink: "#ff0055",
          purple: "#8b5cf6",
          gold: "#eab308",
          silver: "#94a3b8",
          bronze: "#b45309",
          green: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px -3px rgba(0, 240, 255, 0.4)",
        "glow-pink": "0 0 20px -3px rgba(255, 0, 85, 0.4)",
        "glow-purple": "0 0 20px -3px rgba(139, 92, 246, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
