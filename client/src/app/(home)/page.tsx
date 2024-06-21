import { SearchInput } from "@/components/searchInput";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen w-full max-w-[1600px]">
      <Link href="/" className="text-7xl font-extrabold text-blue-500">
        Flickr<span className="text-pink-500">NG</span>
      </Link>
      <p className="font-semibold mb-8">Image Search Engine</p>

      <Suspense>
        <SearchInput />
      </Suspense>
    </div>
  );
}
