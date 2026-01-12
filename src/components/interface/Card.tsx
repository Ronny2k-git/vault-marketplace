import { cva, VariantProps } from "class-variance-authority";

const cardStyle = cva("", {
  variants: {
    intent: {
      primary: [
        "bg-background-foreground",
        "text-text-foreground",
        "border",
        "border-gray-400/80",
      ],
      secondary: ["bg-background-alt-2"],
      tertiary: ["bg-background-alt-2", "border-border-primary"],
    },
    size: {
      small: [
        "w-full",
        "max-w-[22rem]",
        "max-h-[22rem]",
        "rounded-2xl",
        "text-base",
      ],
      mediumSmall: ["w-full", "h-auto", "border-2", "rounded-md"],
      medium: ["w-full", "h-auto", "rounded-2xl"],
      mediumLong: ["py-2", "px-2", "items-center", "gap-2"],
      large: ["w-full", "h-64", "rounded-2xl"],
      high: [
        "w-full",
        "max-w-sm",
        "min-h-[30rem]",
        "rounded-2xl",
        "py-5",
        "px-5",
        "gap-2",
      ],
      mediumHigh: [
        "max-w-[20rem]",
        "h-auto",
        "rounded-2xl",
        "py-5",
        "px-8",
        "gap-2.5",
      ],
      extrahigh: ["w-full", "h-auto", "rounded-2xl", "p-5", "gap-2.5"],
    },
    defaultVariants: {
      intent: "primary",
      // size: "",
    },
  },
});
export interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "disabled">,
    VariantProps<typeof cardStyle> {}

export const Card: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => <div className={cardStyle({ intent, size, className })} {...props} />;
