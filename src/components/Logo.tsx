import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
      width={53}
      height={12}
      alt="Event Finder logo"
    />
  );
}
