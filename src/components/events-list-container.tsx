import React from "react";
import EventsList from "./events-list";
import { EventoEvent } from "@/lib/types";

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
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
    // {
    //   next: {
    //     revalidate: MAX_REVALIDATION_WAIT_TIME, // NextJS feature to revalidate the data every 5 minutes
    //   },
    //   // cache: "no-cache", // NextJS feature to disable server side caching for this request
    // }
  );
  const events: EventoEvent[] = await response.json();

  return <EventsList events={events} />;
}
