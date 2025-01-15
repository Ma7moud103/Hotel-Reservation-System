import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { TailwindCMerge } from "../utils/Index";

const Variants = cva("", {
  variants: {
    intent: {
      primary: "bg-borderAccentGold px-8 text-white py-2 rounded-[120px] "
    }
  },

  defaultVariants: {
    intent: "primary"
  }
});

interface IProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof Variants> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}
const Button = ({ children, className, disabled, intent, ...rest }: IProps) => {
  return (
    <button
      disabled={disabled}
      className={` disabled:bg-mutedText  ${className} ${TailwindCMerge(
        Variants({ intent })
      )} ${rest}`}
    >
      {children}
    </button>
  );
};

export default Button;
