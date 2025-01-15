import { cva, VariantProps } from "class-variance-authority";

const inputStyle = cva(
  "pl-2 flex justify-center border-2 border-border-primary items-center",
  {
    variants: {
      intent: {
        primary: ["bg-background-alt-2", "text-white", "hover:bg-gray-600"],
      },
      size: {
        medium: ["w-48", "h-9", "py-2", "px-1.5", "gap-2.5", "rounded-md"],
        mediumLarge: ["w-60", "h-5", "text-white"],
        large: ["w-64", "h-9", "py-2", "px-2", "gap-2.5", "rounded-md"],
      },
      defaultVariants: {
        intent: "primary",
        size: "large",
      },
    },
  }
);

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "disabled"
    >,
    VariantProps<typeof inputStyle> {
  placeholder?: string;
  size?: "medium" | "mediumLarge" | "large";
}

export const Input: React.FC<InputProps> = ({
  className,
  intent,
  size,
  ...props
}) => <div className={inputStyle({ intent, size, className })} {...props} />;
