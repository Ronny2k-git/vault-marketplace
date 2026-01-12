import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyle = cva(
  "!px-4 flex justify-center border-2 border-border-primary items-center",
  {
    variants: {
      intent: {
        primary: ["bg-background-alt-2", "text-white", "hover:bg-gray-600"],
      },
      size: {
        medium: [
          "w-full",
          "h-7",
          "py-2",
          "px-1.5",
          "gap-2.5",
          "rounded-md",
          "text-xs",
        ],
        mediumLarge: [
          "w-full",
          "py-2",
          "h-11",
          "px-1.5",
          "gap-2.5",
          "text-white",
          "rounded-xl",
          "text-sm",
        ],
        large: [
          "w-full",
          "h-12",
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
  iconLeft?: React.ReactNode;
}

export function Input({
  iconLeft,
  className,
  intent,
  size,
  ...props
}: InputProps) {
  return (
    <div className="flex relative">
      <input
        className={twMerge(
          inputStyle({ intent, size, className }),
          iconLeft && "!pl-10"
        )}
        {...props}
      />

      {iconLeft && (
        <span className="absolute left-0 top-2.5 pl-2">{iconLeft}</span>
      )}
    </div>
  );
}
