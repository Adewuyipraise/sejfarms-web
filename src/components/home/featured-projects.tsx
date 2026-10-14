import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/shared/project-card";
import { featuredProjects } from "@/content/projects";

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Our Projects</Eyebrow>
            <Heading level={2} className="mt-4">
              Our Work in Action
            </Heading>
          </div>
          <Button href="/projects" variant="ghost">
            View All Projects →
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}