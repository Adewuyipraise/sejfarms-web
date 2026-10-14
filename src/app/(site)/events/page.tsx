import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { sanityFetch } from "@/sanity/fetch";
import { EVENTS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming programmes, training cohorts, and events from Sejfarms Consults Limited.",
};

type SanityEvent = {
  _id: string;
  title: string;
  slug: string;
  type: string;
  startDate: string;
  endDate?: string;
  location?: string;
  locationType: string;
  description: string;
  requiresRegistration: boolean;
  capacity?: number;
  image?: string;
  past: boolean;
};

export default async function EventsPage() {
  const events = await sanityFetch<SanityEvent[]>({
    query: EVENTS_QUERY,
    tags: ["event"],
  });

  const upcoming = events.filter((e) => !e.past);
  const past = events.filter((e) => e.past);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Programmes & Events"
        description="Training cohorts, workshops, campaigns and other programmes run by Sejfarms Consults Limited."
        tone="dark"
        backgroundImage="/images/case-studies/farm-setup-to-first-harvest.jpg"
      />

      <Section>
        <Container>
          <Heading level={2}>Upcoming</Heading>
          {upcoming.length === 0 ? (
            <p className="mt-6 max-w-2xl text-muted">
              No upcoming events at the moment. New programmes will be listed
              here as they are announced.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {past.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Heading level={2}>Past Events</Heading>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <PageCTA
        title="Want to be notified?"
        description="Contact us to be added to our events and programmes list."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}

function EventCard({ event }: { event: SanityEvent }) {
  const startDate = new Date(event.startDate).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      {event.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand/10">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
          {event.type}
        </span>
        <h3 className="mt-3 font-display text-h4 font-semibold text-charcoal">
          {event.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {startDate}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          )}
        </div>
        <p className="mt-4 flex-1 text-sm text-muted">{event.description}</p>
      </div>
    </Link>
  );
}