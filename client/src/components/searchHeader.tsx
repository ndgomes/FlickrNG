import Link from "next/link";
import { SearchInput } from "./searchInput";
import { Suspense } from "react";
import { Skeleton } from "./skeleton";

export function SearchHeader() {
  return (
    <div className="flex items-start">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-4xl font-extrabold text-blue-500">
          Flickr<span className="text-pink-500">NG</span>
        </Link>

        <Suspense fallback={<Skeleton />}>
          <SearchInput />
        </Suspense>
      </div>
    </div>
  );
}
