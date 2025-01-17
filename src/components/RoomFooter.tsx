import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { formatCurrency } from "../utils/Vars";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const RoomFooter = ({
  extrasPrice,
  hasBreakfast,
  regularPrice
}: {
  regularPrice: number;
  hasBreakfast: Boolean;
  extrasPrice: number;
}) => {
  const { isPaid } = useSelector((state: RootState) => state.rooms);

  return (
    <div className="w-full flex bg-primaryBlue  items-center justify-between   text-white p-3 sm:p-5 rounded-lg">
      <div className="flex items-center gap-x-2 text-sm sm:text-base">
        <HiOutlineCurrencyDollar size={22} />
        Total Price
        {formatCurrency(regularPrice)}
        {hasBreakfast &&
          ` (${formatCurrency(regularPrice)} Room + ${formatCurrency(
            extrasPrice
          )} breakfast)`}
      </div>

      <p className="">{isPaid ? "Paid" : "Not Paid"}</p>
    </div>
  );
};

export default RoomFooter;
