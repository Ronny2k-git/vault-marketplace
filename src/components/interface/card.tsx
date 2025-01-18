import { cva, VariantProps } from "class-variance-authority";

const cardStyle = cva("", {
  variants: {
    intent: {
      primary: ["bg-background-foreground", "text-text-foreground"],
      secondary: ["bg-background-alt-2"],
      tertiary: ["bg-background-alt-2", "border-border-primary"],
    },
    size: {
      small: ["w-60", "h-[265px]", "rounded-xl", "text-[12px]", "flex-col"],
      mediumSmall: ["w-[270px]", "h-14", "border-2", "rounded-md"],
      medium: ["w-[294px]", "h-56", "rounded-2xl"],
      mediumLarge: ["w-[294px]", "h-72", "rounded-2xl"],
      mediumLong: [
        "h-6",
        "py-2.5",
        "px-2.5",
        "items-center",
        "gap-2.5",
        "mb-0.5",
      ],
      large: ["w-[755px]", "h-64", "rounded-2xl", "gap-2.5"],
      long: ["h-11", "w-[730px]", "text-[11px]", "mb-0.5"],
    },
    defaultVariants: {
      intent: "primary",
      size: "large",
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
