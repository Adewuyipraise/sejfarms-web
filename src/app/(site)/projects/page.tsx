import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { sanityFetch } from "@/sanity/fetch";
import { PROJECTS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects delivered by Sejfarms Consults Limited across aquaculture, agriculture and training.",
};

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  featured: boolean;
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<SanityProject[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
  });

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Our Work in Action"
        description="Selected projects showing how Sejfarms works with farmers, partners and communities."
        tone="dark"
        backgroundImage="/images/projects/fish-farm-development.jpg"
      />

      <Section>
        <Container>
          {projects.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-body-lg text-muted">
                Detailed project case studies are being finalised. Check back
                shortly, or contact us to learn more about our work.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                      {project.category} · {project.location} · {project.year}
                    </span>
                    <h3 className="mt-3 font-display text-h4 font-semibold text-charcoal">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted">
                      {project.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-charcoal group-hover:text-brand">
                      View Project
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <PageCTA
        title="Have a project in mind?"
        description="Tell us what you're working on and we'll explore how we can help."
        primary={{ label: "Discuss Your Project", href: "/contact?interest=project" }}
      />
    </>
  );
}