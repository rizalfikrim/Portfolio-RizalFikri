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
        bg: "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "text-primary": "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "scan-line": "scan-line 3s linear infinite",
        "data-stream": "data-stream 10s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.6)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "data-stream": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-secondary": "0 0 20px rgba(124, 58, 237, 0.3)",
        "glow-accent": "0 0 20px rgba(245, 158, 11, 0.3)",
        "neon-primary": "0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3), 0 0 30px rgba(0, 212, 255, 0.2)",
        "neon-secondary": "0 0 10px rgba(124, 58, 237, 0.5), 0 0 20px rgba(124, 58, 237, 0.3), 0 0 30px rgba(124, 58, 237, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;