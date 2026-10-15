import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/shared/article-card";
import { sanityFetch } from "@/sanity/fetch";
import { FEATURED_POSTS_QUERY } from "@/sanity/queries";

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readingTime?: number;
  coverImage?: string;
  featured: boolean;
};

export async function LatestInsights() {
  const posts = await sanityFetch<SanityPost[]>({
    query: FEATURED_POSTS_QUERY,
    tags: ["post"],
  });

  const latest = posts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <Section className="bg-cream">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Knowledge Hub</Eyebrow>
            <Heading level={2} className="mt-4">
              Latest from Sejfarms
            </Heading>
          </div>
          <Button href="/knowledge-hub" variant="ghost">
            View All →
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <ArticleCard
              key={post._id}
              post={{
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                category: post.category,
                readingTime: post.readingTime ?? 0,
                coverImage: post.coverImage,
              }}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}