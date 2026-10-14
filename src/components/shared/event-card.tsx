import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { Event } from "@/types";

export function EventCard({ event }: { event: Event }) {
  const startDate = new Date(event.startDate);
  const dateLabel = startDate.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col rounded-card border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-brand">
        {event.type}
      </span>
      <h3 className="mt-3 font-display text-h4 font-semibold text-charcoal">
        {event.title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {dateLabel}
          {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString("en-NG", { month: "long", day: "numeric" })}`}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {event.location}
        </span>
      </div>
      <p className="mt-4 flex-1 text-sm text-muted">{event.description}</p>
    </Link>
  );
}