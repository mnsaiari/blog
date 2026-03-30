import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
      },
      colors: {
        accent: "#8B6914",
        "accent-light": "#C5A880",
        background: "#F9F6F1",
        surface: "#FFFFFF",
        "text-primary": "#1a1a1a",
        "text-secondary": "#555555",
        "text-muted": "#888888",
        border: "#E8E2D9",
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Tajawal, sans-serif",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
