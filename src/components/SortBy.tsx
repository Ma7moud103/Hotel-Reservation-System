import { ChangeEvent } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
import { IOption } from "../interface/IRoom";

interface IProps {
  options: IOption[];
}

const SortBy = ({ options }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return <Select value={sortBy} options={options} onChange={handleChange} />;
};

export default SortBy;
