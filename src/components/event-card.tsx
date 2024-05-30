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
    <MotionLink
      ref={ref}
      className="flex-1 basis-80 h-[380px] max-w-[500px] state-effects"
      href={`/event/${event.slug}`}
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      // fix initial framer-motion animation display issue when data renders
      initial={{ scale: 0.8, opacity: 0 }}
    >
      <section className="flex flex-col relative w-full h-full bg-white/[3%] rounded-xl overflow-hidden">
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
        <div className="flex flex-col flex-1 items-center justify-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">By {event.organizerName}</p>
          <p className="italic text-white/50 mt-4">{event.location}</p>
        </div>
        <section className="absolute flex flex-col justify-center items-center left-[12px] top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md">
          <p className="text-xl font-bold -mb-[5px]">{dayOfMonth}</p>
          <p className="text-xs uppercase text-accent">{month}</p>
        </section>
      </section>
    </MotionLink>
  );
}
