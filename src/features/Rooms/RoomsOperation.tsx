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
            { value: "price-asc", label: "From Lowest Price" },
            { value: "price-desc", label: "From Highest Price" }
          ]}
        />
        <SortBy
          options={[
            {
              value: "price-50To100",
              label: "price from 50 to 100"
            },
            {
              value: "price-100To400",
              label: "price from 100 to 400"
            },
            {
              value: "price-400To800",
              label: "price from 400 to 800"
            },
            {
              value: "price-Up800",
              label: "price up 800"
            }
          ]}
        />
      </div>
    </div>
  );
};

export default RoomsOperation;
