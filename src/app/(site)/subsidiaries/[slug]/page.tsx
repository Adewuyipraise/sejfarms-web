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
import {
  SUBSIDIARY_BY_SLUG_QUERY,
  SUBSIDIARY_SLUGS_QUERY,
} from "@/sanity/queries";

export const instant = false;

type Params = { slug: string };

type SanitySubsidiaryDetail = {
  _id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  image?: string;
  heroImage?: string;
  whatsapp?: string;
  email?: string;
  about: string;
  services?: Array<{ title: string; description: string }>;
};

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await sanityFetch<string[]>({
    query: SUBSIDIARY_SLUGS_QUERY,
    tags: ["subsidiary"],
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sub = await sanityFetch<SanitySubsidiaryDetail | null>({
    query: SUBSIDIARY_BY_SLUG_QUERY,
    params: { slug },
    tags: [`subsidiary:${slug}`],
  });
  if (!sub) return {};
  return { title: sub.name, description: sub.description };
}

export default function SubsidiaryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SubsidiaryContent params={params} />
    </Suspense>
  );
}

async function SubsidiaryContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sub = await sanityFetch<SanitySubsidiaryDetail | null>({
    query: SUBSIDIARY_BY_SLUG_QUERY,
    params: { slug },
    tags: [`subsidiary:${slug}`],
  });
  if (!sub) notFound();

  return (
    <>
      <PageHero
        eyebrow="Subsidiary of Sejfarms Consults Limited"
        title={sub.name}
        description={sub.tagline}
        tone={sub.heroImage ? "dark" : "light"}
        backgroundImage={sub.heroImage}
      />

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <Heading level={2}>About {sub.name}</Heading>
            <p className="mt-4 text-body-lg text-charcoal/80 text-pretty">
              {sub.about}
            </p>
          </Reveal>
        </Container>
      </Section>

      {sub.services && sub.services.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Reveal>
              <Heading level={2}>What We Do</Heading>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sub.services.map((s) => (
                <StaggerItem
                  key={s.title}
                  className="flex flex-col rounded-card border border-border bg-cream p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <Heading level={4}>{s.title}</Heading>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {s.description}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <PageCTA
        title={`Work with ${sub.name}`}
        description={`Get in touch with the ${sub.name} team.`}
        primary={{ label: "Contact Us", href: "/contact" }}
        whatsapp={{ message: `Hello, I'd like to contact ${sub.name}.` }}
      />
    </>
  );
}