"use client";

import { EventoEvent } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type EventCardProps = {
  event: EventoEvent;
};

const MotionLink = motion(Link);

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  // scrollYProgress allows us to measure how far we've scrolled relative to the target element
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 1   - when top of the target meets the top of the viewport thats when animation should start
    // 1.5 1 - when bottom of the target meets the bottom of the viewport thats when animation should end
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

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
    <MotionLink
      ref={ref}
      className="flex-1 basis-80 h-[380px] max-w-[500px] state-effects"
      href={`/event/${event.slug}`}
      style={{
        // TypeScript cannot infer that this is a Link component due to framer-motion wrapping it
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      // fix initial framer-motion animation display issue when data renders
      initial={{ scale: 0.8, opacity: 0 }}
    >
      <section className="flex flex-col relative w-full h-full bg-white/[3%] rounded-xl overflow-hidden">
        {/* Notes: */}
        {/* 216 - height and width used to prevent layout shift */}
        {/* https://www.youtube.com/watch?v=XL3gth5Bmjw */}

        {/* Original */}
        {/* <Image
          src={event.imageUrl}
          alt={event.name}
          height={280}
          width={500}
          className="h-[60%] w-auto object-cover"
        /> */}

        {/* New */}
        {/* div will take care of image sizing */}
        {/* fill sets absolute positioning on the image */}
        <div className="relative w-full h-[60%]">
          <Image
            fill
            src={event.imageUrl}
            alt={event.name}
            className="object-cover"
            // When the viewport width is 758 pixels or less. The image will be 100% of the viewport width.
            // When the viewport width is 1120 pixels or less. The image will be 50% of the viewport width.
            // When the viewport width is 1280 pixels or greater. The image will be 33% of the viewport width.
            sizes="(max-width: 758px) 100vw, (max-width: 1120px) 50vw, 33vw"
          />
        </div>
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
    </MotionLink>
  );
}
