import { headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/fetch";
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from "@/sanity/queries";
import { LikeAndShare } from "@/components/shared/like-and-share";

export const instant = false;

type Params = { slug: string };

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
  likes?: number;
  past: boolean;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: EVENT_SLUGS_QUERY,
    revalidate: 3600,
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await sanityFetch<SanityEvent | null>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    tags: [`event:${slug}`],
  });
  if (!event) return {};
  return { title: event.title, description: event.description };
}

export default function EventPage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <EventContent params={params} />
    </Suspense>
  );
}

async function EventContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = await sanityFetch<SanityEvent | null>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    tags: [`event:${slug}`],
  });
  if (!event) notFound();

  const startDate = new Date(event.startDate).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const endDate = event.endDate
    ? new Date(event.endDate).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;


      const headersList = await headers();
      const host = headersList.get("host") || "www.sejfarmsgroup.com";
      const protocol = host.includes("localhost") ? "http" : "https";
      const eventUrl = `${protocol}://${host}/events/${slug}`;


  return (
    <>
      <PageHero
        eyebrow={event.type}
        title={event.title}
        description={startDate}
        tone={event.image ? "dark" : "light"}
        backgroundImage={event.image}
      />

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            {/* Meta row */}
            <div className="flex flex-wrap gap-6 border-b border-border pb-8 text-sm">
              <div className="inline-flex items-center gap-2 text-muted">
                <Calendar className="h-4 w-4 text-brand" />
                <span>
                  {startDate}
                  {endDate && ` – ${endDate}`}
                </span>
              </div>
              {event.location && (
                <div className="inline-flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4 text-brand" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.capacity && (
                <div className="inline-flex items-center gap-2 text-muted">
                  <Users className="h-4 w-4 text-brand" />
                  <span>{event.capacity} places</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className="text-body-lg text-charcoal/85 text-pretty">
                {event.description}
              </p>
            </div>

            {/* Registration CTA */}
            {event.requiresRegistration && !event.past && (
              <div className="mt-12 rounded-card border border-brand/20 bg-brand/5 p-8">
                <h3 className="font-display text-h4 font-semibold">
                  Register for this event
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Register your interest and we’ll be in touch with details.
                </p>
                <div className="mt-6">
                  <Button
                    href={`/contact?interest=${encodeURIComponent(event.title)}`}
                    variant="primary"
                  >
                    Register Interest
                  </Button>
                </div>
              </div>
            )}
          </Reveal>
        </Container>
      </Section>
      <div className="mx-auto max-w-3xl mt-8">
        <LikeAndShare
          documentId={event._id}
          title={event.title}
          url={eventUrl}
          initialLikes={event.likes || 0}
        />
      </div>

      <PageCTA
        title="Have a question about this event?"
        description="Contact us and we'll get back to you."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}