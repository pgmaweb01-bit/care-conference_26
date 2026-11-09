import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HONORIFICS = new Set(["hon", "dr", "prof", "alhaji", "alhaja", "mr", "mrs", "ms", "chief"]);

/** Two-letter monogram for speakers whose headshot hasn't been provided yet. */
export function speakerInitials(name: string): string {
  const words = name
    .replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0 && !HONORIFICS.has(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}
