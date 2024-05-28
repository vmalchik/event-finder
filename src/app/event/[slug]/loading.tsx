import Skeleton from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-y-4 pt-28">
      <Skeleton className="h4 w-[450px] sm:w-[550px]" />
      <Skeleton className="h4 w-[320px] sm:w-[400px]" />
      <Skeleton className="h4 w-[380px] sm:w-[430px]" />
    </div>
  );
}
