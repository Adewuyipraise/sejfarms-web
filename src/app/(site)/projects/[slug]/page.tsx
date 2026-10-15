import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageCTA } from "@/components/shared/page-cta";
import { sanityFetch } from "@/sanity/fetch";
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/sanity/queries";

export const instant = false;

type Params = { slug: string };

type SanityProjectDetail = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  description: string;
  challenge?: string;
  approach?: string[];
  outcome?: string[];
  image: string;
  featured: boolean;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: PROJECT_SLUGS_QUERY,
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
  const project = await sanityFetch<SanityProjectDetail | null>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: [`project:${slug}`],
  });
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await sanityFetch<SanityProjectDetail | null>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: [`project:${slug}`],
  });
  if (!project) notFound();

  return (
    <>
      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full bg-brand/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Title + meta */}
      <Section>
        <Container>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            {project.category} · {project.location} · {project.year}
          </p>
          <Heading level={1} className="mt-3">
            {project.title}
          </Heading>
          <p className="mt-6 max-w-3xl text-body-lg text-charcoal/80 text-pretty">
            {project.description}
          </p>
        </Container>
      </Section>

      {/* Challenge / Approach / Outcome */}
      {(project.challenge ||
        (project.approach && project.approach.length > 0) ||
        (project.outcome && project.outcome.length > 0)) && (
        <Section className="bg-white">
          <Container>
            <div className="mx-auto max-w-3xl space-y-12">
              {project.challenge && (
                <div>
                  <Heading level={3}>Challenge</Heading>
                  <p className="mt-3 text-charcoal/80">{project.challenge}</p>
                </div>
              )}

              {project.approach && project.approach.length > 0 && (
                <div>
                  <Heading level={3}>Our Approach</Heading>
                  <ul className="mt-4 space-y-3">
                    {project.approach.map((step, i) => (
                      <li key={i} className="flex gap-3 text-charcoal/80">
                        <span className="font-display text-sm font-semibold text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.outcome && project.outcome.length > 0 && (
                <div>
                  <Heading level={3}>Outcome</Heading>
                  <ul className="mt-4 space-y-3">
                    {project.outcome.map((result, i) => (
                      <li key={i} className="flex gap-3 text-charcoal/80">
                        <span className="text-brand">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      <PageCTA
        title="Start something similar"
        description="If you're planning a project like this, let's talk."
        primary={{ label: "Contact Us", href: "/contact?interest=project" }}
      />
    </>
  );
}