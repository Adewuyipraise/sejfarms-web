import { client } from "./lib/client";

/**
 * Fetch from Sanity. Returns cached data with a revalidation window.
 *
 * In production, use Next.js revalidateTag with a webhook from Sanity
 * so publishing updates the site immediately. For now, we use a simple
 * time-based revalidation.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}