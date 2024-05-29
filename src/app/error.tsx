"use client"; // Error components must be Client Components

import H1 from "@/components/h1";
import { useEffect } from "react";

// Error Component taken from Next.js documentation
// https://nextjs.org/docs/app/building-your-application/routing/error-handling
// Sample way to generate error component: http://localhost:3000/events/all?page=abc
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="text-center py-24">
      <H1 className="mb-5">{error.message}</H1>
      <button
        className=" text-white text-sm px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition-opacity"
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </button>
    </main>
  );
}
