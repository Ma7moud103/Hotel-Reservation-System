import { MutableRefObject } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import UseOutSideEffect from "../../hooks/UseOutSideEffect";
import { UseRoom } from "../Rooms/UseRoom";
import { differenceInDays } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const BookRoom = ({ handleClose }: { handleClose: () => void }) => {
  const ref: MutableRefObject<HTMLElement | null> =
    UseOutSideEffect(handleClose);
  const { range } = useSelector((state: RootState) => state.rooms);

  const { room } = UseRoom();

  if (!room) return null;
  const {
    regularPrice,
    rooms: { discount, id }
  } = room;

  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    cabinPrice,
    cabinId: id
  };

  console.log(bookingData);

  return (
    <form
      ref={ref}
      className=" bg-mainBg px-2 relative  shadow-md w-[90%] sm:w-[30rem] md:w-[35rem] py-6 rounded-xl"
    >
      <button
        onClick={handleClose}
        type="reset"
        className="absolute top-3 end-3"
      >
        <RiCloseCircleFill className="text-red-600 text-[1.8rem]  transition-colors" />
      </button>
      <header className="text-center mt-4 text-[1.3rem] text-white">
        Booking Room
      </header>

      {/* <textarea
        className="w-full px-2 rounded-xl bg-white outline-accentGold py-2"
        name="observation"
        id=""
      ></textarea> */}
    </form>
  );
};

export default BookRoom;
