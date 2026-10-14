"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { ServiceGroup } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceGroupAccordion({ group }: { group: ServiceGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-card border border-border bg-white transition-all">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-8"
        aria-expanded={open}
      >
        <div className="flex items-start gap-5">
          <span className="font-display text-sm font-semibold text-brand">
            {group.number}
          </span>
          <div>
            <h3 className="font-display text-h3 font-semibold text-charcoal">
              {group.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              {group.description}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-brand transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="border-t border-border p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group/card flex flex-col rounded-lg border border-border bg-cream p-5 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-soft"
              >
                <h4 className="font-display font-semibold text-charcoal group-hover/card:text-brand">
                  {service.title}
                </h4>
                <p className="mt-2 flex-1 text-xs text-muted">
                  {service.shortDescription}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  Learn more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/card:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}