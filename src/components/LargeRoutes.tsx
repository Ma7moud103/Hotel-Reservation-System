import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../utils/Vars";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../redux/AuthSlice";

const LargeRoutes = () => {
  const { isAuthorized } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <>
      <ul className="items-center hidden md:flex gap-x-5 md:self-center">
        {routes.slice(0, 2).map((route) => (
          <li key={route.href} className="text-[1.1rem] font-semibold">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-x-2 shadow-md px-3 py-2 rounded-xl bg-borderLightGray font-bold"
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
      {!isAuthorized ? (
        <ul className="items-center hidden md:flex gap-x-5 md:self-center">
          {routes.slice(2, 4).map((route) => (
            <li key={route.href} className="text-[1.1rem] font-semibold">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-x-2 shadow-md px-3 py-2 rounded-xl bg-borderLightGray font-bold"
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
