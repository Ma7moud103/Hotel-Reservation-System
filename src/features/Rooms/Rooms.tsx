import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { IRooms } from "../../interface/IRoom";
import Room from "./Room";
import { UseRooms } from "./UseRooms";

const Rooms = () => {
  const { rooms, isLoading } = UseRooms();
  console.log(rooms);

  if (isLoading) return <Loading />;

  if (!rooms || rooms.length === 0) {
    return (
      <div className="p-5 text-center">
        <p className="text-lg font-semibold">
          No rooms available at the moment.
        </p>
      </div>
    );
  }
  return (
    <div className="grid justify-center grid-cols-1 p-3 mt-3 border rounded-lg border-borderLightGray gap-y-5 md:gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {rooms.map((room: IRooms) => (
        <Room key={room.id} room={room} />
      ))}
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default Rooms;
