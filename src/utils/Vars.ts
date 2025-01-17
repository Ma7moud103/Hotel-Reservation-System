import { differenceInDays, formatDistance, parseISO } from "date-fns";
import { IconType } from "react-icons";
import { FaIdCard } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { RiLoginBoxFill, RiLogoutBoxRFill } from "react-icons/ri";

interface Route {
  name: string;
  href: string;
  icon: IconType;
}

export const token = sessionStorage.getItem("token");
export function handleUserName(email: string): string {
  if (!email.includes("@")) {
    throw new Error("Invalid email address");
  }

  const [username] = email.split("@");
  return username.replace(/[0-9]/g, "");
}

export const routes: Route[] = [
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

export const PAGE_SIZE = 3;
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phoneRegex = /^(?:\+20)?(010|011|012|015)[0-9]{8}$/;

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

export const subtractDates = (dateStr1: string, dateStr2: string): number => {
  const parsedDate1 = parseISO(dateStr1);
  const parsedDate2 = parseISO(dateStr2);
  return differenceInDays(parsedDate1, parsedDate2);
};

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true
  })
    .replace("about ", "")
    .replace("in", "In");

export const getToday = (options: { end?: boolean } = {}): string => {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
