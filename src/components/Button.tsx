import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { TailwindCMerge } from "../utils/Index";

const Variants = cva("", {
  variants: {
    intent: {
      primary:
        "disabled:bg-mutedText bg-borderAccentGold px-8 text-white py-2 rounded-[120px] ",
      filter:
        " px-4 text-white py-2 hover:bg-softOrange disabled:bg-softOrange rounded-md transition-all  ",
      checkIn:
        "bg-primaryBtnBg text-white px-4 py-2 flex items-center gap-2 rounded shadow-sm hover:bg-primaryBtnHover transition-all disabled:opacity-50 disabled:cursor-not-allowed",
      back: "bg-gray-300 text-gray-700 border border-gray-200 px-4 py-2 rounded shadow-sm hover:bg-gray-400 transition-all"
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = ({
  children,
  className,
  onClick,
  disabled,
  intent,
  ...rest
}: IProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`  ${className} ${TailwindCMerge(
        Variants({ intent })
      )} ${rest}`}
    >
      {children}
    </button>
  );
};

export default Button;
