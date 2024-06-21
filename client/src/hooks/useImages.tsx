import { useState, useEffect } from "react";
import { FetchApi } from "@/api/fetchApi";

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

async function fetchImages(
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

function useImages(query: string, page: number) {
  const [data, setData] = useState<ImagesInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchImages(query, page);
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return { data, loading };
}

export default useImages;
