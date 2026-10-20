import { headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { PostImageGallery } from "@/components/shared/post-image-gallery";
import { sanityFetch } from "@/sanity/fetch";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import { parseVideo } from "@/lib/video";
import { whatsappMessages } from "@/lib/whatsapp";
import { LikeAndShare } from "@/components/shared/like-and-share";
import Image from "next/image";

export const instant = false;

// Custom renderer for images and videos inside the Portable Text body
const customComponents = {
  types: {
    image: () => null,

    youtube: ({ value }: { value: { url: string } }) => (
      <figure className="my-8 aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={parseVideo(value.url).embedUrl.replace("?autoplay=1", "")}
          title="Video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </figure>
    ),
  },
};

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
  body: PortableTextBlock[];
  likes?: number;
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
  

    // --- ADD THIS BLOCK ---
    const headersList = await headers();
    const host = headersList.get("host") || "www.sejfarmsgroup.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    const postUrl = `${baseUrl}/knowledge-hub/${post.slug}`;
    // ----------------------

  
  // EXTRACT IMAGES FROM BODY
  const postImages = post.body
    .filter((block: any) => block._type === "image")
    .map((block: any) => ({
      url: block.url,
      alt: block.alt,
      caption: block.caption,
    }));


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
              <PortableText 
                value={post.body} 
                components={customComponents}
              />
            </div>

            <PostImageGallery images={postImages} />

            <LikeAndShare
              documentId={post._id}
              title={post.title}
              url={postUrl}
              initialLikes={post.likes || 0}
            />

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