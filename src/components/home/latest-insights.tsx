import { visiblePosts } from "@/content/posts";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/shared/article-card";
import { posts } from "@/content/posts";

export function LatestInsights() {
  const latest = [...visiblePosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

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
          {latest.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}