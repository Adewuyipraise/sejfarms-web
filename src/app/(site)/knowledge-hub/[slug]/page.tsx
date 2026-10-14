import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { sanityFetch } from "@/sanity/fetch";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import { whatsappMessages } from "@/lib/whatsapp";

export const instant = false;

type Params = { slug: string };

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
  body: any[];
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: POST_SLUGS_QUERY,
    revalidate: 3600,
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default function PostPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  });
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        tone={post.coverImage ? "dark" : "light"}
        backgroundImage={post.coverImage}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-4 border-b border-border pb-6 text-sm text-muted">
              <span>{post.author}</span>
              {post.readingTime && (
                <>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>
          </div>
        </Container>
      </Section>

      <PageCTA
        title="Want to learn more?"
        description="Reach out to us with any questions about aquaculture, training or our services."
        primary={{ label: "Contact Us", href: "/contact" }}
        whatsapp={{ message: whatsappMessages.general }}
      />
    </>
  );
}