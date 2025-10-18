import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const NO_DATA = "-";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
