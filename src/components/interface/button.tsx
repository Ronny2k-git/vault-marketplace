import { cva, VariantProps } from "class-variance-authority";

const buttonStyle = cva("flex justify-center font-SpaceGrotesk items-center", {
  variants: {
    intent: {
      primary: ["bg-button-bg-primary", "text-white", "hover:bg-gray-600"],
      secondary: ["bg-accent", "text-white", "shadow-[2px_2px_0px_0px]"],
    },
    size: {
      small: [
        "lg:py-1.5",
        "lg:px-3",
        "lg:gap-2",
        "rounded-md",
        "lg:text-[10px]",
        "py-1 ",
        "px-2 ",
        "text-[10px] ",
      ],
      medium: [
        "lg:py-2",
        "lg:px-4",
        "lg:gap-1.5",
        "rounded-xl",
        "lg:text-sm",
        "py-2",
        "px-2",
        "gap-2",
        "text-[14px]",
      ],
      mediumLarge: [
        "lg:py-1.5",
        "lg:px-4",
        "lg:gap-2.5",
        "rounded-lg",
        "lg:text-[10px]",
        "md:py-1",
        "md:px-3 ",
        "md: text-[10px]",
        "sm:py-0.5 ",
        "sm:px-2 ",
        "sm:text-[10px]",
      ],
      large: [
        "lg:py-2.5",
        "lg:px-4",
        "gap-2.5",
        "rounded-xl",
        "lg:text-base",
        "md:py-2 ",
        "md:px-3 ",
        "md:text-sm ",
        "sm:py-1 ",
        "sm:px-2 ",
        "sm:text-[10px] ",
      ],
      buttonDrawer: ["h-5", "w-full", "py-4", "px-2", ""],
    },
    defaultVariants: {
      intent: "primary",
      size: "large",
    },
  },
});
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonStyle> {
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => (
  <button className={buttonStyle({ intent, size, className })} {...props} />
);

//How would be in css

// .button {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: 'SpaceGrotesk', sans-serif;
//   transition: background-color 0.3s ease;
// }

// .button.primary {
//   background-color: var(--button-bg-primary);
//   color: white;
// }

// .button.primary:hover {
//   background-color: #4b5563;
// }

// .button.secondary {
//   background-color: var(--accent);
//   color: white;
//   box-shadow: 2px 2px 0px 0px;
// }
// // Sizes
// .button.small {
//   padding: 0.375rem 0.75rem;
//   gap: 0.5rem;
//   border-radius: 0.375rem;
//   font-size: 0.625rem; /* 10px */
// }

// .button.medium {
//   padding: 0.5rem 1rem;
//   gap: 0.375rem;
//   border-radius: 0.75rem;
//   font-size: 0.875rem; /* 14px */
// }

// .button.mediumLarge {
//   padding: 0.375rem 1rem;
//   gap: 0.625rem;
//   border-radius: 0.5rem;
//   font-size: 0.625rem; /* 10px */
// }

// .button.large {
//   padding: 0.625rem 1rem;
//   gap: 0.625rem;
//   border-radius: 0.75rem;
//   font-size: 1rem; /* 16px */
// }

// /* Responsive display*/

// // Large screens
// @media (max-width: 640px) {
//   .button.small {
//     padding: 0.375rem 0.75rem;
//     font-size: 0.625rem; /* 10px */
//   }

//   .button.medium {
//     padding: 0.5rem 1rem;
//     font-size: 0.75rem; /* 12px */
//   }

//   .button.mediumLarge {
//     padding: 0.375rem 1rem;
//     font-size: 0.75rem; /* 12px */
//   }

//   .button.large {
//     padding: 0.5rem 1rem;
//     font-size: 0.875rem; /* 14px */
//   }
// }

//  //Medium screens
// @media (min-width: 641px) and (max-width: 1024px) {
//   .button.small {
//     padding: 0.5rem 1rem;
//     font-size: 0.75rem; /* 12px */
//   }

//   .button.medium {
//     padding: 0.75rem 1.25rem;
//     font-size: 0.875rem; /* 14px */
//   }

//   .button.mediumLarge {
//     padding: 0.5rem 1.25rem;
//     font-size: 0.875rem; /* 14px */
//   }

//   .button.large {
//     padding: 0.75rem 1.25rem;
//     font-size: 1rem; /* 16px */
//   }
// }

// //Large screens
// @media (min-width: 1025px) {
//   .button.small {
//     padding: 0.5rem 1rem;
//     font-size: 0.75rem; /* 12px */
//   }

//   .button.medium {
//     padding: 0.75rem 1.5rem;
//     font-size: 1rem; /* 16px */
//   }

//   .button.mediumLarge {
//     padding: 0.5rem 1.5rem;
//     font-size: 1rem; /* 16px */
//   }

//   .button.large {
//     padding: 1rem 2rem;
//     font-size: 1.125rem; /* 18px */
//   }
// }
