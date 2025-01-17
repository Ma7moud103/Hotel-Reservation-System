import { useSearchParams } from "react-router-dom";
import { IOption } from "../interface/IRoom";
import Button from "./Button";

interface IProps {
  options: IOption[];
  filterBy: string;
}
const Filter = ({ options, filterBy }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterBy) || options.at(0)?.value;

  function handleClick(value: string) {
    searchParams.set(filterBy, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }
  return (
    <div className="border border-borderLightGray rounded-md bg-accentGold w-full sm:w-auto shadow-sm p-1 flex gap-1">
      {options.map((option) => (
        <Button
          intent={"filter"}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
