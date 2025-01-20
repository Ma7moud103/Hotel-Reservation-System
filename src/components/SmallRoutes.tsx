import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/AuthSlice";
import { AppDispatch } from "../store";
import SmallRoute from "./SmallRoute";

interface IProps {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}
const SmallRoutes = ({ toggleMenu, setToggleMenu }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const handleToggleMenu = () => setToggleMenu(false);

  const isAuthorized = token !== null ? true : false;
  return (
    <ul
      className={`${
        !toggleMenu ? "h-0 opacity-0 z-[-1]" : token ? "h-[8rem]" : "h-[11rem]"
      }  absolute start-0 pt-3 top-[100%] bg-inherit w-full transition-all z-10 flex flex-col gap-y-2 items-center  md:hidden`}
    >
      <SmallRoute
        name="Dashboard"
        href="/dashboard"
        setToggleMenu={handleToggleMenu}
      />
      {isAuthorized && (
        <SmallRoute
          name="Reservations"
          href="/reservations"
          setToggleMenu={handleToggleMenu}
        />
      )}
      {isAuthorized ? (
        <li>
          <button
            className="font-semibold text-center text-[1.1rem] uppercase"
            onClick={() => {
              dispatch(logout());
              setToggleMenu(false);
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <SmallRoute
            name="Login"
            href="/login"
            setToggleMenu={handleToggleMenu}
          />
          <SmallRoute
            name="SignUp"
            href="/signup"
            setToggleMenu={handleToggleMenu}
          />
        </>
      )}
    </ul>
  );
};

export default SmallRoutes;
