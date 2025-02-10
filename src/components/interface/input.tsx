import { cva, VariantProps } from "class-variance-authority";

const inputStyle = cva(
  "pl-2 flex justify-center border-2 border-border-primary items-center",
  {
    variants: {
      intent: {
        primary: ["bg-background-alt-2", "text-white", "hover:bg-gray-600"],
      },
      size: {
        medium: [
          "w-48",
          "h-7",
          "py-2",
          "px-1.5",
          "gap-2.5",
          "rounded-md",
          "text-xs",
        ],
        mediumLarge: [
          "w-64",
          "py-2",
          "h-7",
          "px-1.5",
          "gap-2.5",
          "text-white",
          "rounded-md",
          "text-xs",
          "mb-2.5",
        ],
        large: [
          "w-[185px]",
          "h-5",
          "py-2",
          "px-2",
          "gap-2.5",
          "border-0",
          "focus:outline-none",
        ],
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
}) => <input className={inputStyle({ intent, size, className })} {...props} />;
