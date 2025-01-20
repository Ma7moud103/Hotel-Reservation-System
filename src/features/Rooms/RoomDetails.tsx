import { differenceInDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { useMoveBack } from "../../hooks/UseMoveback";
import {
  CheckInModal,
  handleRange,
  toggleBreakfast
} from "../../redux/RoomsSlice";
import { AppDispatch, RootState } from "../../store";
import BookRoom from "../Reservations/BookRoom";
import RoomBoxData from "./RoomBoxData";
import { UseRoom } from "./UseRoom";
import { useEffect } from "react";

function RoomDetails() {
  const token = sessionStorage.getItem("token");
  const guestId = sessionStorage.getItem("guestId");

  // const { roomId } = useParams<{ roomId: string }>();
  const moveBack = useMoveBack();
  const { isCheckInModal, range, breakfast } = useSelector(
    (state: RootState) => state.rooms
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleClose() {
    dispatch(CheckInModal("close"));
  }

  const { room, isLoading, error } = UseRoom();
  useEffect(() => {
    return () => {
      handleClose();
      dispatch(handleRange({ from: undefined, to: undefined }));
      dispatch(toggleBreakfast("reset"));
    };
  }, []);
  if (!room) return null;
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading room details: {error.message}</div>;
  const { isReserved, name } = room;
  const statusToTagName = isReserved
    ? "bg-green-200 text-green-700"
    : "bg-gray-300 text-gray-700 ";

  const selectedStartDate = range.from;
  const selectedEndDate = range.to;
  const numberOfNight =
    differenceInDays(String(selectedEndDate), String(selectedStartDate)) | 0;

  const pricePerNight = room.breakfastPrice + room.price;
  const isRanged = range.from !== undefined && range.to !== undefined;

  const totalPrice = breakfast
    ? isRanged
      ? pricePerNight * numberOfNight
      : pricePerNight
    : isRanged
    ? room.price * numberOfNight
    : room.price;

  const isDisabledToReservation =
    range.from !== undefined && range.to !== undefined && guestId !== null;

  return (
    <div className="sm:p-6 bg-cardBg sm:border-borderLightGray rounded-xl">
      <header className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center justify-between w-full gap-6 sm:justify-normal ">
          <h1 className="text-3xl font-semibold">Room {name}</h1>
          <span
            className={`uppercase text-xs font-semibold px-3 py-1 rounded-full ${statusToTagName}`}
          >
            {isReserved ? "Reserved" : "Available"}
          </span>
        </div>

        <button
          className="hidden font-medium transition-all text-softOrange sm:block hover:text-blue-700"
          onClick={() => {
            handleClose();
            dispatch(handleRange({ from: undefined, to: undefined }));
            dispatch(toggleBreakfast("reset"));
            moveBack();
          }}
        >
          &larr; Back
        </button>
      </header>

      <div className="p-4 mb-6 rounded-lg shadow ">
        <RoomBoxData
          totalPrice={totalPrice}
          numberOfNight={numberOfNight}
          room={room}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          intent={"back"}
          onClick={() => {
            handleClose();
            dispatch(handleRange({ from: undefined, to: undefined }));
            dispatch(toggleBreakfast("reset"));
            moveBack();
          }}
        >
          Back
        </Button>
        {!isReserved && token !== null && (
          <>
            <Button
              disabled={!isDisabledToReservation}
              intent={"checkIn"}
              onClick={() => dispatch(CheckInModal("open"))}
            >
              Check in
            </Button>
            {isCheckInModal && (
              <Modal>
                <BookRoom
                  numberOfNights={numberOfNight}
                  totalPrice={totalPrice}
                  handleClose={handleClose}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RoomDetails;
