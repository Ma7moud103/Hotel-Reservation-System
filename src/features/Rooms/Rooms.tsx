import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

import { IRooms } from "../../interface/IRoom";
import Room from "./Room";
import { UseRooms } from "./UseRooms";

const Rooms = () => {
  const { rooms, isLoading } = UseRooms();

  const data = rooms?.data;
  const count = rooms?.count ?? 0;

  if (isLoading) return <Loading />;

  if (!data || data.length === 0) {
    return (
      <div className="p-5 text-center ">
        <p className="text-lg font-semibold text-mutedText">
          No rooms available at the moment.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid justify-center grid-cols-1 sm:p-3 mt-3 sm:border rounded-lg sm:border-borderLightGray gap-y-5 md:gap-4 md:grid-cols-2 lg:grid-cols-3 h-full">
        {data.map((room: IRooms) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
      <div>
        <Pagination count={count} />
      </div>
    </div>
  );
};

export default Rooms;
