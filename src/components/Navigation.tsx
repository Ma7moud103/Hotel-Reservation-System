import { useState } from "react";
import MenuIcon from "./MenuIcon";
import SmallRoutes from "./SmallRoutes";
import LargeRoutes from "./LargeRoutes";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 text-white border-b min-h-14 bg-accentGold border-b-accentGold md:min-h-16">
      <div className="flex items-center justify-between w-full">
        <Link
          to={"/dashboard"}
          className="text-xl cursor-pointer  md:capitalize md:text-[1.4rem] font-bold uppercase "
        >
          Hotel Reservation System
        </Link>
        <MenuIcon setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
        <LargeRoutes />
      </div>

      <SmallRoutes setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navigation;
