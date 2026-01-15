import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyle = cva(
  "!px-4 flex justify-center border-2 border-border-primary items-center no-spinner",
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
          "!p-0",
          "h-12",
          "gap-2",
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
  iconRight?: React.ReactNode;
}

export function Input({
  iconLeft,
  iconRight,
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
          iconLeft && "!pl-10",
          iconRight && "!pr-10"
        )}
        {...props}
      />

      {iconLeft && (
        <span className="absolute left-0 top-3 pl-3">{iconLeft}</span>
      )}
      {iconRight && (
        <span className="absolute right-0 top-3 pr-3">{iconRight}</span>
      )}
    </div>
  );
}
