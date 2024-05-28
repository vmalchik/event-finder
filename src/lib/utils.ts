import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, resolving conflicts using Tailwind Merge.
 *
 * This utility function leverages `clsx` to handle conditional and array class names, and `twMerge`
 * to merge Tailwind CSS classes, ensuring no conflicts occur (e.g., when different class names
 * for the same property are provided).
 *
 * @example
 * // Basic usage with string class names
 * cn('bg-red-500', 'text-white'); // 'bg-red-500 text-white'
 *
 * @example
 * // Conditional class names
 * cn('bg-red-500', { 'text-white': true, 'text-black': false }); // 'bg-red-500 text-white'
 *
 * @example
 * // Handling arrays of class names
 * cn(['bg-red-500', 'text-white'], 'p-4'); // 'bg-red-500 text-white p-4'
 *
 * @example
 * // Resolving Tailwind CSS conflicts
 * cn('bg-red-500', 'bg-blue-500'); // 'bg-blue-500' (the last conflicting class wins)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// NextJS will cache pages by default in the browser. This function helps demo the loading state.
export async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
