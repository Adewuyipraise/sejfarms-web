import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { services, getServiceBySlug } from "@/content/services";
import { getServiceDetail } from "@/content/service-details";
import { whatsappMessages } from "@/lib/whatsapp";

export const instant = false;

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) notFound();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.shortDescription}
        tone={detail.heroImage ? "dark" : "light"}
        backgroundImage={detail.heroImage}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-body-lg text-charcoal/80 text-pretty">
              {detail.overview}
            </p>
          </div>
        </Container>
      </Section>

      {detail.offering && detail.offering.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Heading level={2}>What We Offer</Heading>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {detail.offering.map((o) => (
                <div
                  key={o.title}
                  className="rounded-card border border-border bg-cream p-6"
                >
                  <Heading level={4}>{o.title}</Heading>
                  <p className="mt-2 text-sm text-muted">{o.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {detail.process && detail.process.length > 0 && (
        <Section>
          <Container>
            <Heading level={2}>How We Work</Heading>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {detail.process.map((p) => (
                <div key={p.step} className="border-l-2 border-brand pl-5">
                  <p className="font-display text-sm font-semibold text-brand">
                    {p.step}
                  </p>
                  <Heading level={4} className="mt-1">
                    {p.title}
                  </Heading>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {detail.faqs && detail.faqs.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Heading level={2}>Frequently Asked Questions</Heading>
            <dl className="mt-10 max-w-3xl divide-y divide-border">
              {detail.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-display font-semibold text-charcoal">
                    {f.q}
                  </dt>
                  <dd className="mt-2 text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      )}

      <PageCTA
        title={`Ready to discuss ${service.title.toLowerCase()}?`}
        description="Speak with our team and we'll help you figure out the right next step."
        primary={{ label: "Contact Us", href: "/contact" }}
        whatsapp={{ message: whatsappMessages.general }}
      />
    </>
  );
}