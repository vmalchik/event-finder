import H1 from "@/components/h1";
import EventsListContainer from "@/components/events-list-container";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";

type EventsPageProps = {
  params: {
    city: "all" | string;
  };
};

// params is anything that comes after the city in the URL /events/[city]
export default async function EventsPage({ params }: EventsPageProps) {
  const { city } = params;
  const lowercasedCity = city.toLocaleLowerCase();
  const capitalizedCity = capitalizeFirstLetter(city);

  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <H1 className={"mb-28"}>
        {lowercasedCity === "all"
          ? "All Events"
          : `Events in  ${capitalizedCity}`}
      </H1>
      <Suspense fallback={<Loading />}>
        {/* stream-in results into the page */}
        <EventsListContainer city={lowercasedCity} />
      </Suspense>
    </main>
  );
}
