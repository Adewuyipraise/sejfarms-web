import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { ArticleCard } from "@/components/shared/article-card";
import { sanityFetch } from "@/sanity/fetch";
import { POSTS_QUERY } from "@/sanity/queries";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description:
    "Articles, news and updates from Sejfarms Consults Limited — practical knowledge for fish farmers and agribusinesses.",
};

// Type returned by the Sanity query — matches the Post type but Sanity
// returns `_id` and image URLs directly.
type SanityPost = Post & { _id: string };

export default async function KnowledgeHubPage() {
  const posts = await sanityFetch<SanityPost[]>({
    query: POSTS_QUERY,
    tags: ["post"],
  });

  return (
    <>
      <PageHero
        eyebrow="Knowledge Hub"
        title="Insights, Updates & Practical Knowledge"
        description="Articles, news and updates from the Sejfarms team — built from our hands-on experience in aquaculture, training and value addition."
        tone="dark"
        backgroundImage="/images/og/knowledge-hub.jpg"
      />

      <Section>
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-body-lg text-muted">
                Our Knowledge Hub is being populated. Articles and updates from
                the Sejfarms team will appear here shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <PageCTA
        title="Have a question?"
        description="Our team is happy to help — reach out and we'll point you in the right direction."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}