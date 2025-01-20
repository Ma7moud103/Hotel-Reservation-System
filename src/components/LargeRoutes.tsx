import { FaIdCard, FaRegUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { RiLoginBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/AuthSlice";
import { AppDispatch } from "../store";
import Route from "./Route";

const LargeRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  return (
    <>
      <ul className="items-center hidden md:flex gap-x-5 md:self-center ">
        <Route name="Dashboard" href="/dashboard">
          <IoMdHome size={22} />
        </Route>
        {token !== null && (
          <Route name="Reservations" href="/reservations">
            <FaIdCard size={22} />
          </Route>
        )}
      </ul>

      {token === null ? (
        <ul className="items-center hidden md:flex gap-x-5 md:self-center ">
          <Route name="Login" href="/login">
            <RiLoginBoxFill size={22} />
          </Route>
          <Route name="SignUP" href="/signup">
            <FaRegUser size={22} />
          </Route>
        </ul>
      ) : (
        <ul className="items-center hidden md:flex gap-x-5 md:self-center">
          <li className="font-semibold text-[1.1rem]">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default LargeRoutes;
