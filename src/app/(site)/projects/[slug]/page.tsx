import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageCTA } from "@/components/shared/page-cta";
import { projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
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

      <Section>
        <Container>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
            {project.category} · {project.location} · {project.year}
          </p>
          <Heading level={1} className="mt-3">{project.title}</Heading>
          <p className="mt-6 max-w-3xl text-body-lg text-charcoal/80 text-pretty">
            {project.description}
          </p>
        </Container>
      </Section>

      {/* This block is a placeholder for the full challenge/approach/outcome once real project data exists */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <Heading level={3}>Challenge</Heading>
              <p className="mt-3 text-muted">
                Detailed challenge narrative to be added once confirmed with SEJFARMS.
              </p>
            </div>
            <div>
              <Heading level={3}>Our Approach</Heading>
              <p className="mt-3 text-muted">
                Detailed approach narrative to be added once confirmed with SEJFARMS.
              </p>
            </div>
            <div>
              <Heading level={3}>Outcome</Heading>
              <p className="mt-3 text-muted">
                Detailed outcome narrative to be added once confirmed with SEJFARMS.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <PageCTA
        title="Start something similar"
        description="If you're planning a project like this, let's talk."
        primary={{ label: "Contact Us", href: "/contact?interest=project" }}
      />
    </>
  );
}