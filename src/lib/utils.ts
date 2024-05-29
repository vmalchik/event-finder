import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventoEvent } from "@prisma/client";
import prisma from "./db";

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

export async function getEvents(city: string) {
  // const response = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
  //   // {
  //   //   next: {
  //   //     revalidate: MAX_REVALIDATION_WAIT_TIME, // NextJS feature to revalidate the data every 5 minutes
  //   //   },
  //   //   // cache: "no-cache", // NextJS feature to disable server side caching for this request
  //   // }
  // );
  // const events: EventoEvent[] = await response.json();
  // using undefined will allow us to fetch all events
  const normalizedCity = city === "all" ? undefined : capitalize(city);
  const events: EventoEvent[] = await prisma.eventoEvent.findMany({
    where: { city: normalizedCity },
  });
  return events;
}

export async function getEvent(slug: string) {
  // const response = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  // );

  // const event: EventoEvent = await response.json();
  const event: EventoEvent = await prisma.eventoEvent.findUnique({
    where: { slug },
  });
  return event;
}
