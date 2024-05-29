import Image from "next/image";
import React from "react";

export default function NoEvents() {
  return (
    <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
      <Image fill className="object-fill" src="/bird.svg" alt="singing bird" />
    </div>
  );
}
