import { differenceInDays, format } from "date-fns";
import "react-day-picker/dist/style.css";
import { FaCalendarWeek } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";

import { FaHotel } from "react-icons/fa";
import { IBooking } from "../interface/IRoom";
import { formatCurrency } from "../utils/Vars";

interface IProps {
  room: IBooking;
}
function ReservationBoxData({ room }: IProps) {
  if (!room) return null;

  const {
    id,
    startDate,
    endDate,
    totalPrice,
    isBreakfast,
    hotelRooms: { image, description, breakfastPrice }
  } = room;

  const totalBreakfastPrice =
    differenceInDays(endDate, startDate) * breakfastPrice;
  return (
    <>
      <section className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5   ">
        <section className=" mt-4 bg-red- w-full ">
          <div className="image w-full">
            <img
              className="w-full rounded-md rounded-b-none  md:rounded-md "
              src={image}
              alt={`image ${id}`}
            />
          </div>
        </section>
        <section>
          {/* <RoomHeader maxCapacity={maxCapacity} name={name} /> */}
          <div className="px-2 sm:px-4">
            <div className=" space-y-8 py-4 ">
              <div className=" date flex items-center gap-x-2 font-semibold  text-xs sm:text-[1.1rem]   capitalize text-orange-700">
                <span className="">
                  <FaCalendarWeek />
                </span>
                {format(new Date(startDate), "EEE, MMM dd yyyy")}&mdash;
                {format(new Date(endDate), "EEE, MMM dd yyyy")}
              </div>

              <div className=" flex gap-y-3 flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="icon flex items-center gap-x-2">
                  <HiOutlineCheckCircle
                    size={22}
                    className="text-primaryBlue"
                  />
                  <span className="font-medium">
                    Breakfast Included? {isBreakfast ? " Yes" : " No"}
                  </span>
                </div>
                <div className="icon flex items-center gap-x-2">
                  <FaHotel className="text-primaryBlue text-[1rem]" />
                  <span className="font-medium">
                    {differenceInDays(endDate, startDate)} nights
                  </span>
                </div>
              </div>
              {description && (
                <p className="text-bodyText ps-3 ">{description}</p>
              )}

              <div className="flex flex-col gap-y-1 sm:flex-row sm:justify-between sm:items-center">
                <p className="text-borderAccentGold font-medium">
                  TotalPrice : {formatCurrency(totalPrice)}
                </p>
                <p className="text-borderAccentGold font-medium">
                  Breakfast Price For All Nights :{" "}
                  {formatCurrency(totalBreakfastPrice)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default ReservationBoxData;
