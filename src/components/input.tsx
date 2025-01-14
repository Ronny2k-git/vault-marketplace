import { cva } from "class-variance-authority";

const inputs = cva("input", {
  variants: {
    intent: {
      primary: [""],
      secondary: [""],
      tertiary: [""],
      quaternary: [""],
    },
    size: {
      small: [""],
      medium: [""],
      large: [""],
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
});
