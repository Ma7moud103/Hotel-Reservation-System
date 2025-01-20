import { MutableRefObject } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import UseOutSideEffect from "../hooks/UseOutSideEffect";
import { logout } from "../redux/AuthSlice";
import { AppDispatch } from "../store";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface IProps {
  handleClose: () => void;
}
const Logout = ({ handleClose }: IProps) => {
  const ref: MutableRefObject<HTMLDivElement | null> =
    UseOutSideEffect(handleClose);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
        <h3>Logout</h3>
        <p className="text-[1.05rem]">Are you sure that you want to logout?</p>
      </header>

      <div className="flex items-center w-full gap-x-2">
        <Button
          onClick={() => {
            dispatch(logout());
            navigate("login");
            handleClose();
          }}
          className="w-1/2 px-4 py-2 mt-4 text-white rounded "
        >
          Logout
        </Button>
        <Button
          onClick={handleClose}
          className="w-1/2 mt-4 text-white bg-gray-300 "
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Logout;
