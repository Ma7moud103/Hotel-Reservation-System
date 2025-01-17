import { ChangeEventHandler } from "react";
import { IOption } from "../interface/IRoom";

interface IProps {
  options: IOption[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select = ({
  options,
  value,
  onChange,

  ...props
}: IProps) => {
  return (
    <select
      {...props}
      onChange={onChange}
      value={value}
      className={`text-lg py-3 px-4 border rounded-lg shadow-sm font-medium bg-accentGold outline-mutedText text-primaryBtnText `}
    >
      {options.map((option) => (
        <option className="text-center" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
