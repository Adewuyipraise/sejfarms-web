import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Business } from "@/types";


export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={business.href}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      {business.image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-brand/10">
          <Image
            src={business.image}
            alt={business.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-h4 font-semibold text-charcoal">
          {business.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-brand">{business.tagline}</p>
        <p className="mt-3 flex-1 text-sm text-muted">{business.description}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-charcoal transition-colors group-hover:text-brand">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}