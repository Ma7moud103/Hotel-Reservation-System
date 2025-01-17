import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useMoveBack } from "../../hooks/UseMoveback";
import RoomBoxData from "./RoomBoxData";
import { UseRoom } from "./UseRoom";
import Button from "../../components/Button";

function RoomDetails() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { room, isLoading, error } = UseRoom();
  console.log(room);
  if (!room) return null;
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading room details: {error.message}</div>;
  const { status } = room;
  const statusToTagName =
    status === "unconfirmed"
      ? "bg-gray-100 text-gray-700"
      : status === "checked-in"
      ? "bg-green-100 text-green-700"
      : status === "checked-out" && "bg-blue-100 text-blue-700";

  return (
    <div className="sm:p-6   bg-cardBg sm:border-borderLightGray  rounded-xl">
      <header className="flex justify-between w-full items-center mb-6">
        <div className="flex items-center w-full justify-between sm:justify-normal gap-6 ">
          <h1 className="text-3xl font-semibold">Room #{roomId}</h1>
          <span
            className={`uppercase text-xs font-semibold px-3 py-1 rounded-full ${statusToTagName}`}
          >
            {status.replace("-", " ")}
          </span>
        </div>

        <button
          className="text-softOrange hidden  sm:block font-medium hover:text-blue-700 transition-all"
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </header>

      <div className=" p-4 rounded-lg shadow mb-6  ">
        <RoomBoxData room={room} />
      </div>

      <div className="flex justify-end gap-3">
        <Button intent={"back"} onClick={() => moveBack()}>
          Back
        </Button>
        {status === "unconfirmed" && (
          <Button intent={"checkIn"} onClick={() => navigate(`/bookRoom`)}>
            Check in
          </Button>
        )}
      </div>
    </div>
  );
}

export default RoomDetails;
