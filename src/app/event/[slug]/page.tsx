import H1 from "@/components/h1";
import { EventoEvent } from "@prisma/client";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const event: EventoEvent = await getEvent(slug);
  const metadata: Metadata = {
    title: `Event: ${event?.name}`,
  };
  return metadata;
}

export async function generateStaticParams() {
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}

export default async function EventPage({ params }: Props) {
  const { slug } = params;
  const event: EventoEvent = await getEvent(slug);

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          fill
          // priority - image is not critical to the page load
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover w-full h-full blur-3xl z-0"
          src={event.imageUrl}
          alt={event.name}
        />
        <div className="relative z-1 flex flex-col lg:flex-row gap-6 lg:gap-x-14">
          <Image
            priority
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={200}
            className="rounded-xl border-white/50 border-2 object-cover max-w-[300px] max-h-[200px]"
          />
          <div className="flex flex-col">
            <p className="text-white/75">{eventDate}</p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize rounded-md border-white/10 border-2 py-2 bg-blur mt-5 lg:mt-auto state-effects">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

type SectionProps = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return <section className="mb-12">{children}</section>;
};

const SectionHeading = ({ children }: SectionProps) => {
  return <h2 className="text-2xl mb-8">{children}</h2>;
};

const SectionContent = ({ children }: SectionProps) => {
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
};
