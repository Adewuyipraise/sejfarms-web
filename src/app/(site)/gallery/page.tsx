import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/fetch";
import { GALLERY_ALBUMS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and videos from Sejfarms Consults Limited — farms, trainings, events, teams, and more.",
};

type SanityAlbum = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  year: number;
  coverImage: string;
  mediaCount: number;
};

export default async function GalleryPage() {
  const albums = await sanityFetch<SanityAlbum[]>({
    query: GALLERY_ALBUMS_QUERY,
    tags: ["galleryAlbum"],
  });

  const byCategory = albums.reduce<Record<string, SanityAlbum[]>>(
    (acc, album) => {
      (acc[album.category] ??= []).push(album);
      return acc;
    },
    {},
  );

  const categories = Object.keys(byCategory);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our Work in Pictures"
        description="A growing collection of photos and videos from our farms, training programmes, events, teams and products."
        tone="dark"
        backgroundImage="/images/hero/default.jpg"
      />

      <Section>
        <Container>
          {albums.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-body-lg text-muted">
                Our gallery is being populated. Photos and videos from our
                operations will appear here shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map((cat) => (
                <div key={cat}>
                  <Reveal>
                    <h2 className="font-display text-h2 font-bold text-charcoal">
                      {cat}
                    </h2>
                  </Reveal>
                  <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {byCategory[cat].map((album) => (
                      <StaggerItem key={album._id} className="flex">
                        <AlbumCard album={album} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function AlbumCard({ album }: { album: SanityAlbum }) {
  return (
    <Link
      href={`/gallery/${album.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand/10">
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
          {album.category} · {album.year}
        </span>
        <h3 className="mt-2 font-display text-h4 font-semibold">
          {album.title}
        </h3>
        {album.description && (
          <p className="mt-2 text-sm text-muted">{album.description}</p>
        )}
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-muted">
          <Images className="h-3.5 w-3.5" />
          {album.mediaCount} {album.mediaCount === 1 ? "item" : "items"}
        </p>
      </div>
    </Link>
  );
}