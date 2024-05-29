"use client";
import { useRouter } from "next/navigation";
import NoEventsImage from "./no-events-image";

export default function NoEvents() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <section>
      <p className="text-lg  md:text-2xl text-white/80 font-medium text-center mb-[3.5rem]">
        Oops! No Events Found
      </p>
      <NoEventsImage />
      <div className="text-center mt-10">
        <button
          onClick={handleClick}
          className="p-10 bg-white/20 text-lg capitalize rounded-md border-white/10 border-2 py-2 bg-blur mt-5 lg:mt-auto state-effects"
        >
          Back
        </button>
      </div>
    </section>
  );
}
