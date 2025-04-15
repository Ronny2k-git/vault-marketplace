import { cva, VariantProps } from "class-variance-authority";

const cardStyle = cva("", {
  variants: {
    intent: {
      primary: ["bg-background-foreground", "text-text-foreground"],
      secondary: ["bg-background-alt-2"],
      tertiary: ["bg-background-alt-2", "border-border-primary"],
    },
    size: {
      small: [
        "w-[412px]",
        "h-[305px]",
        // "lg:w-60",
        // "lg:h-[275px]",
        // "lg:text-[12px]",
        "rounded-2xl",
        "text-[15px]",
      ],
      mediumSmall: ["w-[270px]", "h-14", "border-2", "rounded-md"],
      medium: ["w-[290px]", "h-56", "rounded-2xl"],
      mediumLarge: ["w-[290px]", "h-72", "rounded-2xl"],
      mediumLong: [
        "h-6",
        "py-2.5",
        "px-2.5",
        "items-center",
        "gap-2.5",
        "mb-0.5",
      ],
      large: ["w-[745px]", "h-64", "rounded-2xl", "gap-2.5"],
      long: [
        "mb-0.5",
        "lg:h-11",
        "lg:w-[730px]",
        "lg:rounded-none",
        "lg:text-[11px]",
        "h-[80px]",
        "w-[412px]",
        "rounded-3xl",
      ],
      extrahigh: [
        "w-[477px]",
        "h-[702px]",
        "rounded-2xl",
        "py-5",
        "px-5",
        "gap-2.5",
      ],
      high: [
        "w-[370px]",
        "h-[488px]",
        "rounded-2xl",
        "py-5",
        "px-5",
        "gap-2.5",
      ],
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
