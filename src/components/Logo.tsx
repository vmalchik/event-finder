import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
        // reserve space for the image to prevent layout content shift
        // if image is loaded from public directory there is no need to specify width and height or next.config.js
        width={53}
        height={12}
        alt="Event Finder logo"
      />
    </Link>
  );
}
