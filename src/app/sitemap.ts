import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { subsidiaries } from "@/content/subsidiaries";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";

const BASE = "https://www.sejfarmsgroup.com";
const LAST_MODIFIED = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/our-story",
    "/about/mission-vision-values",
    "/about/leadership",
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

  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  const subsidiaryRoutes = subsidiaries.map((s) => `/subsidiaries/${s.slug}`);
  const postRoutes = posts.map((p) => `/knowledge-hub/${p.slug}`);
  const projectRoutes = projects.map((p) => `/projects/${p.slug}`);

  const all = [
    ...staticRoutes,
    ...serviceRoutes,
    ...subsidiaryRoutes,
    ...postRoutes,
    ...projectRoutes,
  ];

  return all.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}