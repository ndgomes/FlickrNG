"use client";

import { FetchApi } from "@/api/fetchApi";
import Pagination from "@/components/pagination";
import { Skeleton } from "@/components/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface SearchProps {
  searchParams: {
    q: string;
    p: number;
  };
}

interface ImagesInterface {
  images: {
    id: number;
    title: string;
    url: string;
    originalUrl: string;
  }[];
  pages: number;
  total: number;
}

async function SearchImages(
  query: string,
  page: number
): Promise<ImagesInterface> {
  const response = await FetchApi(`/getImages?query=${query}&page=${page}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  const data = await response.json();

  return data;
}

export default async function Search({ searchParams }: SearchProps) {
  const router = useRouter();
  const [data, setData] = useState<ImagesInterface | null>(null);
  const { q: query, p: page } = searchParams;

  useEffect(() => {
    if (!query) {
      router.replace("/");
      return;
    }

    if (!page) {
      router.replace(`/search?q=${query}&p=1`);
      return;
    }

    const fetchData = async () => {
      const result = await SearchImages(query, page);
      setData(result);
    };

    fetchData();
  }, [query, page, router]);

  if (data && page > data.pages) {
    router.replace(`/search?q=${query}&p=1`);
    return null;
  }

  function handleOnClickPreviousPage() {
    const pageNum = parseInt(page as any, 10);
    if (pageNum > 1) {
      router.push(`/search?q=${query}&p=${pageNum - 1}`);
    }
  }

  function handleOnClickNextPage() {
    const pageNum = parseInt(page as any, 10);
    if (data && pageNum < data.total) {
      router.push(`/search?q=${query}&p=${pageNum + 1}`);
    }
  }

  if (!data) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-base">
            Results for <span className="font-bold text-blue-500">{query}</span>
          </p>
          <p className="text-base">
            Total Images{" "}
            <span className="font-bold text-pink-500">{data?.total}</span>
          </p>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {data?.images.map((img) => {
            return (
              <Link
                key={img.id}
                href={img.originalUrl || img.url}
                className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
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

      <Pagination
        initialPage={page}
        maximumPages={data?.pages}
        onClickNext={handleOnClickNextPage}
        onClickPrevious={handleOnClickPreviousPage}
      />
    </>
  );
}
