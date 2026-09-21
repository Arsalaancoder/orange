import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format page title for SEO dynamically
 */
export function formatPageTitle(title?: string): string {
  if (!title) return "Orange Group of Nursing & Paramedical Colleges";
  return `${title} | Orange Group of Nursing & Paramedical Colleges`;
}
