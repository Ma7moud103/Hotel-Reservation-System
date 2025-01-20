import { useDispatch, useSelector } from "react-redux";
import { toggleBreakfast } from "../redux/RoomsSlice";
import { formatCurrency } from "../utils/Vars";
import { AppDispatch, RootState } from "../store";
interface IProps {
  breakfastPrice: number;
}
const RoomConfirmationInputs = ({ breakfastPrice }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { breakfast } = useSelector((state: RootState) => state.rooms);

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
          want to add breakfast for {formatCurrency(breakfastPrice)} ?
        </label>
      </div>
    </div>
  );
};

export default RoomConfirmationInputs;
