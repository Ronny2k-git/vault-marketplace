import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        background1: "#20252B",
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
      },
    },
  },
  plugins: [],
} satisfies Config;
