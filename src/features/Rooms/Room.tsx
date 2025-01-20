import { format } from "date-fns";
import { Link } from "react-router-dom";
import { IRooms } from "../../interface/IRoom";
import { formatCurrency, handleText } from "../../utils/Vars";

interface RoomProps {
  room: IRooms;
}

const Room = ({ room }: RoomProps) => {
  const {
    image,
    description,
    name,
    id,
    availableFrom,
    availableTo,

    isReserved,
    price,
    type
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
      to={`/rooms/${id}`}
      key={id}
      className="transition-all cursor-pointer hover:scale-[1.01] group bg-cardBg hover:bg-accentGold hover:shadow-xl rounded-xl shadow-md"
    >
      <div className="overflow-hidden transition-all image rounded-t-xl">
        <img src={image} alt={name} className="w-full" />
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
          {handleText(description, 14)}
        </p>

        <div className="tags flex items-center gap-x-9">
          <p className="space-x-1">
            {format(new Date(availableFrom), "EEE, MMM dd yyyy")}&mdash;
            {format(new Date(availableTo), "EEE, MMM dd yyyy")}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h6 className="text-sm font-semibold text-bodyText">
            Price: {formatCurrency(price)}
          </h6>
          <h6
            className={`${statusToTagName} py-1 px-2  rounded-lg text-primaryBtnText  capitalize transition-colors text-sm `}
          >
            {isReserved ? "Reserved" : "Available"}
          </h6>
        </div>
      </section>
    </Link>
  );
};

export default Room;
