import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  href: string;
  name: string;
  children: ReactNode;
}
const Route = ({ children, href, name }: IProps) => {
  return (
    <li key={href} className="text-[1.1rem] font-semibold">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-x-2  px-3 py-2 rounded-xl text-black bg-white  "
            : "flex items-center gap-x-2"
        }
        to={href}
      >
        {children}
        <span>{name}</span>
      </NavLink>
    </li>
  );
};

export default Route;
