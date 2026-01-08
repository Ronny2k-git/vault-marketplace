import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        background: "#20252B",
        "background-alt": "#151619",
        "border-primary": "#6A6E72",
        "text-foreground": "#B2BECE",
        "background-foreground": "#464A4F",
        "live-accent": "#6AEA8A",
        "button-bg-primary": "#6B7077",
        white: "#FFFFFF",
        "background-alt-2": "#363B41",
        accent: "#8F51FB",
        "red-accent": "#EA6A6A",
        shadow: "#B083FE",
        "gray-light": "#e3e3e3",
        "gray-mid": "#b0b0b0",
        "gray-dark": "#333333",
        "gray-deep": "#1f1f1f",
        "gray-glow": "#cccccc",
      },
      fontFamily: {
        SpaceGrotesk: ["SpaceGrotesk", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
