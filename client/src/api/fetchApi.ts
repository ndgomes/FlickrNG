export function FetchApi(path: string, init?: RequestInit) {
  // Construct full URL using the API base URL and the provided path.
  const url = new URL(path, process.env.NEXT_PUBLIC_API_BASE_URL);

  // Execute using the built URL and the init options
  return fetch(url, init);
}
