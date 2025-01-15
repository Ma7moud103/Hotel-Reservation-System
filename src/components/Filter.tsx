const Filter = () => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <h1 className="text-lg italic font-semibold text-bodyText text-[1.3rem]">
        Our Rooms
      </h1>
      <select
        className="p-2 rounded-md bg-primaryBlue text-lightGray"
        value={""}
        id=""
      >
        <option className="text-lightGray" value="">
          Search By Price
        </option>
        <option className="text-lightGray" value="">
          from 0 to 50
        </option>
        <option className="text-lightGray" value="">
          from 50 to 100
        </option>
        <option className="text-lightGray" value="">
          from 100 to 200
        </option>
        <option className="text-lightGray" value="">
          up 200
        </option>
      </select>
    </div>
  );
};

export default Filter;
