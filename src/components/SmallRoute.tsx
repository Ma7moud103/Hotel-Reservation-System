import { NavLink } from "react-router-dom";

interface IProps {
  href: string;
  name: string;
  setToggleMenu: () => void;
}
const SmallRoute = ({ href, name, setToggleMenu }: IProps) => {
  return (
    <li
      key={href}
      className="w-full text-center my-1 text-[1.1rem] uppercase   "
    >
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "shadow-sm px-3 py-2 rounded-xl text-black bg-white font-bold   "
            : "font-semibold"
        }
        onClick={setToggleMenu}
        to={href}
      >
        <span>{name}</span>
      </NavLink>
    </li>
  );
};

export default SmallRoute;
