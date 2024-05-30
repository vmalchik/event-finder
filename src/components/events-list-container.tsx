import React from "react";
import EventsList from "./events-list";
import { getEvents } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";
import { EventoResponse } from "@/lib/types";
import NoEvents from "./no-events-found";
import { MAX_EVENTO_RECORDS_PER_PAGE } from "@/lib/constants";

type EventListContainerProps = {
  city: string;
  page?: number;
};

export default async function EventListContainer({
  city,
  page = 1,
}: EventListContainerProps) {
  const response: EventoResponse = await getEvents(city, page);
  const { events, totalCount } = response;
  const maxPages = Math.ceil(totalCount / MAX_EVENTO_RECORDS_PER_PAGE);
  return (
    <>
      {events.length === 0 && <NoEvents />}
      {events.length > 0 && (
        <>
          <EventsList events={events} />
          <div className="w-full max-w-[1100px] px-[20px] mt-10">
            <PaginationControls page={page} maxPages={maxPages} />
          </div>
        </>
      )}
    </>
  );
}
