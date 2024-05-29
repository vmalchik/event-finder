import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationControlsProps = {
  page: number;
  maxPages: number;
};

export default function PaginationControls({
  page,
  maxPages,
}: PaginationControlsProps) {
  const prev = page - 1;
  const next = page + 1;
  return (
    <section className="flex justify-between w-full">
      <PaginationButton href={`?page=${prev}`} isVisible={page > 1}>
        <ArrowLeftIcon /> Previous
      </PaginationButton>
      <PaginationButton href={`?page=${next}`} isVisible={page !== maxPages}>
        Next <ArrowRightIcon />
      </PaginationButton>
    </section>
  );
}

type PaginationButtonProps = {
  href: string;
  isVisible: boolean;
  children: React.ReactNode;
};

const PaginationButton = ({
  href,
  children,
  isVisible,
}: PaginationButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-white text-sm px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition-opacity",
        {
          invisible: !isVisible,
        }
      )}
    >
      {children}
    </Link>
  );
};
