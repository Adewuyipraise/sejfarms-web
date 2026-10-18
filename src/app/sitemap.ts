import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/fetch";
import {
  POST_SLUGS_QUERY,
  PROJECT_SLUGS_QUERY,
  SERVICE_SLUGS_QUERY,
  SUBSIDIARY_SLUGS_QUERY,
  EVENT_SLUGS_QUERY,
  GALLERY_ALBUM_SLUGS_QUERY,
  JOB_SLUGS_QUERY,
} from "@/sanity/queries";

const BASE = "https://www.sejfarmsgroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from Sanity
  const [postSlugs, projectSlugs, serviceSlugs, subsidiarySlugs, eventSlugs, albumSlugs, jobSlugs] =
    await Promise.all([
      sanityFetch<string[]>({ query: POST_SLUGS_QUERY, revalidate: 3600 }),
      sanityFetch<string[]>({ query: PROJECT_SLUGS_QUERY, revalidate: 3600 }),
      sanityFetch<string[]>({ query: SERVICE_SLUGS_QUERY, revalidate: 3600 }),
      sanityFetch<string[]>({ query: SUBSIDIARY_SLUGS_QUERY, revalidate: 3600 }),
      sanityFetch<string[]>({ query: EVENT_SLUGS_QUERY, revalidate: 3600 }),
      sanityFetch<string[]>({ query: GALLERY_ALBUM_SLUGS_QUERY, revalidate: 3600 }),
      sanityFetch<string[]>({ query: JOB_SLUGS_QUERY, revalidate: 3600 }),
    ]);

  const staticRoutes = [
    "",
    "/about",
    "/about/our-story",
    "/about/mission-vision-values",
    "/about/leadership",
    "/about/impact",
    "/services",
    "/subsidiaries",
    "/knowledge-hub",
    "/products",
    "/reviews",
    "/events",
    "/gallery",
    "/projects",
    "/careers",
    "/faqs",
    "/contact",
    "/work-with-us",
    "/privacy",
    "/terms",
  ];

  type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

  const dynamicRoutes: Entry[] = [
    ...postSlugs.map((slug) => ({
      path: `/knowledge-hub/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...projectSlugs.map((slug) => ({
      path: `/projects/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...serviceSlugs.map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...subsidiarySlugs.map((slug) => ({
      path: `/subsidiaries/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...eventSlugs.map((slug) => ({
      path: `/events/${slug}`,
      priority: 0.6,
      changeFrequency: "weekly" as const,
    })),
    ...albumSlugs.map((album) => ({
      path: `/gallery/${album}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...jobSlugs.map((slug) => ({
      path: `/careers/${slug}`,
      priority: 0.5,
      changeFrequency: "weekly" as const,
    })),
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: path === "" ? 1 : 0.7,
    })),
    ...dynamicRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
  ];
}
