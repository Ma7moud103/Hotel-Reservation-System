import { format, isToday } from "date-fns";
import "react-day-picker/dist/style.css";
import { FaCalendarWeek } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";

import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { IBooking } from "../interface/IRoom";
import { formatDistanceFromNow } from "../utils/Vars";
import RoomFooter from "./RoomFooter";
import RoomHeader from "./RoomHeader";

interface IProps {
  room: IBooking;
}
function ReservationBoxData({ room }: IProps) {
  if (!room) return null;
  const {
    rooms: { maxCapacity, name, image, regularPrice },
    startDate,
    endDate,
    extrasPrice,

    hasBreakfast,
    isPaid,
    observations
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

              <div className=" flex gap-y-3 flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="icon flex items-center gap-x-2">
                  <HiOutlineCheckCircle
                    size={22}
                    className="text-primaryBlue"
                  />
                  <span className="font-medium">
                    Breakfast Included? {hasBreakfast ? " Yes" : " No"}
                  </span>
                </div>
                <div className="icon flex items-center gap-x-2">
                  <RiMoneyEuroCircleLine
                    size={22}
                    className="text-primaryBlue"
                  />
                  <span className="font-medium">
                    Booking is paid? {isPaid ? " Yes" : " No"}
                  </span>
                </div>
              </div>
              {!observations && (
                <p className="text-bodyText ps-3 ">{observations}</p>
              )}
            </div>
            <RoomFooter
              extrasPrice={extrasPrice}
              hasBreakfast={hasBreakfast}
              regularPrice={regularPrice}
            />
          </div>
        </section>
      </section>
    </>
  );
}

export default ReservationBoxData;
