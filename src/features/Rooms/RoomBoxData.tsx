import { format, isToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaCalendarWeek } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import RoomConfirmationInputs from "../../components/RoomConfirmationInputs";
import RoomFooter from "../../components/RoomFooter";
import RoomHeader from "../../components/RoomHeader";
import { IBooking } from "../../interface/IRoom";
import { handleRange } from "../../redux/RoomsSlice";
import { AppDispatch, RootState } from "../../store";
import { formatDistanceFromNow } from "../../utils/Vars";

interface IProps {
  room: IBooking;
}
function RoomBoxData({ room }: IProps) {
  const { breakfast, range } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch<AppDispatch>();

  if (!room) return null;
  const {
    rooms: { maxCapacity, name, image, regularPrice },
    startDate,
    endDate,
    extrasPrice,
    status,
    numNights,
    numGuests
  } = room;

  return (
    <>
      <section className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5   ">
        <section className=" mt-4 bg-red- w-full ">
          <div className="image w-full">
            <img
              className="w-full rounded-md rounded-b-none  md:rounded-md "
              src={image}
              alt={name}
            />
          </div>
        </section>
        <section>
          <RoomHeader maxCapacity={maxCapacity} name={name} />
          <div className="px-2 sm:px-4">
            <div className=" space-y-8 py-4 ">
              <div className=" date flex items-center gap-x-2 font-semibold  text-xs sm:text-[1.1rem]   capitalize text-orange-700">
                <span className="">
                  <FaCalendarWeek />
                </span>
                {format(new Date(startDate), "EEE, MMM dd yyyy")} (
                {isToday(new Date(startDate))
                  ? "Today"
                  : formatDistanceFromNow(startDate)}
                ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
              </div>

              <div className="box flex items-center gap-x-2">
                <HiOutlineCheckCircle size={22} className="text-primaryBlue" />
                <span className="font-medium">
                  Breakfast Included? {breakfast ? " Yes" : " No"}
                </span>
              </div>
            </div>
            <RoomFooter
              extrasPrice={extrasPrice}
              hasBreakfast={breakfast}
              regularPrice={regularPrice}
            />

            {status === "unconfirmed" && (
              <RoomConfirmationInputs
                regularPrice={regularPrice}
                numGuests={numGuests}
                numNights={numNights}
              />
            )}
          </div>
        </section>
      </section>
      <div className="mt-3">
        <DayPicker
          className="bg-accentGold flex flex-wrap gap-2 w-full place-self-center p-3  rounded-xl"
          mode="range"
          onSelect={(range) =>
            dispatch(handleRange({ from: range?.from, to: range?.to }))
          }
          selected={range}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
        />
      </div>
    </>
  );
}

export default RoomBoxData;
