import { MdReduceCapacity } from "react-icons/md";
import { Link } from "react-router-dom";
import { IRooms } from "../../interface/IRoom";
import { formatCurrency, handleText } from "../../utils/Vars";

interface RoomProps {
  room: IRooms;
}

const Reservation = ({ room }: RoomProps) => {
  const {
    rooms: { image, description, name, maxCapacity },
    id,
    status,
    type,
    regularPrice,
    numGuests
  } = room;

  const RoomTypeStyle =
    type === "single"
      ? "bg-bodyText"
      : type === "double"
      ? "bg-softOrange"
      : type === "suite" && "bg-emeraldGreen";
  const statusToTagName =
    status === "unconfirmed"
      ? "bg-gray-300 text-gray-700"
      : status === "checked-in"
      ? "bg-green-200 text-green-700"
      : status === "checked-out" && "bg-blue-300 text-blue-700";

  return (
    <Link
      to={`/reservations/${id}`}
      key={id}
      className="transition-all cursor-pointer hover:scale-[1.01] group bg-cardBg hover:bg-accentGold hover:shadow-xl rounded-xl shadow-md"
    >
      <div className="overflow-hidden transition-all image rounded-t-xl">
        <img src={image} alt="" className="w-full" />
      </div>
      <section className="flex flex-col p-2 md:p-4 details gap-y-3">
        <header className="flex items-center justify-between">
          <h2 className="font-semibold capitalize group-hover:text-white text-bodyText text-[1.1rem] transition-colors">
            {name}
          </h2>
          <h6
            className={`${RoomTypeStyle} py-1 px-2  rounded-lg text-primaryBtnText   capitalize transition-colors text-sm `}
          >
            {type}
          </h6>
        </header>
        <p className="text-sm italic leading-6 text-mutedText group-hover:text-white transition-colors">
          {handleText(description, 14)}
        </p>

        <div className="tags flex items-center gap-x-9">
          <div className="flex items-center gap-x-1 text-sm md:text-base group-hover:text-white transition-colors text-accentGold">
            <span className="icon">
              <MdReduceCapacity className=" group-hover:text-white transition-colors text-accentGold" />
            </span>
            maxCapacity {maxCapacity}
          </div>
          <div className="flex items-center gap-x-1 text-sm md:text-base group-hover:text-white transition-colors text-accentGold">
            <span className="icon">
              <MdReduceCapacity className=" group-hover:text-white transition-colors text-accentGold" />
            </span>
            Guests {numGuests}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h6 className="text-sm font-semibold text-bodyText">
            Price: {formatCurrency(regularPrice)}
          </h6>
          <h6
            className={`${statusToTagName} py-1 px-2  rounded-lg text-primaryBtnText  capitalize transition-colors text-sm `}
          >
            {status}
          </h6>
        </div>
      </section>
    </Link>
  );
};

export default Reservation;
