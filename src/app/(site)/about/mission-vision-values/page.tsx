import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "Mission, Vision & Values",
  description: "What SEJFARMS is building, why, and the principles that guide us.",
};

export default function MissionVisionValuesPage() {
  return (
    <>
        <PageHero
        eyebrow="About"
        title="Mission, Vision & Values"
        description="The purpose that guides SEJFARMS and the principles we hold to as we grow."
        tone="dark"
        backgroundImage="/images/hero/home.jpg"
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-8">
              <Heading level={3}>{about.mission.title}</Heading>
              <p className="mt-4 text-charcoal/80">{about.mission.body}</p>
            </Card>
            <Card className="p-8">
              <Heading level={3}>{about.vision.title}</Heading>
              <p className="mt-4 text-charcoal/80">{about.vision.body}</p>
            </Card>
          </div>

          <Heading level={2} className="mt-20">Our Values</Heading>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v) => (
              <Card key={v.title} className="p-6">
                <Heading level={4}>{v.title}</Heading>
                <p className="mt-2 text-sm text-muted">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}