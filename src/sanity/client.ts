import { createClient } from "next-sanity";
import { cachedFetch } from "@/lib/sanityCache";

export const client = createClient({
  projectId: "328sgac3",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});

export function cachedClientFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  return cachedFetch(() => client.fetch<T>(query, params), query, params);
}
