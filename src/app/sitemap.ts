import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/fetch";
import { POST_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";

const BASE = "https://www.sejfarmsgroup.com";
const LAST_MODIFIED = new Date("2026-01-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from Sanity
  const [postSlugs, projectSlugs] = await Promise.all([
    sanityFetch<string[]>({
      query: POST_SLUGS_QUERY,
      revalidate: 3600,
    }),
    sanityFetch<string[]>({
      query: PROJECT_SLUGS_QUERY,
      revalidate: 3600,
    }),
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

  const postRoutes = postSlugs.map((slug) => `/knowledge-hub/${slug}`);
  const projectRoutes = projectSlugs.map((slug) => `/projects/${slug}`);

  const all = [...staticRoutes, ...postRoutes, ...projectRoutes];

  return all.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}