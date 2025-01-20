import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import Cancelation from "../../components/Cancelation";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import ReservationBoxData from "../../components/ReservationBoxData";
import { useMoveBack } from "../../hooks/UseMoveback";
import { CheckInModal } from "../../redux/RoomsSlice";
import { AppDispatch, RootState } from "../../store";
import { UseBooking } from "./UseBooking";

function ReservationDetails() {
  const moveBack = useMoveBack();
  const { isCheckInModal } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch<AppDispatch>();

  function handleClose() {
    dispatch(CheckInModal("close"));
  }

  const { room, isLoading, error } = UseBooking();

  if (!room) return null;
  const {
    hotelRooms: { isReserved, id, name }
  } = room;
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading room details: {error.message}</div>;
  const statusToTagName = isReserved
    ? "bg-green-200 text-green-700"
    : "bg-gray-300 text-gray-700 ";

  return (
    <div className="sm:p-6   bg-cardBg sm:border-borderLightGray  rounded-xl">
      <header className="flex justify-between w-full items-center mb-6">
        <div className="flex items-center w-full justify-between sm:justify-normal gap-6 ">
          <h1 className="text-3xl font-semibold">Room {name}</h1>
          <span
            className={`uppercase text-xs font-semibold px-3 py-1 rounded-full ${statusToTagName}`}
          >
            {isReserved ? "Reserved" : "Available"}
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
        <ReservationBoxData room={room} />
      </div>

      <div className="flex justify-end gap-3">
        <Button intent={"back"} onClick={() => moveBack()}>
          Back
        </Button>

        <Button
          intent={"checkIn"}
          className="bg-warmRed"
          onClick={() => dispatch(CheckInModal("open"))}
        >
          Cancel Reservation
        </Button>
        {isCheckInModal && (
          <Modal>
            <Cancelation roomId={id} handleClose={handleClose} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ReservationDetails;
