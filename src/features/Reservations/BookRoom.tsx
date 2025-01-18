import { MutableRefObject } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import UseOutSideEffect from "../../hooks/UseOutSideEffect";
import { UseRoom } from "../Rooms/UseRoom";
import { differenceInDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Formik, Form } from "formik";
import { ICheckinData } from "../../interface/IRoom";
import Button from "../../components/Button";
import {
  createBooking,
  handleRange,
  toggleBreakfast
} from "../../redux/RoomsSlice";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { guestId } from "../../utils/Vars";

interface IProps {
  handleClose: () => void;
}
const BookRoom = ({ handleClose }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const ref: MutableRefObject<HTMLDivElement | null> =
    UseOutSideEffect(handleClose);

  const { range, breakfast, isPaid } = useSelector(
    (state: RootState) => state.rooms
  );

  const { room } = UseRoom();

  if (!room) return null;
  const {
    totalPrice,
    numGuests,
    numNights,
    rooms: { discount, id, regularPrice }
  } = room;

  const startDate = range.from ? range.from : new Date();
  const endDate = range.to ? range.to : new Date();

  const nights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (totalPrice - discount);

  const initialValues: ICheckinData = {
    extrasPrice: 0,
    guestID: String(guestId),
    hasBreakfast: breakfast,
    isPaid: isPaid,
    numGuests: numGuests,
    observations: "",
    status: "checked-in",
    totalPrice: cabinPrice,
    cabinId: id,
    regularPrice: regularPrice,
    numNights: nights,
    endDate: endDate,
    startDate: startDate
  };

  const handleSubmit = async (values: ICheckinData) => {
    try {
      await dispatch(createBooking(values)).unwrap();
      toast.success("Booking successfully created!");
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values).finally(() => setSubmitting(false));
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <div
          ref={ref}
          className="bg-mainBg px-2 sm:px-4 relative shadow-md w-[90%] sm:w-[30rem] md:w-[35rem] py-6 rounded-xl"
        >
          <Form>
            <button
              onClick={handleClose}
              type="reset"
              className="absolute top-3 end-3"
            >
              <RiCloseCircleFill className="text-red-600 text-[1.8rem] transition-colors" />
            </button>
            <header className="text-center mt-4 text-[1.3rem] text-bodyText">
              Booking Room
            </header>

            <div className="my-4 space-y-3">
              <div className="w-full flex flex-col gap-y-3 sm:flex-row sm:items-center sm:gap-x-3">
                <Input name="numNights" label="Num Nights" type="number" />
                <Input name="numGuests" label="Num Guests" type="number" />
              </div>
              <div className="space-y-2">
                <label>Observations</label>
                <textarea
                  className="w-full px-2 shadow-sm rounded-xl bg-white outline-accentGold py-2"
                  name="observations"
                  value={values.observations ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-2 sm:w-full">
              <Button
                disabled={isSubmitting}
                className=" text-white py-2 px-4 rounded mt-4 sm:w-1/2"
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  dispatch(handleRange({ from: undefined, to: undefined }));
                  dispatch(toggleBreakfast("reset"));
                }}
                type="reset"
                className=" text-white sm:w-1/2 bg-gray-300 mt-4"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default BookRoom;
