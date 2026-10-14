import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "Our Story",
  description: about.story.intro,
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={about.story.title}
        description={about.story.intro}
        tone="dark"
        backgroundImage="/images/hero/home.jpg"
      />

      <Section>
        <Container>
          <Prose className="mx-auto text-justify">
            {about.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Prose>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <Heading level={2} className="text-center">
            Our Evolution
          </Heading>
          <ol className="relative mx-auto mt-16 max-w-3xl space-y-10 border-l border-border pl-8">
            {about.timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-cream bg-brand" />
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
                  {item.year}
                </p>
                <Heading level={3} className="mt-1">{item.title}</Heading>
                <p className="mt-1 text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <PageCTA
        title="Learn more about SEJFARMS"
        description="Explore how our group is structured and the businesses that sit within it."
        primary={{ label: "Our subsidiaries", href: "/subsidiaries" }}
      />
    </>
  );
}