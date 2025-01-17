import Filter from "../../components/Filter";
import SortBy from "../../components/SortBy";

const RoomsOperation = () => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <h1 className="text-lg hidden lg:block italic font-semibold text-bodyText text-[1.8rem]">
        Our Rooms
      </h1>
      <div className="flex flex-col gap-y-4 w-full lg:flex-row lg:gap-x-3 lg:items-center lg:w-auto">
        <Filter
          filterBy="type"
          options={[
            { value: "all", label: "All" },
            { value: "single", label: "Single" },
            { value: "double", label: "Double" },
            { value: "suite", label: "Suite" }
          ]}
        />
        <SortBy
          options={[
            { value: "regularPrice-asc", label: "regularPrice from low" },
            { value: "regularPrice-desc", label: "regularPrice from heigh" }
          ]}
        />
        <SortBy
          options={[
            {
              value: "regularPrice-50To100",
              label: "regularPrice from 50 to 100"
            },
            {
              value: "regularPrice-100To200",
              label: "regularPrice from 100 to 200"
            },
            {
              value: "regularPrice-200To400",
              label: "regularPrice from 200 to 400"
            },
            {
              value: "regularPrice-400To1000",
              label: "regularPrice from 400 to 1000"
            }
          ]}
        />
      </div>
    </div>
  );
};

export default RoomsOperation;
