import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { EventoEvent } from "@/lib/types";

type EventsPageProps = {
  params: {
    city: "all" | string;
  };
};

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// params is anything that comes after the city in the URL /events/[city]
export default async function EventsPage({ params }: EventsPageProps) {
  const { city } = params;
  const lowercasedCity = city.toLocaleLowerCase();
  const capitalizedCity = capitalizeFirstLetter(city);

  // data fetched on server side since this is a server component
  // benefits:
  // - better SEO
  // - faster initial load time
  // - data is fetched on the server and not the client
  // - data is not exposed to the client
  // - data is not bundled with the client improving performance
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${lowercasedCity}`
  );
  const events: EventoEvent[] = await response.json();

  console.log(events[0]);

  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <H1>
        {lowercasedCity === "all"
          ? "All Events"
          : `Events in  ${capitalizedCity}`}
      </H1>

      <EventsList events={events} />
    </main>
  );
}
