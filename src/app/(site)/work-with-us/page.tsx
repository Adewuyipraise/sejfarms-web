import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Work With Us",
  description: "Whether you're a farmer, investor, organisation, student or buyer — find the right way to work with SEJFARMS.",
};

const paths = [
  {
    title: "I am a farmer",
    description: "Technical support, farm planning, pond construction or training.",
    href: "/what-we-do/consultancy",
    cta: "Talk to a consultant",
  },
  {
    title: "I want to work with SEJFARMS",
    description: "Partnership, investment, research or corporate collaboration.",
    href: "/contact?interest=partnership",
    cta: "Become a partner",
  },
  {
    title: "I want to learn",
    description: "Training programmes, internships and the SEJFARMS Knowledge Hub.",
    href: "/what-we-do/training-internship",
    cta: "View training",
  },
  {
    title: "I want to buy products",
    description: "Fresh fish, processed products and agricultural produce.",
    href: "/contact?interest=products",
    cta: "Enquire about products",
  },
  {
    title: "I represent an organisation",
    description: "Development projects, NGO collaboration or institutional programmes.",
    href: "/contact?interest=organisation",
    cta: "Contact us",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work With Us"
        title="How Can We Work Together?"
        description="Pick the path that fits you best — we'll take you straight to the right place."
        tone="dark"
        backgroundImage="/images/hero/home.jpg"
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paths.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col rounded-card border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Heading level={3}>{p.title}</Heading>
                <p className="mt-3 flex-1 text-muted">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {p.cta}
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