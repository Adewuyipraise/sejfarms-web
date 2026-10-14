import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { ServiceGroupAccordion } from "@/components/shared/service-group";
import { serviceGroups } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seventeen services across five groups — from farm operations and infrastructure through consultancy, training, innovation and market access.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive Solutions Across the Aquaculture Value Chain"
        description="Sejfarms Consults Limited offers a complete range of services — from establishing your farm and producing stock through to training, value addition and market access."
        tone="dark"
        backgroundImage="/images/hero/default.jpg"
      />

      <Section>
        <Container>
          <div className="space-y-4">
            {serviceGroups.map((group) => (
              <ServiceGroupAccordion key={group.slug} group={group} />
            ))}
          </div>
        </Container>
      </Section>

      <PageCTA
        title="Not sure which service fits?"
        description="Tell us what you're working on and we'll point you in the right direction."
        primary={{ label: "Talk to Us", href: "/contact" }}
      />
    </>
  );
}