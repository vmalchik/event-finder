import H1 from "@/components/h1";
import { EventoEvent } from "@prisma/client";
import { getEvent } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

// NextJS function to generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const event: EventoEvent = await getEvent(slug);
  const metadata: Metadata = {
    title: `Event: ${event?.name}`,
  };
  return metadata;
}

// NextJS used with dynamic routes to pre-render pages at build time (e.g. because certain pages are popular)
// This will generate static pages for the most popular [event] pages
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
        {/* fill ensures the image fills the container */}
        {/* srcSet ensures the image optimization and responsiveness */}
        {/* need to specify how large image will be on different view-ports */}
        {/* use foreground image in background image but blurred to create a good effect that matches design style and color */}
        {/* take up 100% of view-port for screen-sizes up to 1280; max image size to be 1280px for view-ports wider than 1280px */}
        {/* quality prop helps further optimize loading and displaying the image. since we blur the image we can lower the quality */}
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
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-white/50 border-2 object-cover"
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
  // leading - space between lines
  // tracking - space between characters
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
};
