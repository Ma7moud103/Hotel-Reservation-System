import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { formatCurrency } from "../utils/Vars";

const RoomFooter = ({
  price,
  hasBreakfast,
  breakfastPrice,
  totalPrice
}: {
  price: number;
  breakfastPrice: number;
  hasBreakfast: boolean;
  totalPrice: number;
}) => {
  return (
    <div className="w-full flex bg-primaryBlue  items-center justify-between   text-white p-3 sm:p-5 rounded-lg">
      <div className="flex items-center gap-x-2 text-sm sm:text-base">
        <HiOutlineCurrencyDollar size={22} />
        Total Price
        {formatCurrency(totalPrice)}
        {hasBreakfast &&
          ` (${formatCurrency(price)} Room + ${formatCurrency(
            breakfastPrice
          )} breakfast )`}
      </div>

      {/* <p className="">{isPaid ? "Paid" : "Not Paid"}</p> */}
    </div>
  );
};

export default RoomFooter;
