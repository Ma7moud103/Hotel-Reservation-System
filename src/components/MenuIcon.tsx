import { Dispatch, SetStateAction } from "react";
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

interface IProps {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}
const MenuIcon = ({ setToggleMenu, toggleMenu }: IProps) => {
  return (
    <span className="justify-end cursor-pointer md:hidden">
      {!toggleMenu ? (
        <IoMenu
          className="transition-all hover:shadow-lg"
          onClick={() => setToggleMenu(true)}
          size={22}
        />
      ) : (
        <MdOutlineClose
          className="transition-all hover:shadow-lg"
          onClick={() => setToggleMenu(false)}
          size={22}
        />
      )}
    </span>
  );
};

export default MenuIcon;
