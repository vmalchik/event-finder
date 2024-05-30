import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
  return (
    // Note: css sizing based on events-list.tsx
    <div className="flex flex-wrap justify-center max-w-[1100px] mx-auto px-[20px] gap-20">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
