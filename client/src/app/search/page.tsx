import { fetchApi } from "@/api/fetchApi";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SearchProps {
  searchParams: {
    q: string;
  };
}

interface Image {
  id: number;
  title: string;
  url: string;
  orginalUrl: string;
}

async function searchImages(query: string): Promise<Image[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetchApi(`/getImages?query=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  const data = await response.json();

  const images = data.images;

  return images;
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams;

  if (!query) {
    redirect("/");
  }

  const images = await searchImages(query);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base">
        Results for <span className="font-semibold text-white">{query}</span>
      </p>

      <div className="grid grid-cols-6 gap-6">
        {images.map((img) => {
          return (
            <Link
              href={img.orginalUrl}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
              key={img.id}
            >
              <div className="w-80 h-80">
                <Image
                  src={img.url}
                  className="group-hover:scale-105 transition-transform duration-500 rounded-lg object-cover w-full h-full"
                  width={320}
                  height={320}
                  quality={100}
                  alt={img.title}
                  priority={true}
                />

                <div className="opacity-0 bg-black group-hover:opacity-100 bg-opacity-50 duration-500 absolute inset-0 flex justify-center text-center items-end p-2 text-xl text-white font-semibold">
                  {img.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
