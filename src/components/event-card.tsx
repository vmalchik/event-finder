import { EventoEvent } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  event: EventoEvent;
};

// const event ={
//   id: 1,
//   name: 'DJ Practice Session',
//   slug: 'dj-practice-session',
//   city: 'Austin',
//   location: 'Austin Music Hall',
//   date: '2030-10-12T00:00:00.000Z',
//   organizerName: 'DJ Inc.',
//   imageUrl: 'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
//   description: "Join us for an immersive DJ practice session at the DJ Beats Workshop! Whether you're a beginner aspiring to spin the decks or an experienced DJ looking to refine your skills, this event is tailored just for you. Dive into the world of beats, mixes, and electronic rhythms under the guidance of seasoned DJs and music producers. Showcase your skills during our open decks session. Share your favorite tracks, experiment with live remixing, and receive applause and feedback from a supportive audience."
// }

export default function EventCard({ event }: EventCardProps) {
  // get day of the month with leading 0
  const dayOfMonth = new Date(event.date).toLocaleString("en-US", {
    day: "2-digit",
  });
  const month = new Date(event.date).toLocaleString("en-US", {
    month: "short",
  });
  return (
    // control image height with CSS capping height at 60%  and width at 100% to maintain aspect ratio
    // rounded-xl for rounded corners and use overflow-hidden to prevent image from not having rounded corners at top of the card
    // flex-1 to make card take 1 portion of the available space but allowed to grow to max-width of 500px
    // basis will set minimum width of the card
    <Link
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      href={`/event/${event.slug}`}
    >
      <section className="flex flex-col relative w-full h-full bg-white/[3%] rounded-xl overflow-hidden transition hover:scale-105 active:scale-[1.02] cursor-pointer">
        {/* height and width used to prevent layout shift */}
        <Image
          src={event.imageUrl}
          alt={event.name}
          height={280}
          width={500}
          className="h-[60%] object-fill w-full"
        />
        {/* items-center for horizontal centring */}
        {/* justify-center for vertical centering */}
        <div className="flex flex-col flex-1 items-center justify-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">By {event.organizerName}</p>
          <p className="italic text-white/50 mt-4">{event.location}</p>
        </div>
        {/* position date at top left corner of the card */}
        <section className="absolute flex flex-col justify-center items-center left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md">
          <p className="text-xl font-bold -mb-[5px]">{dayOfMonth}</p>
          <p className="text-xs uppercase text-accent">{month}</p>
        </section>
      </section>
    </Link>
  );
}
