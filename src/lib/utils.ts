import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventoEvent } from "@prisma/client";
import prisma from "./db";
import { notFound } from "next/navigation";
import { EventoResponse } from "./types";

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

const MAX_RECORDS_PER_PAGE = 6;
export async function getEvents(
  city: string,
  page = 1
): Promise<EventoResponse> {
  // using undefined will allow us to fetch all events
  const normalizedCity = city === "all" ? undefined : capitalize(city);
  const events: EventoEvent[] = await prisma.eventoEvent.findMany({
    where: {
      city: normalizedCity,
    },
    orderBy: { date: "asc" },
    take: MAX_RECORDS_PER_PAGE,
    skip: (page - 1) * MAX_RECORDS_PER_PAGE,
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

export async function getEvent(slug: string) {
  const event: EventoEvent | null = await prisma.eventoEvent.findUnique({
    where: { slug },
  });

  if (!event) {
    return notFound();
  }
  return event;
}
