import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Metric } from "@/components/shared/metric";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { verifiedMetrics } from "@/content/metrics";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "The farmers, communities and value chains SEJFARMS has reached.",
};

const pillars = [
  { icon: "🌱", title: "Sustainable Agriculture" },
  { icon: "🐟", title: "Responsible Aquaculture" },
  { icon: "👨🏾‍🌾", title: "Farmer Empowerment" },
  { icon: "🔬", title: "Research & Innovation" },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Creating Impact Beyond Production"
        description="Our work reaches beyond our own farms — building capability in farmers, creating opportunity for young people and strengthening the value chain."
        tone="dark"
        backgroundImage="/images/projects/farmer-capacity-development.jpg"
      />

      <Section>
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {verifiedMetrics.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="sustainability" className="bg-white">
        <Container>
          <h2 className="text-center font-display text-h2 font-bold">
            Our Commitment to Sustainability
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-card border border-border bg-cream p-6"
              >
                <div className="text-3xl" aria-hidden>{p.icon}</div>
                <h3 className="mt-4 font-display text-h4 font-semibold">
                  {p.title}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <PageCTA
        title="Partner with SEJFARMS"
        description="If your organisation shares our commitment to sustainable agriculture, let's talk."
        primary={{ label: "Become a Partner", href: "/work-with-us?interest=partnership" }}
      />
    </>
  );
}