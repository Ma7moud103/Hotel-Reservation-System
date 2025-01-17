import { format, isToday } from "date-fns";
import { FaCalendarWeek } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import RoomFooter from "../../components/RoomFooter";
import RoomHeader from "../../components/RoomHeader";
import { IBooking } from "../../interface/IRoom";
import { formatDistanceFromNow } from "../../utils/Vars";

interface IProps {
  room: IBooking;
}
function RoomBoxData({ room }: IProps) {
  if (!room) return null;
  const {
    rooms: { maxCapacity, name, description, image, type, regularPrice },
    startDate,
    endDate,
    isBreakfase,
    isPaid,
    extrasPrice,
    hasBreakfast,
    totalPrice,
    numGuests,
    numNights
  } = room;

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 md:gap-x-5   ">
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
                Breakfast Included? {hasBreakfast ? " Yes" : " No"}
              </span>
            </div>
          </div>
          <RoomFooter
            extrasPrice={extrasPrice}
            hasBreakfast={hasBreakfast}
            isPaid={isPaid}
            regularPrice={regularPrice}
          />
        </div>
      </section>
    </section>
  );
}

export default RoomBoxData;
