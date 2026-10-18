"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { parseVideo } from "@/lib/video";

type Media = {
  type: "image" | "video";
  url: string;
  caption?: string;
};

export function AlbumMediaGrid({
  media: mediaInput,
  albumTitle,
}: {
  media: Media[] | null | undefined;
  albumTitle: string;
}) {
  const media = mediaInput ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + media.length) % media.length));
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % media.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + media.length) % media.length,
        );
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % media.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, media.length]);

  if (media.length === 0) {
    return (
      <p className="text-center text-muted">
        This album is being populated. Photos and videos will appear here soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((m, i) => {
          if (m.type === "image") {
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative aspect-square overflow-hidden rounded-card bg-brand/5 transition-all hover:ring-2 hover:ring-brand/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url}
                  alt={m.caption ?? `${albumTitle} — item ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            );
          }

          // Video: try to show a thumbnail
          const video = parseVideo(m.url);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-card bg-charcoal transition-all hover:ring-2 hover:ring-brand/40"
            >
              {video.thumbnail ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={m.caption ?? `${albumTitle} — video ${i + 1}`}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-lg transition-transform group-hover:scale-110">
                      <Play className="h-7 w-7 fill-current pl-0.5" />
                    </div>
                  </div>
                </>
              ) : (
                // No thumbnail available — styled placeholder
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-dark to-charcoal text-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                    <Play className="h-6 w-6 fill-current pl-0.5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Video
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous"
                className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next"
                className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {media[openIndex].type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media[openIndex].url}
                alt={media[openIndex].caption ?? ""}
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
            ) : (
              <VideoLightbox url={media[openIndex].url} />
            )}
          </div>

          {media[openIndex].caption && (
            <p className="absolute bottom-6 left-1/2 z-10 max-w-3xl -translate-x-1/2 text-center text-sm text-white/90">
              {media[openIndex].caption}
            </p>
          )}

          <p className="absolute bottom-6 right-6 z-10 text-xs text-white/60">
            {openIndex + 1} / {media.length}
          </p>
        </div>
      )}
    </>
  );
}

/** Renders the correct player based on video source. */
function VideoLightbox({ url }: { url: string }) {
  const video = parseVideo(url);

  // YouTube / Vimeo — iframe embed
  if (video.provider === "youtube" || video.provider === "vimeo") {
    return (
      <div className="aspect-video w-[90vw] max-w-5xl">
        <iframe
          src={video.embedUrl}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full rounded-lg"
        />
      </div>
    );
  }

  // Direct file URL — native video element
  if (video.provider === "file") {
    return (
      <video
        src={url}
        controls
        autoPlay
        muted
        playsInline
        className="max-h-[90vh] max-w-[90vw] rounded-lg"
      />
    );
  }

  // Unknown — link out
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-white/10 px-6 py-4 text-white hover:bg-white/20"
    >
      Open video →
    </a>
  );
}