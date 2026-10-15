import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/fetch";
import { SERVICE_BY_SLUG_QUERY, SERVICE_SLUGS_QUERY } from "@/sanity/queries";
import { whatsappMessages } from "@/lib/whatsapp";

export const instant = false;

type Params = { slug: string };

type SanityServiceDetail = {
  _id: string;
  title: string;
  slug: string;
  groupSlug: string;
  shortDescription: string;
  image?: string;
  heroImage?: string;
  overview?: string;
  offering?: Array<{ title: string; description: string }>;
  process?: Array<{ step: string; title: string; description: string }>;
  faqs?: Array<{ q: string; a: string }>;
};

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await sanityFetch<string[]>({
    query: SERVICE_SLUGS_QUERY,
    tags: ["service"],
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityFetch<SanityServiceDetail | null>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`service:${slug}`],
  });
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = await sanityFetch<SanityServiceDetail | null>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`service:${slug}`],
  });
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.shortDescription}
        tone={service.heroImage ? "dark" : "light"}
        backgroundImage={service.heroImage}
      />

      {service.overview && (
        <Section>
          <Container>
            <Reveal className="mx-auto max-w-3xl">
              <p className="text-body-lg text-charcoal/80 text-pretty">
                {service.overview}
              </p>
            </Reveal>
          </Container>
        </Section>
      )}

      {service.offering && service.offering.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Reveal>
              <Heading level={2}>What We Offer</Heading>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
              {service.offering.map((o) => (
                <StaggerItem
                  key={o.title}
                  className="rounded-card border border-border bg-cream p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <Heading level={4}>{o.title}</Heading>
                  <p className="mt-2 text-sm text-muted">{o.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {service.process && service.process.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <Heading level={2}>How We Work</Heading>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((p) => (
                <StaggerItem key={p.step} className="border-l-2 border-brand pl-5">
                  <p className="font-display text-sm font-semibold text-brand">
                    {p.step}
                  </p>
                  <Heading level={4} className="mt-1">
                    {p.title}
                  </Heading>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Reveal>
              <Heading level={2}>Frequently Asked Questions</Heading>
            </Reveal>
            <dl className="mt-10 max-w-3xl divide-y divide-border">
              {service.faqs.map((f) => (
                <Reveal key={f.q} className="py-6">
                  <dt className="font-display font-semibold text-charcoal">
                    {f.q}
                  </dt>
                  <dd className="mt-2 text-muted">{f.a}</dd>
                </Reveal>
              ))}
            </dl>
          </Container>
        </Section>
      )}

      <PageCTA
        title={`Ready to discuss ${service.title.toLowerCase()}?`}
        description="Speak with our team and we'll help you figure out the right next step."
        primary={{ label: "Contact Us", href: "/contact" }}
        whatsapp={{ message: whatsappMessages.general }}
      />
    </>
  );
}