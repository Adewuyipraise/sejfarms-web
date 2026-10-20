import { headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { sanityFetch } from "@/sanity/fetch";
import { LikeAndShare } from "@/components/shared/like-and-share";
import {
  GALLERY_ALBUM_BY_SLUG_QUERY,
  GALLERY_ALBUM_SLUGS_QUERY,
} from "@/sanity/queries";
import { AlbumMediaGrid } from "@/components/shared/album-media-grid";

export const instant = false;

type Params = { album: string };

type SanityAlbumDetail = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  year: number;
  coverImage: string;
  likes?: number;
  images?: Array<{ _key: string; url: string; caption?: string }>;
  videos?: Array<{ _key: string; url: string; caption?: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: GALLERY_ALBUM_SLUGS_QUERY,
    revalidate: 3600,
  });
  return slugs.map((album) => ({ album }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { album } = await params;
  const found = await sanityFetch<SanityAlbumDetail | null>({
    query: GALLERY_ALBUM_BY_SLUG_QUERY,
    params: { slug: album },
    tags: [`galleryAlbum:${album}`],
  });
  if (!found) return {};
  return { title: found.title, description: found.description };
}

export default function AlbumPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AlbumContent params={params} />
    </Suspense>
  );
}

async function AlbumContent({ params }: { params: Promise<Params> }) {
  const { album } = await params;
  const found = await sanityFetch<SanityAlbumDetail | null>({
    query: GALLERY_ALBUM_BY_SLUG_QUERY,
    params: { slug: album },
    tags: [`galleryAlbum:${album}`],
  });
  if (!found) notFound();

  // Merge images and videos into one media array for the lightbox
  const media = [
    ...(found.images ?? []).map((img) => ({
      type: "image" as const,
      url: img.url,
      caption: img.caption,
    })),
    ...(found.videos ?? []).map((vid) => ({
      type: "video" as const,
      url: vid.url,
      caption: vid.caption,
    })),
  ];

    const headersList = await headers();
    const host = headersList.get("host") || "www.sejfarmsgroup.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const albumUrl = `${protocol}://${host}/gallery/${album}`;

  return (
    <>
      <PageHero
        eyebrow={`${found.category} · ${found.year}`}
        title={found.title}
        description={found.description}
        tone="dark"
        backgroundImage={found.coverImage}
      />

      <Section>
        <Container>
          <AlbumMediaGrid media={media} albumTitle={found.title} />
        </Container>
        <LikeAndShare
          documentId={found._id}
          title={found.title}
          url={albumUrl}
          initialLikes={found.likes || 0}
        />
      </Section>
    </>
  );
}