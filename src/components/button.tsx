import { cva } from "class-variance-authority";

const buttonStyle = cva(" flex ", {
  variants: {
    intent: {
      primary: ["bg-button-bg-primary", "text-white", "hover:bg-gray-600"],
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
