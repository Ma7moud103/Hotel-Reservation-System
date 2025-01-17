import { useState } from "react";
import MenuIcon from "./MenuIcon";
import SmallRoutes from "./SmallRoutes";
import LargeRoutes from "./LargeRoutes";

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 text-white border-b min-h-14 bg-accentGold border-b-accentGold md:min-h-16">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl  md:capitalize md:text-[1.4rem] font-bold uppercase ">
          Hotel Reservation System
        </h1>
        <MenuIcon setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
        <LargeRoutes />
      </div>

      <SmallRoutes setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navigation;
