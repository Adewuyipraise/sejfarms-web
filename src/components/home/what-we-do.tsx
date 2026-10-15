import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/fetch";
import { SERVICES_QUERY } from "@/sanity/queries";

type SanityService = {
  _id: string;
  title: string;
  slug: string;
  groupSlug: string;
  shortDescription: string;
  image?: string;
};

const GROUP_META: Record<
  string,
  { number: string; title: string; description: string }
> = {
  "farm-operations": {
    number: "01",
    title: "Farm Operations & Infrastructure",
    description:
      "Pond construction, hatchery operations, cage culture, inputs and open-water systems.",
  },
  "consultancy-investment": {
    number: "02",
    title: "Consultancy & Investment",
    description:
      "Technical consulting, farm design, investment planning and partnership opportunities.",
  },
  "training-development": {
    number: "03",
    title: "Training & Development",
    description:
      "Practical training, internships and staff development via AIID Institute.",
  },
  "innovation-specialty": {
    number: "04",
    title: "Innovation & Specialty",
    description:
      "Applied research advancing breeding, feed, biosecurity and sustainability.",
  },
  "market-value-chain": {
    number: "05",
    title: "Market & Value Chain",
    description:
      "Connecting farmers to buyers and transforming raw fish into value-added products.",
  },
};

const GROUP_ORDER = [
  "farm-operations",
  "consultancy-investment",
  "training-development",
  "innovation-specialty",
  "market-value-chain",
];

const GROUP_IMAGES: Record<string, string> = {
  "farm-operations": "/images/projects/fish-farm-development.jpg",
  "consultancy-investment": "/images/hero/home.jpg",
  "training-development": "/images/case-studies/farmer-capacity-programme.jpg",
  "innovation-specialty": "/images/projects/sustainable-crop-production.jpg",
  "market-value-chain": "/images/hero/processingbanner.jpg",
};

export async function WhatWeDo() {
  const services = await sanityFetch<SanityService[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  });

  if (services.length === 0) return null;

  const groups = GROUP_ORDER.map((slug) => ({
    slug,
    meta: GROUP_META[slug],
    image: GROUP_IMAGES[slug],
    count: services.filter((s) => s.groupSlug === slug).length,
  })).filter((g) => g.count > 0);

  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>What We Do</Eyebrow>
          <Heading level={2} className="mt-4">
            Comprehensive Aquaculture Solutions
          </Heading>
          <p className="mt-4 text-body-lg text-muted text-pretty">
            Seventeen services across five groups — from establishing your farm
            and producing stock through to training, value addition and market
            access.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link
              key={group.slug}
              href={`/services#${group.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              {group.image && (
                <div className="relative aspect-[16/9] overflow-hidden bg-brand/10">
                  <Image
                    src={group.image}
                    alt={group.meta.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-display text-sm font-semibold text-brand">
                  {group.meta.number}
                </span>
                <h3 className="mt-3 font-display text-h3 font-semibold text-charcoal">
                  {group.meta.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted">
                  {group.meta.description}
                </p>
                <p className="mt-4 text-xs font-medium text-muted">
                  {group.count} {group.count === 1 ? "service" : "services"}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-charcoal transition-colors group-hover:text-brand">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}

          <div className="flex flex-col justify-center rounded-card border border-dashed border-brand/30 bg-brand/5 p-6">
            <h3 className="font-display text-h4 font-semibold text-charcoal">
              See all services
            </h3>
            <p className="mt-2 text-sm text-muted">
              Browse the full catalogue with detailed descriptions for each
              service.
            </p>
            <div className="mt-6">
              <Button href="/services" variant="primary" size="md">
                All Services
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}