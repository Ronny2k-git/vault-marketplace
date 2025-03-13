// FOR FINAL V3, NOT COMPATIBLE WITH V4 OF TAILWIND -- (3.4.17)

import { type Config } from "tailwindcss"
import { default as defaultColors } from "tailwindcss/colors"
import * as defaultTheme from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

// Tailwind's default color palette includes colors that have been renamed, and if you spread over these, it will
// trigger warnings. This code extracts the non-getter properties from the object, so that we don't trigger warnings.
const entries = Object.entries(Object.getOwnPropertyDescriptors(defaultColors)).filter(([key, _]) => {
  return !["lightBlue", "warmGray", "trueGray", "coolGray", "blueGray", "default"].includes(key)
})
const nonDeprecatedColors = Object.fromEntries(entries.map(([key, descriptor]) => [key, descriptor.value]))

const customColors = {
  indigo: {
    ...nonDeprecatedColors.indigo,
    "500-01": nonDeprecatedColors.indigo["500"] + "01",
    "500-10": nonDeprecatedColors.indigo["500"] + "10",
    "500-30": nonDeprecatedColors.indigo["500"] + "30",
    "500-60": nonDeprecatedColors.indigo["500"] + "60",
  },
  white: {
    "white-50": "#FFFFFF50",
  },
  black: {
    "black-05": "#00000005",
    "black-20": "#00000020",
    "black-40": "#00000040",
  },
  "fj-blue": {
    500: "#2E1957",
    600: "#190F41",
    700: "#140935",
    800: "#0E0523",
  },
  "fj-blue-light": {
    500: "#8AB7FF",
    600: "#98BFFF",
    700: "#A6C8FF",
    800: "B4D8FF",
  },
}

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // extend border radius values
      borderRadius: {
        ...defaultTheme.borderRadius,
        "4xl": "1.75rem",
        "5xl": "2rem",
      },
      // custom text glow
      textShadow: {
        "indigo-500-indigo-700": `0px 0px 80px ${nonDeprecatedColors.indigo[500]}, 0px 0px 32px ${nonDeprecatedColors.indigo[700]}`,
      },
      // SHADOWS
      boxShadow: {
        ...defaultTheme.boxShadow,
        "indigo-500-30-inset": `0px 4px 8px 0px ${customColors.indigo["500-30"]} inset, 0px 16px 32px 0px ${customColors.indigo["500-30"]} inset`,
        "black-05-indigo-500-10-inset": `0px 16px 16px 0px ${customColors.black["black-05"]}, 0px 0px 8px 0px ${customColors.indigo["500-10"]} inset, 0px 16px 32px 0px ${customColors.indigo["500-10"]} inset`,
        "glow-64px-medium": `0px 0px 64px 0px ${customColors.indigo["500-30"]}`,
        "glow-160px-weak": `0px 0x 160px 0px ${customColors.indigo["500-30"]}`,
        "64px": `0px 32px 64px 0px ${customColors.black["black-20"]}`,
        "green-400-black-40-inset": `0px 0px 16px 0px ${nonDeprecatedColors.green[400]}, 0px 8px 4px 0px ${customColors.black["black-40"]} inset`,
        "rose-500-black-40-inset": `0px 0px 16px 0px ${nonDeprecatedColors.rose[500]}, 0px 8px 4px 0px ${customColors.black["black-40"]} inset`,
        "indigo-500-60-black-40-inset": `0px 0px 16px 0px ${customColors.indigo["500-60"]}, 0px 8px 4px 0px ${customColors.black["black-40"]} inset`,
        "indigo-500-10-black-20-inset": `0px 2px 8px 0px ${customColors.indigo["500-10"]}, 0px 8px 16px 0px ${customColors.black["black-20"]} inset`,
        "indigo-500-10-fj-blue-600-fj-blue-500-inset": `0px 4px 8px 0px ${customColors.indigo["500-10"]}, 0px -16px 48px 0px ${customColors["fj-blue"][600]} inset, 0px -16px 48px 0px ${customColors["fj-blue"][500]} inset`,
        "black-20-indigo-500-30-inset": `0px 8px 16px 0px ${customColors.black["black-20"]}, 0px 4px 8px 0px ${customColors.indigo["500-30"]} inset, 0px 16px 32px 0px ${customColors.indigo["500-30"]} inset`,
        "black-20-indigo-500-60-rose-500-inset": `0px 8px 16px 0px ${customColors.black["black-20"]}, -8px 8px 24px 0px ${customColors.indigo["500-60"]} inset, 8px 0px 32px 0px ${nonDeprecatedColors.rose[500]} inset`,
        "black-20-indigo-500-60-green-400-inset": `0px 8px 16px 0px ${customColors.black["black-20"]}, -8px 8px 24px 0px ${customColors.indigo["500-60"]} inset, 8px 0px 32px 0px ${nonDeprecatedColors.green[400]} inset`,
        "indigo-300-indigo-500-inset": `0px 4px 0px 0px ${nonDeprecatedColors.indigo[300]}, 0px 2px 4px 0px ${nonDeprecatedColors.indigo[500]} inset, 0px 0px 24px 0px ${nonDeprecatedColors.indigo[500]} inset`,
        "black-20-indigo-300-indigo-500-60-inset": `0px 24px 48px 0px ${customColors.black["black-20"]}, 0px 2px 8px 0px ${customColors.indigo[300]} inset, 0px -8px 32px 0px ${customColors.indigo["500-60"]} inset`,
        "black-20-indigo-500-60-indigo-500-30-inset": `0px 8px 16px 0px ${customColors.black["black-20"]}, 0px 0px 8px 0px ${customColors.indigo["500-60"]} inset, 0px 16px 16px 0px ${customColors.indigo["500-30"]} inset`,
        "indigo-300-indigo-600-inset": `0px -4px 64px 0px ${nonDeprecatedColors.indigo[600]}, 0px 0px 16px 0px ${nonDeprecatedColors.indigo[300]} inset`,
      },
      // TYPOGRAPHY
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      // COLORS HERE:
      colors: {
        ...nonDeprecatedColors,
        ...customColors.black,
        ...customColors.white,
        indigo: customColors.indigo,
        "fj-blue": customColors["fj-blue"],
        "fj-blue-light": customColors["fj-blue-light"],
      },
    },
    keyframes: {
      "fade-slide-in-from-bottom": {
        "0%": { opacity: "0.5", transform: "translateY(100%)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "fade-slide-in-from-top": {
        "0%": { opacity: "0", transform: "translateY(-100%)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "fade-slide-out-to-bottom": {
        "0%": { opacity: "1", transform: "translateY(var(--slide-out-from-pos, 0))" },
        "100%": { opacity: "0", transform: "translateY(100%)" },
      },
      "fade-slide-out-to-top": {
        "0%": { opacity: "1", transform: "translateY(var(--slide-out-from-pos, 0))" },
        "100%": { opacity: "0", transform: "translateY(-100%)" },
      },
      "fade-slide-in-from-left": {
        "0%": { opacity: "0", transform: "translateX(-100%)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      "fade-slide-in-from-right": {
        "0%": { opacity: "0", transform: "translateX(100%)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      "fade-slide-out-to-left": {
        "0%": { opacity: "1", transform: "translateX(var(--slide-out-from-pos, 0))" },
        "100%": { opacity: "0", transform: "translateX(-100%)" },
      },
      "fade-slide-out-to-right": {
        "0%": { opacity: "1", transform: "translateX(var(--slide-out-from-pos, 0))" },
        "100%": { opacity: "0", transform: "translateX(100%)" },
      },
      "fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      "fade-out": {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
      "fade-scale-in": {
        "0%": { opacity: "0", transform: "scale(0.9)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
      "fade-scale-out": {
        "0%": { opacity: "1", transform: "scale(1)" },
        "100%": { opacity: "0", transform: "scale(0.9)" },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "fade-slide-in-from-bottom-200": "fade-slide-in-from-bottom 200ms ease-out",
      "fade-slide-in-from-top-200": "fade-slide-in-from-top 200ms ease-out",
      "fade-slide-out-to-bottom-200": "fade-slide-out-to-bottom 200ms ease-out",
      "fade-slide-out-to-top-200": "fade-slide-out-to-top 200ms ease-in",
      "fade-slide-in-from-left-200": "fade-slide-in-from-left 200ms ease-out",
      "fade-slide-in-from-right-200": "fade-slide-in-from-right 200ms ease-out",
      "fade-slide-out-to-left-200": "fade-slide-out-to-left 200ms ease-in",
      "fade-slide-out-to-right-200": "fade-slide-out-to-right 200ms ease-in",
      "fade-in-200": "fade-in 200ms ease-out",
      "fade-out-200": "fade-out 200ms ease-out",
      "fade-scale-in-120": "fade-scale-in 120ms ease-out",
      "fade-scale-out-120": "fade-scale-out 120ms ease-in",
      "spin-800-linear-infinite": "spin 800ms linear infinite",
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "txt-shadow": (value) => ({ textShadow: value }),
        },
        { values: theme("textShadow") },
      )
    }),
  ],
} satisfies Config
