import { SearchInput } from "@/components/searchInput";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen w-full max-w-[1600px] p-4 sm:p-8">
      {/* Logo and title */}
      <Link
        href="/"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-500"
      >
        Flickr<span className="text-pink-500">NG</span>
      </Link>

      {/* Subtitle */}
      <p className="font-semibold text-xl mb-8">Image Search Engine</p>

      {/* Search input */}
      <Suspense>
        <SearchInput />
      </Suspense>
    </div>
  );
}
