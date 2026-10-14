// src/components/shared/article-card.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Looser type for Sanity posts — body not required on cards
export type ArticleCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime?: number;
  coverImage?: string;
};

export function ArticleCard({ post }: { post: ArticleCardPost }) {
  return (
    <Link
      href={`/knowledge-hub/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      {post.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand/10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
          {post.category}
        </span>
        <h3 className="mt-3 font-display text-h4 font-semibold text-charcoal">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-muted">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between text-xs text-muted">
          {post.readingTime && <span>{post.readingTime} min read</span>}
          <span className="inline-flex items-center gap-1 font-semibold text-brand">
            Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}