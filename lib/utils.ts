import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertMillisToSeconds = (milliseconds: number) => {
  const date = new Date(milliseconds);
  let seconds: string = `${date.getSeconds()}`.padStart(2, "0");
  return `${date.getMinutes()}:${seconds}`;
};
