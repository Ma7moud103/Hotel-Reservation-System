import { MutableRefObject } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import UseOutSideEffect from "../hooks/UseOutSideEffect";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  handleClose: () => void;
  roomId: number;
}
const Cancelation = ({ handleClose, roomId }: IProps) => {
  const ref: MutableRefObject<HTMLDivElement | null> =
    UseOutSideEffect(handleClose);
  const { reservedId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate, isPending: isCheckingout } = useMutation({
    mutationFn: () => deleteBooking(Number(reservedId), Number(roomId)),
    onSuccess: () => {
      toast.success("you cancel your reservations successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      handleClose();
      navigate("/reservations");
    },
    onError: () => toast.error("there was an error while Canselation ")
  });

  return (
    <div
      ref={ref}
      className="bg-mainBg px-2 sm:px-4 relative shadow-md w-[90%] sm:w-[30rem] md:w-[35rem] py-6 rounded-xl"
    >
      <button
        onClick={handleClose}
        type="reset"
        className="absolute top-3 end-3"
      >
        <RiCloseCircleFill className="text-red-600 text-[1.8rem] transition-colors" />
      </button>
      <header className="text-center mt-4 space-y-2 text-[1.3rem] text-bodyText">
        <h3>Booking Room</h3>
        <p className="text-[1.05rem]">
          Are you sure that you want to delete your reservation
        </p>
      </header>

      <div className="flex items-center gap-x-2 w-full">
        <Button
          onClick={() => mutate()}
          disabled={isCheckingout}
          className=" text-white py-2 px-4 rounded mt-4 w-1/2"
        >
          Delete
        </Button>
        <Button
          onClick={() => handleClose()}
          type="reset"
          className=" text-white w-1/2 bg-gray-300 mt-4"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Cancelation;
