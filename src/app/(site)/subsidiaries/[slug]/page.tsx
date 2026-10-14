import Image from "next/image";  
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { subsidiaries } from "@/content/subsidiaries";
import { getSubsidiaryDetail } from "@/content/subsidiary-details";

export const instant = false;

type Params = { slug: string };

export function generateStaticParams() {
  return subsidiaries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sub = subsidiaries.find((s) => s.slug === slug);
  if (!sub) return {};
  return { title: sub.name, description: sub.description };
}

export default function SubsidiaryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SubsidiaryContent params={params} />
    </Suspense>
  );
}

async function SubsidiaryContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sub = subsidiaries.find((s) => s.slug === slug);
  const detail = getSubsidiaryDetail(slug);
  if (!sub || !detail) notFound();

  return (
    <>
      <PageHero
        eyebrow="Subsidiary of Sejfarms Consults Limited"
        title={sub.name}
        description={sub.tagline}
        tone={detail.heroImage ? "dark" : "light"}
        backgroundImage={detail.heroImage}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level={2}>About {sub.name}</Heading>
            <p className="mt-4 text-body-lg text-charcoal/80 text-pretty">
              {detail.about}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
            <Heading level={2}>What We Do</Heading>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detail.services.map((s, i) => (
                <div
                key={s.title}
                className="flex flex-col overflow-hidden rounded-card border border-border bg-cream"
                >
                <div className="relative aspect-[16/9] overflow-hidden bg-brand/10">
                    <Image
                    src={sub.image ?? "/images/hero/default.jpg"}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <Heading level={4}>{s.title}</Heading>
                    <p className="mt-2 flex-1 text-sm text-muted">{s.description}</p>
                </div>
                </div>
            ))}
            </div>
        </Container>
      </Section>

      <PageCTA
        title={`Work with ${sub.name}`}
        description={`Get in touch with the ${sub.name} team.`}
        primary={{ label: "Contact Us", href: "/contact" }}
        whatsapp={{ message: `Hello, I'd like to contact ${sub.name}.` }}
      />
    </>
  );
}