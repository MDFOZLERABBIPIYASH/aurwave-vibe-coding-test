import { type ClassValue, clsx } from "clsx";
import { twMerge } from "@/lib/tailwind-merge";

/**
 * Combine class names with clsx, then resolve Tailwind conflicts with tailwind-merge.
 *
 * The `twMerge` instance is configured to recognize Aurwave's custom
 * `text-X-foreground` color pairs — see `@/lib/tailwind-merge`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
