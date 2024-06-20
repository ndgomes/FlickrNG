"use client";

import { Skeleton } from "@/components/skeleton";
import { useSearchParams } from "next/navigation";

export default function SearchLoading() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base">
        Results for <span className="font-semibold text-white">{query}</span>
      </p>
      <div className="grid grid-cols-6 gap-6">
        {[...Array(24)].map((_, index) => (
          <Skeleton key={index} className="h-[240px]" />
        ))}
      </div>
    </div>
  );
}
