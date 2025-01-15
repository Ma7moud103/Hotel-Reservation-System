import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../utils/Vars";

interface IProps {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}
const SmallRoutes = ({ toggleMenu, setToggleMenu }: IProps) => {
  return (
    <ul
      className={`${
        !toggleMenu ? "h-0 opacity-0 z-[-1]" : "h-[10rem]"
      }  absolute start-0 top-[100%] bg-inherit w-full transition-all z-10 flex flex-col gap-y-2 items-center  sm:hidden`}
    >
      {routes.map((route) => (
        <li key={route.href} className="w-full text-center ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-softOrange font-bold text-[1.07rem] "
                : "font-semibold"
            }
            onClick={() => setToggleMenu(false)}
            to={route.href}
          >
            <span>{route.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SmallRoutes;
