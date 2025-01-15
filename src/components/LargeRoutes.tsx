import { NavLink } from "react-router-dom";
import { routes } from "../utils/Vars";

const LargeRoutes = () => {
  return (
    <>
      <ul className="items-center hidden sm:flex gap-x-5 sm:self-center">
        {routes.slice(0, 2).map((route) => (
          <li key={route.href} className="text-[1.2rem]">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-x-2 text-softOrange"
                  : "flex items-center gap-x-2"
              }
              to={route.href}
            >
              <route.icon size={22} />
              <span>{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="items-center hidden sm:flex gap-x-3 sm:self-center">
        {routes.slice(2, 4).map((route) => (
          <li key={route.href}>
            <NavLink className={"flex items-center gap-x-2"} to={route.href}>
              <span>{route.name}</span>
              <route.icon size={22} />
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LargeRoutes;
