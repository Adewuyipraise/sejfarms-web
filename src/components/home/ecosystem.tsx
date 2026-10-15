import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { sanityFetch } from "@/sanity/fetch";
import { SUBSIDIARIES_QUERY } from "@/sanity/queries";
import { EcosystemDiagram } from "./ecosystem-diagram";

type SanitySubsidiary = {
  _id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  image?: string;
};

export async function Ecosystem() {
  const subsidiaries = await sanityFetch<SanitySubsidiary[]>({
    query: SUBSIDIARIES_QUERY,
    tags: ["subsidiary"],
  });

  return (
    <Section className="bg-white">
      <Container>
        {/* Header — text on left, diagram on right */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Our Group</Eyebrow>
            <Heading level={2} className="mt-4">
              One Group. Multiple Businesses.
            </Heading>
            <p className="mt-4 text-body-lg text-muted text-pretty">
              Sejfarms Consults Limited operates alongside a family of
              subsidiaries working across training, value addition and
              enterprise — each contributing to a stronger aquaculture value
              chain.
            </p>
          </div>

          <div className="overflow-x-auto">
            <EcosystemDiagram />
          </div>
        </div>

        {/* Subsidiary cards */}
        {subsidiaries.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subsidiaries.map((sub) => (
              <Link
                key={sub._id}
                href={`/subsidiaries/${sub.slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lift"
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
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}