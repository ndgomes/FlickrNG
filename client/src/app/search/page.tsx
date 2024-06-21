"use client";

import Pagination from "@/components/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useImages from "@/hooks/useImages";
import SearchLoading from "./loading";
import { X } from "lucide-react";

interface SearchProps {
  searchParams: {
    q: string;
    p: number;
  };
}

export default function Search({ searchParams }: SearchProps) {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImgSrc, setModalImgSrc] = useState<string>("");

  const { q: query, p: page } = searchParams;
  const pageNumber = parseInt(page.toString(), 10);
  const { data, loading } = useImages(query, pageNumber);

  useEffect(() => {
    if (!query) {
      router.replace("/");
      return;
    }

    if (!page) {
      router.replace(`/search?q=${query}&p=1`);
      return;
    }
  }, [query, page, router]);

  if (data && pageNumber > data.pages) {
    router.replace(`/search?q=${query}&p=1`);
    return null;
  }

  function handleOnClickPreviousPage() {
    if (pageNumber > 1) {
      router.push(`/search?q=${query}&p=${pageNumber - 1}`);
    }
  }

  function handleOnClickNextPage() {
    if (data && pageNumber < data.pages) {
      router.push(`/search?q=${query}&p=${pageNumber + 1}`);
    }
  }

  function showModal(src: string) {
    setModalOpen(true);
    setModalImgSrc(src);
  }

  function closeModal() {
    setModalOpen(false);
    setModalImgSrc("");
  }

  if (loading) {
    return <SearchLoading />;
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {data?.images.map((img) => {
            return (
              <button
                key={img.id}
                onClick={() => showModal(img.url)}
                className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
              >
                <div className="w-full h-80 sm:h-64 md:h-72 lg:h-80 xl:h-96 2xl:h-80">
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
              </button>
            );
          })}

          {modalOpen && (
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/85 flex justify-center items-center">
              <a
                className="fixed z-90 top-6 right-8 text-white text-5xl font-bold cursor-pointer"
                onClick={closeModal}
              >
                <X />
              </a>
              <img
                className="w-auto h-auto max-w-[800px] max-h-[600px] object-cover"
                src={modalImgSrc}
                alt="Modal"
              />
            </div>
          )}
        </div>
      </div>

      <Pagination
        currentPage={pageNumber}
        maximumPages={data?.pages}
        onClickNext={handleOnClickNextPage}
        onClickPrevious={handleOnClickPreviousPage}
      />
    </>
  );
}
