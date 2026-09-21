import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Required by shadcn-registry components (Vengeance UI included).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
