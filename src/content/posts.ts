import type { Post } from "@/types";

/**
 * Posts are populated by the admin via Sanity.
 * The placeholder below exists so the [slug] route has at least one entry
 * to build with. It is filtered out of public listings.
 */
export const posts: Post[] = [
  {
    slug: "_placeholder",
    type: "Article",
    title: "Knowledge Hub Coming Soon",
    excerpt: "Articles, news, and updates from the Sejfarms team will appear here.",
    category: "Industry",
    author: "Sejfarms Team",
    publishedAt: "2026-01-01",
    readingTime: 1,
    body: [
      "Our Knowledge Hub is being populated with articles and updates from the Sejfarms team.",
      "Check back soon for practical insights on aquaculture, training, value addition, and the aquaculture industry in Nigeria.",
    ],
  },
];

// Public-facing list — excludes the placeholder
export const visiblePosts = posts.filter((p) => !p.slug.startsWith("_"));

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByType(type: string) {
  return visiblePosts.filter((p) => p.type === type);
}