import { differenceInDays, format } from "date-fns";
import { FaHotel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IBooking } from "../../interface/IRoom";
import { formatCurrency } from "../../utils/Vars";

interface RoomProps {
  room: IBooking;
}

const Reservation = ({ room }: RoomProps) => {
  const {
    id,
    startDate,
    endDate,
    totalPrice,
    hotelRooms: { type, isReserved, image, description, name }
  } = room;

  const RoomTypeStyle =
    type === "single"
      ? "bg-bodyText"
      : type === "double"
      ? "bg-softOrange"
      : type === "suite" && "bg-emeraldGreen";
  const statusToTagName = isReserved
    ? "bg-green-200 text-green-700"
    : "bg-gray-300 text-gray-700 ";

  return (
    <Link
      to={`/reservations/${id}`}
      key={id}
      className="transition-all cursor-pointer hover:scale-[1.01] group bg-cardBg hover:bg-accentGold hover:shadow-xl rounded-xl shadow-md"
    >
      <div className="overflow-hidden transition-all image rounded-t-xl">
        <img src={image} alt={`image ${id}`} className="w-full" />
      </div>
      <section className="flex flex-col p-2 md:p-4 details gap-y-3">
        <header className="flex items-center justify-between">
          <h2 className="font-semibold capitalize group-hover:text-white text-bodyText text-[1.1rem] transition-colors">
            Room {name}
          </h2>
          <h6
            className={`${RoomTypeStyle} py-1 px-2  rounded-lg text-primaryBtnText   capitalize transition-colors text-sm `}
          >
            {type}
          </h6>
        </header>
        <p className="text-sm italic leading-6 text-mutedText group-hover:text-white transition-colors">
          {description}
        </p>

        <div className="tags flex items-center gap-x-9 justify-between">
          <p className="space-x-1">
            {format(new Date(startDate), "EEE, MMM dd yyyy")}&mdash;
            {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          <div className="flex items-center gap-x-1 text-sm md:text-base group-hover:text-white transition-colors text-mutedText">
            <span className="icon">
              <FaHotel className=" group-hover:text-white transition-colors " />
            </span>
            {differenceInDays(endDate, startDate)} Nights
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h6 className="text-sm font-semibold text-bodyText">
            Total Price: {formatCurrency(totalPrice)}
          </h6>
          <h6
            className={`${statusToTagName} py-1 px-3  rounded-lg text-primaryBtnText  capitalize transition-colors text-sm `}
          ></h6>
        </div>
      </section>
    </Link>
  );
};

export default Reservation;
