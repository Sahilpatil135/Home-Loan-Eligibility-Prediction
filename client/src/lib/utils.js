import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

//Temp
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
