import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/fetch";
import { SUBSIDIARIES_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Subsidiaries",
  description:
    "Sejfarms Consults Limited operates alongside Ventures, Mosnerifoods and AIID Institute — each contributing to a stronger aquaculture value chain.",
};

type SanitySubsidiary = {
  _id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  image?: string;
  whatsapp?: string;
  email?: string;
};

export default async function SubsidiariesPage() {
  const subsidiaries = await sanityFetch<SanitySubsidiary[]>({
    query: SUBSIDIARIES_QUERY,
    tags: ["subsidiary"],
  });

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
          {subsidiaries.length === 0 ? (
            <p className="text-center text-muted">
              Subsidiary information is being finalised.
            </p>
          ) : (
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subsidiaries.map((sub) => (
                <StaggerItem key={sub._id} className="flex">
                <Link
                  href={`/subsidiaries/${sub.slug}`}
                  className="group flex w-full flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  {sub.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand/10">
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-h4 font-semibold text-charcoal">
                      {sub.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand">
                      {sub.tagline}
                    </p>
                    <p className="mt-3 flex-1 text-sm text-muted">
                      {sub.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-charcoal transition-colors group-hover:text-brand">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
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