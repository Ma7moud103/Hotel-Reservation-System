import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaCalendarWeek } from "react-icons/fa6";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import RoomConfirmationInputs from "../../components/RoomConfirmationInputs";
import RoomFooter from "../../components/RoomFooter";
import RoomHeader from "../../components/RoomHeader";
import { IRooms } from "../../interface/IRoom";
import { handleRange } from "../../redux/RoomsSlice";
import { AppDispatch, RootState } from "../../store";
import { formatCurrency } from "../../utils/Vars";
import { FaHotel } from "react-icons/fa6";

interface IProps {
  room: IRooms;
  numberOfNight: number;
  totalPrice: number;
}
function RoomBoxData({ room, numberOfNight, totalPrice }: IProps) {
  const { breakfast, range } = useSelector((state: RootState) => state.rooms);

  const dispatch = useDispatch<AppDispatch>();

  if (!room) return null;

  const {
    image,
    description,

    id,
    availableFrom,
    availableTo,
    breakfastPrice,
    isReserved,
    price
  } = room;

  return (
    <>
      <section className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5   ">
        <div className=" mt-4 bg-red- w-full ">
          <div className="image w-full">
            <img
              className="w-full rounded-md rounded-b-none  md:rounded-md "
              src={image}
              alt={`Image ${id}`}
            />
          </div>
        </div>
        <section>
          <RoomHeader id={id} />
          <div className="px-2 sm:px-4">
            <div className=" space-y-8 py-4 ">
              <div className="date flex flex-row items-center justify-between">
                <div className=" date flex items-center gap-x-2 font-semibold  text-xs sm:text-[1.1rem]   capitalize text-orange-700">
                  <span className="">
                    <FaCalendarWeek />
                  </span>
                  {format(new Date(availableFrom), "EEE, MMM dd yyyy")}&mdash;
                  {format(new Date(availableTo), "EEE, MMM dd yyyy")}
                </div>
                <div className=" text-bodyText flex items-center gap-x-2">
                  <FaHotel />
                  <span> {numberOfNight} night</span>
                </div>
              </div>

              <p className="text-sm italic leading-6 text-mutedText group-hover:text-white transition-colors">
                {description}
              </p>

              <div className="box flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <HiOutlineCheckCircle
                    size={22}
                    className="text-primaryBlue"
                  />
                  <span className="font-medium">
                    Breakfast Included? {breakfast ? " Yes" : " No"}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <MdOutlinePriceChange
                    size={22}
                    className="text-primaryBlue"
                  />
                  <span className="font-medium">
                    Price Per Night? {formatCurrency(price)}
                  </span>
                </div>
              </div>
            </div>
            <RoomFooter
              breakfastPrice={breakfastPrice}
              hasBreakfast={breakfast}
              price={price}
              totalPrice={totalPrice}
            />
            <RoomConfirmationInputs breakfastPrice={breakfastPrice} />
          </div>
        </section>
      </section>
      {!isReserved && (
        <div className="mt-3">
          <DayPicker
            className="bg-accentGold flex flex-wrap gap-2 w-full place-self-center p-3  rounded-xl"
            mode="range"
            onSelect={(range) => {
              dispatch(
                handleRange({
                  from: range?.from,
                  to: range?.to
                })
              );
            }}
            selected={range}
            fromMonth={new Date(availableFrom)}
            disabled={[
              {
                before: new Date(availableFrom),
                after: new Date(availableTo)
              }
            ]}
            captionLayout="dropdown"
            numberOfMonths={2}
          />
        </div>
      )}
    </>
  );
}

export default RoomBoxData;
