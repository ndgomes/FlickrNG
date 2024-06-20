export function fetchApi(path: string, init?: RequestInit) {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_BASE_URL);
  return fetch(url, init);
}
