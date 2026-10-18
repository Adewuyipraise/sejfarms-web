"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type PostImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export function PostImageGallery({ images }: { images: PostImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  if (!images || images.length === 0) return null;

  // If there's only 1 image, make it a nice big centered image
  if (images.length === 1) {
    return (
      <div className="my-8">
        <button
          onClick={() => setOpenIndex(0)}
          className="group relative block w-full overflow-hidden rounded-xl bg-gray-100"
        >
          <Image
            src={images[0].url}
            alt={images[0].alt || "Article image"}
            width={1200}
            height={800}
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        {images[0].caption && (
          <p className="mt-2 text-center text-sm text-muted">{images[0].caption}</p>
        )}
        {openIndex !== null && <Lightbox />}
      </div>
    );
  }

  // If there are multiple images, render the Facebook-style grid
  return (
    <>
      <div className="my-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((img, i) => {
          // Make the first image span 2 columns if there are exactly 3 images
          const isLarge = images.length === 3 && i === 0;
          
          return (
            <button
              key={i}
              onClick={() => setOpenIndex(i)}
              className={`group relative overflow-hidden rounded-lg bg-gray-100 ${
                isLarge ? "col-span-2 row-span-2 aspect-square sm:aspect-video" : "aspect-square"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </button>
          );
        })}
      </div>
      
      {openIndex !== null && <Lightbox />}
    </>
  );

  // The Lightbox UI logic
  function Lightbox() {
    if (openIndex === null) return null;
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        onClick={close}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </>
        )}

        <div
          className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[openIndex].url}
            alt={images[openIndex].alt || ""}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
          {images[openIndex].caption && (
            <p className="mt-4 text-center text-white/90">{images[openIndex].caption}</p>
          )}
          <p className="mt-2 text-xs text-white/50">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    );
  }
}