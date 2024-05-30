// Example based on NextJS site:
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
import { getEvents } from "@/lib/server-utils";
import { EventoResponse } from "@/lib/types";
import { ImageResponse } from "next/og";

// Image metadata
// export const alt = "Event Finder";
// export const size = {
//   width: 1200,
//   height: 630,
// };

// Does not appear to work. Note: re-name file back to test.
// See: https://www.davegray.codes/posts/automate-open-graph-images-nextjs

export const contentType = "image/png";

// Generate static parameters for the dynamic route
// export async function generateStaticParams() {
//   const response = await getEvents("all");
//   const { events } = response;

//   return events.map((event) => ({ id: event.slug }));
// }

// export async function generateImageMetadata() {
//   const response: EventoResponse = await getEvents("all");
//   const { events } = response;
//   return events.map((event) => ({
//     id: event.slug,
//     size: { width: 1200, height: 630 },
//     alt: `Event: ${event.slug}`,
//     contentType: "image/png",
//   }));
// }

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <section>
        <h1>{params.slug}</h1>
        <p>Event Finder - Browse events around you</p>
      </section>
    ),
    // ImageResponse options
    {
      width: 1200,
      height: 630,
    }
  );
}
