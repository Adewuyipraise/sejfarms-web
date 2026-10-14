import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/shared/project-card";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects delivered by SEJFARMS Group across aquaculture, agriculture and training.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Our Work in Action"
        description="Selected projects showing how SEJFARMS works with farmers, partners and communities across the value chain."
        tone="dark"
        backgroundImage="/images/projects/fish-farm-development.jpg"
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
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