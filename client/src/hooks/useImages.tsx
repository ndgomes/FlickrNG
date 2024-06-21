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

// Function to fetch images based on query and page number
async function fetchImages(
  query: string,
  page: number
): Promise<ImagesInterface> {
  const response = await FetchApi(`/getImages?query=${query}&page=${page}`, {
    next: {
      revalidate: 60 * 60, // Cache revalidation time (1 hour)
    },
  });

  const data = await response.json();
  return data;
}

// Custom hook to manage state for fetching images
export default function useImages(query: string, page: number) {
  const [data, setData] = useState<ImagesInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const result = await fetchImages(query, page);
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate the loading delay to show the skeleton loading for 1 second
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchData();
  }, [query, page]);

  return { data, loading };
}
