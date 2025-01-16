import { cva, VariantProps } from "class-variance-authority";

const buttonStyle = cva("flex justify-center font-SpaceGrotesk items-center", {
  variants: {
    intent: {
      primary: ["bg-button-bg-primary", "text-white", "hover:bg-gray-600", ,],
      secondary: ["bg-accent", "text-white", "hover:bg-purple-600", ,],
    },
    size: {
      small: ["py-1.5", "px-3", "gap-2", "rounded-md", "text-[10px]"],
      medium: ["py-2", "px-3", "gap-1.5", "rounded-xl", "text-sm"],
      mediumLarge: ["py-1.5", "px-1", "gap-2.5"],
      large: ["py-2.5", "px-4", "gap-2.5", "rounded-xl", "text-base"],
    },
    defaultVariants: {
      intent: "primary",
      size: "large",
    },
  },
});
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonStyle> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => (
  <button className={buttonStyle({ intent, size, className })} {...props} />
);
