import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/fetch";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/queries";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

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

export async function FeaturedProjects() {
  const projects = await sanityFetch<SanityProject[]>({
    query: FEATURED_PROJECTS_QUERY,
    tags: ["project"],
  });

  const featured = projects.slice(0, 3);

  if (featured.length === 0) {
    // Placeholder state — shown until projects are published in Sanity
    return (
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Our Projects</Eyebrow>
              <Heading level={2} className="mt-4">
                Our Work in Action
              </Heading>
              <p className="mt-4 text-body-lg text-muted text-pretty">
                Detailed project case studies are being finalised. In the
                meantime, contact us to learn how we’ve helped farmers and
                partners across Nigeria.
              </p>
            </div>
            <Button href="/contact" variant="ghost">
              Talk to Us →
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Our Projects</Eyebrow>
            <Heading level={2} className="mt-4">
              Our Work in Action
            </Heading>
          </div>
          <Button href="/projects" variant="ghost">
            View All Projects →
          </Button>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StaggerItem key={project._id} className="flex">
            <Link
              href={`/projects/${project.slug}`}
              className="group flex w-full flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
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
                  {project.category} · {project.location}
                </span>
                <h3 className="mt-3 font-display text-h4 font-semibold text-charcoal">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted">
                  {project.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-charcoal group-hover:text-brand">
                  View Project{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}