"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to get search parameters from the URL

  const query = searchParams.get("q"); // Get the query ('q') parameter from URL

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData); // Convert form data to object

    const query = data.q;

    // If query is empty, do nothing
    if (!query) {
      return null;
    }

    // Redirect to search results page with query and page 1
    router.push(`/search?q=${query}&p=1`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] h-[30px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700 "
    >
      {/* Input field for search query */}
      <input
        name="q"
        defaultValue={query ?? ""}
        placeholder="Search..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        required
      />

      {/* Search icon */}
      <Search className="w-5 h-5 text-zinc-500" />
    </form>
  );
}
