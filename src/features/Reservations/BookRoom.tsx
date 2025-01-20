import { Form, Formik } from "formik";
import { MutableRefObject } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import UseOutSideEffect from "../../hooks/UseOutSideEffect";
import { ICheckinData } from "../../interface/IRoom";
import {
  createBooking,
  handleRange,
  toggleBreakfast
} from "../../redux/RoomsSlice";
import { AppDispatch, RootState } from "../../store";
import { UseRoom } from "../Rooms/UseRoom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  handleClose: () => void;
  totalPrice: number;
  numberOfNights: number;
}
const BookRoom = ({ handleClose, totalPrice, numberOfNights }: IProps) => {
  const guestId = sessionStorage.getItem("guestId");
  const navigate = useNavigate();
  const { roomId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const ref: MutableRefObject<HTMLDivElement | null> =
    UseOutSideEffect(handleClose);

  const { range, breakfast } = useSelector((state: RootState) => state.rooms);

  const { room } = UseRoom();

  if (!room) return null;

  const startDate = range.from
    ? new Date(range.from.getTime() + 24 * 60 * 60 * 1000)
    : undefined;
  const endDate = range.to
    ? new Date(range.to.getTime() + 24 * 60 * 60 * 1000)
    : undefined;

  const initialValues: ICheckinData = {
    startDate: startDate,
    endDate: endDate,
    isBreakfast: breakfast,
    totalPrice: totalPrice,
    roomId: Number(roomId),
    userId: String(guestId)
  };

  const handleSubmit = async (values: ICheckinData, resetForm: () => void) => {
    try {
      await dispatch(createBooking(values)).unwrap();
      navigate("/reservations");
      resetForm();
      toast.success("Booking successfully created!");
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, resetForm).finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
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
            <header>
              <h1 className="text-center mt-4 text-[1.3rem] text-bodyText">
                Booking Room
              </h1>
              <p className="text-center mt-1 text-[1rem] text-bodyText capitalize">
                You will Book this Room for {numberOfNights} nights
              </p>
            </header>

            <div className="flex items-center gap-x-2 sm:w-full">
              <Button
                disabled={isSubmitting}
                className="px-4 py-2 mt-4 text-white rounded sm:w-1/2"
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
                className="mt-4 text-white bg-gray-300 sm:w-1/2"
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
