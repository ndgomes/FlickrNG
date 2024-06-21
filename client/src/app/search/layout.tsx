import { SearchHeader } from "@/components/searchHeader";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
      <SearchHeader />
      {children}
    </div>
  );
}
