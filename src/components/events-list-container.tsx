import React from "react";
import EventsList from "./events-list";
import { EventoEvent } from "@prisma/client";
import { getEvents } from "@/lib/utils";

type EventListContainerProps = {
  city: string;
};

// const MAX_REVALIDATION_WAIT_TIME = 300; // 5 minutes

export default async function EventListContainer({
  city,
}: EventListContainerProps) {
  // data fetched on server side since this is a server component
  // benefits:
  // - better SEO
  // - faster initial load time
  // - data is fetched on the server and not the client
  // - data is not exposed to the client
  // - data is not bundled with the client improving performance
  const events: EventoEvent[] = await getEvents(city);

  return <EventsList events={events} />;
}
