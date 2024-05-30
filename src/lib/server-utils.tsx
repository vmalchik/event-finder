import "server-only";
import { EventoEvent } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { MAX_EVENTO_RECORDS_PER_PAGE } from "./constants";
import prisma from "./db";
import { EventoResponse } from "./types";
import { capitalize } from "./utils";

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
