import H1 from "@/components/h1";
import EventsListContainer from "@/components/events-list-container";
import { capitalize } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";

type Props = {
  params: {
    city: "all" | string;
  };
};

// NextJS function to generate metadata for the page
export function generateMetadata({ params }: Props): Metadata {
  const { city } = params;
  const capitalizedCity = capitalize(city);
  const metadata: Metadata = {
    title: `${city === "all" ? "All Events" : `Events in ${capitalizedCity}`}`,
  };
  return metadata;
}

// params is anything that comes after the city in the URL /events/[city]
export default async function EventsPage({ params }: Props) {
  const { city } = params;
  const lowercasedCity = city.toLocaleLowerCase();
  const capitalizedCity = capitalize(city);

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
