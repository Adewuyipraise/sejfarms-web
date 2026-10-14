import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import type { GalleryAlbum } from "@/types";

export function GalleryAlbumCard({ album }: { album: GalleryAlbum }) {
  const count = album.media.length;

  return (
    <Link
      href={`/gallery/${album.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
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
        <h3 className="mt-2 font-display text-h4 font-semibold">{album.title}</h3>
        {album.description && (
          <p className="mt-2 text-sm text-muted">{album.description}</p>
        )}
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-muted">
          <Images className="h-3.5 w-3.5" />
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>
    </Link>
  );
}