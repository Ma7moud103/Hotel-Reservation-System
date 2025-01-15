import { Link } from "react-router-dom";
import { IRooms } from "../../interface/IRoom";
import { formatCurrency, handleText } from "../../utils/Vars";

interface RoomProps {
  room: IRooms;
}

const Room = ({ room }: RoomProps) => {
  const { image, id, status, regularPrice, type, description, name } = room;
  return (
    <Link
      to={`/${id}`}
      key={id}
      className="transition-all cursor-pointer hover:scale-[1.01] bg-cardBg hover:shadow-xl rounded-xl shadow-md"
    >
      <div className="overflow-hidden transition-all image rounded-t-xl">
        <img src={image} alt="" className="w-full" />
      </div>
      <div className="flex flex-col p-2 details gap-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold capitalize text-bodyText text-[1.1rem]">
            {name}
          </h2>
          <h6
            className={`${
              type === "single"
                ? "bg-bodyText"
                : type === "suite"
                ? "bg-emeraldGreen"
                : "bg-softOrange"
            } py-1 px-2  rounded-lg text-primaryBtnText  capitalize transition-colors text-sm `}
          >
            {type}
          </h6>
        </div>
        <p className="text-sm italic leading-6 text-mutedText">
          {handleText(description, 50)}
        </p>

        <div className="flex items-center justify-between">
          <h6 className="text-sm font-semibold text-bodyText">
            Price: {formatCurrency(regularPrice)}
          </h6>
          <h6
            className={`${
              status === "booked"
                ? "bg-bodyText"
                : "bg-primaryBtnBg hover:bg-primaryBtnHover"
            } py-1 px-2  rounded-lg text-primaryBtnText  capitalize transition-colors text-sm `}
          >
            {status}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default Room;
