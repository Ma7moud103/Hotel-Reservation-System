import { useDispatch, useSelector } from "react-redux";
import { UseSettings } from "../features/Reservations/UseSettings";
import { toggleBreakfast } from "../redux/RoomsSlice";
import { formatCurrency } from "../utils/Vars";
import { AppDispatch, RootState } from "../store";
interface IProps {
  numNights: number;
  numGuests: number;
  regularPrice: number;
}
const RoomConfirmationInputs = ({ numNights, numGuests }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { breakfast } = useSelector((state: RootState) => state.rooms);

  const { settings } = UseSettings();
  const optionalBrackfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  return (
    <div>
      <div className="p-2 sm:p-3 flex cursor-pointer items-center gap-x-2 rounded-lg my- bg-borderLightGray mt-3">
        <input
          className="w-5 h-5 border-mutedText cursor-pointer"
          type="checkbox"
          id={"breakfast"}
          checked={breakfast}
          onChange={() => dispatch(toggleBreakfast("breakfast"))}
          // disabled={disabled}
        />
        <label htmlFor="breakfast" className="cursor-pointer">
          want to add breakfast for {formatCurrency(optionalBrackfastPrice)} ?
        </label>
      </div>
      {/* <div className="p-2 sm:p-3 flex cursor-pointer items-center gap-x-2 rounded-lg my- bg-borderLightGray mt-3">
        <input
          className="w-5 h-5 border-mutedText"
          type="checkbox"
          id={"isPaid"}
          checked={isPaid}
          onChange={() => dispatch(toggleBreakfast("isPaid"))}
          // disabled={disabled}
        />
        <label htmlFor="isPaid">
          confirm that {"mahmoud"} has paid the total price of{" "}
          {!breakfast
            ? formatCurrency(regularPrice)
            : `${formatCurrency(
                regularPrice + optionalBrackfastPrice
              )} (${formatCurrency(regularPrice)} + ${formatCurrency(
                optionalBrackfastPrice
              )})`}
        </label>
      </div> */}
    </div>
  );
};

export default RoomConfirmationInputs;
