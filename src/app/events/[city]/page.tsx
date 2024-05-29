import H1 from "@/components/h1";
import EventsListContainer from "@/components/events-list-container";
import { capitalize } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

type Props = {
  params: {
    city: "all" | string;
  };
};

type EventsPageProps = Props & {
  searchParams: Record<string, string | string[] | undefined>;
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

// Helper function to transform null to undefined
const nullToUndefined = z
  .any()
  .transform((val) => (val === null ? undefined : val));

// Define the schema with null-to-undefined transformation
const pageNumberSchema = nullToUndefined.pipe(
  z.coerce.number().int().positive().optional()
);

// params is anything that comes after the city in the URL /events/[city]
export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const { city } = params;

  // Create a new instance of URLSearchParams with searchParams
  const urlSearchParams = new URLSearchParams(
    searchParams as Record<string, string>
  );
  const pageString = urlSearchParams.get("page");
  // // Extract page from searchParams or default to 1 if undefined, 0, or not a valid number
  // const page =
  //   pageString && parseInt(pageString, 10) > 0 ? parseInt(pageString, 10) : 1;
  const parsedPage = pageNumberSchema.safeParse(pageString);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }
  const page = parsedPage.data ?? 1;
  const lowercasedCity = city.toLocaleLowerCase();
  const capitalizedCity = capitalize(city);

  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <H1 className={"mb-28"}>
        {lowercasedCity === "all"
          ? "All Events"
          : `Events in  ${capitalizedCity}`}
      </H1>
      {/* pass key to suspense to trigger loading indicator */}
      <Suspense key={`${city}_${page}`} fallback={<Loading />}>
        {/* stream-in results into the page */}
        <EventsListContainer city={lowercasedCity} page={page} />
      </Suspense>
    </main>
  );
}
