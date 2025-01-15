import { IconType } from "react-icons";
import { FaIdCard } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { RiLoginBoxFill, RiLogoutBoxRFill } from "react-icons/ri";

interface Route {
  name: string;
  href: string;
  icon: IconType; // Type for react-icons components
}

const routes: Route[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IoMdHome
  },
  {
    name: "Reservations",
    href: "/reservations",
    icon: FaIdCard
  },
  {
    name: "Login",
    href: "/login",
    icon: RiLoginBoxFill
  },
  {
    name: "Signup",
    href: "/signup",
    icon: RiLogoutBoxRFill
  }
];

export const PAGE_SIZE = 5;

export { routes };

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function handleText(input: string, max: number): string {
  const words = input.split(/\s+/);
  if (words.length > max) {
    return words.slice(0, max).join(" ") + "....";
  }
  return input;
}
