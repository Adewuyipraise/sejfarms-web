import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "SEJFARMS Group is an integrated African agribusiness ecosystem connecting aquaculture, agriculture, knowledge, innovation, value addition and market opportunities.",
  openGraph: {
    images: [{ url: "/images/og/about.jpg", width: 1200, height: 630 }],
  },
};

const pages = [
  { title: "Our Story",                href: "/about/our-story",                 description: "How SEJFARMS grew from a single farm into an integrated agribusiness group." },
  { title: "Mission, Vision & Values", href: "/about/mission-vision-values",     description: "What we're building, why, and the principles that guide us." },
  { title: "Leadership & Team",        href: "/about/leadership",                description: "The people leading SEJFARMS across its businesses and initiatives." },
  { title: "Our Impact",               href: "/about/impact",                    description: "The farmers, communities and value chains we've reached." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About Sejfarms Consults Limited"
        description="A leading one-stop-solution fish farm consultancy and training company focused on empowering fish farmers across Africa and beyond."
        tone="dark"
        backgroundImage="/images/projects/fish-farm-development.jpg"
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-card border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Heading level={3}>{p.title}</Heading>
                <p className="mt-3 text-muted">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}