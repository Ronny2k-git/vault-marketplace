import { cva, VariantProps } from "class-variance-authority";

const cardStyle = cva("flex", {
  variants: {
    intent: {
      primary: ["bg-background-foreground", "text-text-foreground"],
      secondary: ["bg-background-alt-2"],
    },
    size: {
      small: ["w-60", "h-[265px]", "rounded-xl", "text-[12px]", "flex-col"],
      medium: ["w-72", "h-44", "rounded-2xl"],
      mediumLarge: ["w-72", "h-60", "rounded-2xl"],
      large: ["w-[722px]", "h-64", "rounded-2xl"],
      long: ["h-11", "w-[730px]", "text-[11px]", "mb-1"],
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
