import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/AuthSlice";
import { AppDispatch, RootState } from "../store";
import { routes } from "../utils/Vars";

interface IProps {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}
const SmallRoutes = ({ toggleMenu, setToggleMenu }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state: RootState) => state.auth);
  const authorizedRoutes = !isAuthorized ? routes : routes.slice(0, 2);
  return (
    <ul
      className={`${
        !toggleMenu
          ? "h-0 opacity-0 z-[-1]"
          : isAuthorized
          ? "h-[8rem]"
          : "h-[11rem]"
      }  absolute start-0 pt-3 top-[100%] bg-inherit w-full transition-all z-10 flex flex-col gap-y-2 items-center  md:hidden`}
    >
      {authorizedRoutes.map((route) => (
        <li
          key={route.href}
          className="w-full text-center text-[1.1rem] uppercase   "
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "shadow-md px-3 py-2 rounded-xl bg-borderLightGray font-bold   "
                : "font-semibold"
            }
            onClick={() => setToggleMenu(false)}
            to={route.href}
          >
            <span>{route.name}</span>
          </NavLink>
        </li>
      ))}

      {isAuthorized && (
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
      )}
    </ul>
  );
};

export default SmallRoutes;
