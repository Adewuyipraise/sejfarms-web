import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { sanityFetch } from "@/sanity/fetch";
import { SERVICES_QUERY } from "@/sanity/queries";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { HashDetailsOpener } from "@/components/shared/hash-details-opener";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seventeen services across five groups — from farm operations and infrastructure through consultancy, training, innovation and market access.",
};

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
      "Everything you need to establish and run a productive fish farm — from pond construction and hatchery operations through to inputs and open-water systems.",
  },
  "consultancy-investment": {
    number: "02",
    title: "Consultancy & Investment",
    description:
      "Technical consulting, farm design, investment planning, and opportunities to partner with us in the growing aquaculture sector.",
  },
  "training-development": {
    number: "03",
    title: "Training & Development",
    description:
      "Practical training for farmers and interns, plus staff training and recruitment services through AIID Institute.",
  },
  "innovation-specialty": {
    number: "04",
    title: "Innovation & Specialty",
    description:
      "Cutting-edge research and development advancing aquaculture practice — breeding, feed, biosecurity, and sustainability.",
  },
  "market-value-chain": {
    number: "05",
    title: "Market & Value Chain",
    description:
      "Connecting farmers to buyers and transforming raw fish into higher-margin value-added products through Mosnerifoods.",
  },
};

const GROUP_ORDER = [
  "farm-operations",
  "consultancy-investment",
  "training-development",
  "innovation-specialty",
  "market-value-chain",
];

export default async function ServicesPage() {
  const services = await sanityFetch<SanityService[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  });

  const groups = GROUP_ORDER.map((slug) => ({
    slug,
    meta: GROUP_META[slug],
    services: services.filter((s) => s.groupSlug === slug),
  })).filter((g) => g.services.length > 0);

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
          <HashDetailsOpener />
          {groups.length === 0 ? (
            <p className="text-center text-muted">
              Services are being finalised. Check back shortly.
            </p>
          ) : (
            <Stagger className="space-y-4">
              {groups.map((group) => (
                <StaggerItem key={group.slug}>
                <details
                  id={group.slug}
                  className="group scroll-mt-28 rounded-card border border-border bg-white transition-all"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 md:p-8 [&::-webkit-details-marker]:hidden">
                    <div className="flex items-start gap-5">
                      <span className="font-display text-sm font-semibold text-brand">
                        {group.meta.number}
                      </span>
                      <div>
                        <h3 className="font-display text-h3 font-semibold text-charcoal">
                          {group.meta.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm text-muted">
                          {group.meta.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-border p-6 md:p-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {group.services.map((service) => (
                        <Link
                          key={service._id}
                          href={`/services/${service.slug}`}
                          className="group/card flex flex-col overflow-hidden rounded-lg border border-border bg-cream transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-soft"
                        >
                          {service.image && (
                            <div className="relative aspect-[16/9] overflow-hidden bg-brand/5">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          )}
                          <div className="flex flex-1 flex-col p-5">
                            <h4 className="font-display font-semibold text-charcoal group-hover/card:text-brand">
                              {service.title}
                            </h4>
                            <p className="mt-2 flex-1 text-xs text-muted">
                              {service.shortDescription}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                              Learn more
                              <ArrowRight className="h-3 w-3 transition-transform group-hover/card:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>
                </StaggerItem>
              ))}
            </Stagger>
          )}
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