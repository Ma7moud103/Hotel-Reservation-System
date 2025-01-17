import { HiOutlineHomeModern } from "react-icons/hi2";

const RoomHeader = ({
  maxCapacity,
  name
}: {
  maxCapacity: number;
  name: string;
}) => {
  return (
    <header className="bg-accentGold p-3 rounded-b-md md:rounded-md  sm:p-8 text-white  sm:text-xl font-medium flex justify-between items-center">
      <div className="flex items-center gap-6 font-semibold  sm:text-xl">
        <HiOutlineHomeModern className="h-8 w-8" />
        <p>
          {maxCapacity} Capacity in Room <span className="ml-1">{name}</span>
        </p>
      </div>
    </header>
  );
};

export default RoomHeader;
