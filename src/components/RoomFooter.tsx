import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { formatCurrency } from "../utils/Vars";

const RoomFooter = ({
  extrasPrice,
  hasBreakfast,
  isPaid,
  regularPrice
}: {
  isPaid: boolean;
  regularPrice: number;
  hasBreakfast: Boolean;
  extrasPrice: number;
}) => {
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
