import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { BusinessCard } from "@/components/shared/business-card";
import { subsidiaries } from "@/content/subsidiaries";

export const metadata: Metadata = {
  title: "Subsidiaries",
  description:
    "Sejfarms Consults Limited operates alongside Ventures, Mosnerifoods and AIID Institute — each contributing to a stronger aquaculture value chain.",
};

export default function SubsidiariesPage() {
  return (
    <>
        <PageHero
            eyebrow="Our Subsidiaries"
            title="Subsidiaries of Sejfarms Consults Limited"
            description="A family of businesses working across agribusiness, food processing and training — all under the Sejfarms name."
            tone="dark"
            backgroundImage="/images/hero/home.jpg"
        />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subsidiaries.map((s) => (
              <BusinessCard
                key={s.slug}
                business={{
                  slug: s.slug,
                  name: s.name,
                  tagline: s.tagline,
                  description: s.description,
                  href: s.href,
                  image: s.image,
                }}
              />
            ))}
          </div>
        </Container>
      </Section>

      <PageCTA
        title="Interested in working with one of our subsidiaries?"
        description="Tell us which one and we'll put you in touch with the right team."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}