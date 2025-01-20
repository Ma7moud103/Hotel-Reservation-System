import { HiOutlineHomeModern } from "react-icons/hi2";

const RoomHeader = ({ id }: { id: number }) => {
  return (
    <header className="bg-accentGold p-3 rounded-b-md md:rounded-md  sm:p-8 text-white  sm:text-xl font-medium flex justify-between items-center">
      <div className="flex items-center gap-6 font-semibold  sm:text-xl">
        <HiOutlineHomeModern className="h-8 w-8" />
        <p>
          {""} Booking Room <span className="ml-1">{`Room ${id}`}</span>
        </p>
      </div>
    </header>
  );
};

export default RoomHeader;
