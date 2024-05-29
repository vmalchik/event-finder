// Example based on NextJS site:
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Event Finder";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <section>
        <h1>{params.slug}</h1>
        <p>Event Finder - Browse events around you</p>
      </section>
    )
  );
}
