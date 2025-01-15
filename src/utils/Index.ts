import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function TailwindCMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
