import H1 from "@/components/H1";

type EventsPageProps = {
  params: {
    city: string | "all";
  };
};

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// params is anything that comes after the city in the URL /events/[city]
export default function EventsPage({ params }: EventsPageProps) {
  const { city } = params;
  const lowercasedCity = city.toLocaleLowerCase();
  const capitalizedCity = capitalizeFirstLetter(city);

  return (
    <main className="flex flex-col items-center py-24 px-[20px]">
      <H1>
        Events in {lowercasedCity === "all" ? "All Events" : capitalizedCity}
      </H1>
    </main>
  );
}
