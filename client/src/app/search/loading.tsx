import { Skeleton } from "@/components/skeleton";

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {[...Array(24)].map((_, index) => (
          <Skeleton key={index} className="h-[240px]" />
        ))}
      </div>
    </div>
  );
}
