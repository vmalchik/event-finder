import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventoEvent } from "@prisma/client";
import prisma from "./db";
import { notFound } from "next/navigation";
import { EventoResponse } from "./types";
import { MAX_EVENTO_RECORDS_PER_PAGE } from "./constants";
import { unstable_cache } from "next/cache";

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

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// NextJS will cache pages by default in the browser. This function helps demo the loading state.
export async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// fetch API by default caches results in "data cache" so network requests are optimized and not repeated (can be opted-out of)
// we lose this when we use the Prisma ORM to fetch data; by default Prisma does not cache results
// we can use the unstable_cache function to cache the results of the Prisma query or any other ORM
// reduces number of hits on the database
export const getEvents = unstable_cache(
  async (city: string, page = 1): Promise<EventoResponse> => {
    // using undefined will allow us to fetch all events
    const normalizedCity = city === "all" ? undefined : capitalize(city);
    const events: EventoEvent[] = await prisma.eventoEvent.findMany({
      where: {
        city: normalizedCity,
      },
      orderBy: { date: "asc" },
      take: MAX_EVENTO_RECORDS_PER_PAGE,
      skip: (page - 1) * MAX_EVENTO_RECORDS_PER_PAGE,
    });

    const totalCount = await prisma.eventoEvent.count({
      where: {
        city: normalizedCity,
      },
    });
    return {
      totalCount,
      events,
    };
  }
);

export const getEvent = unstable_cache(async (slug: string) => {
  const event: EventoEvent | null = await prisma.eventoEvent.findUnique({
    where: { slug },
  });

  if (!event) {
    return notFound();
  }
  return event;
});
// export async function getEvent(slug: string) {
//   const event: EventoEvent | null = await prisma.eventoEvent.findUnique({
//     where: { slug },
//   });

//   if (!event) {
//     return notFound();
//   }
//   return event;
// }
