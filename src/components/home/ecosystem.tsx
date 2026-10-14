import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { BusinessCard } from "@/components/shared/business-card";
import { subsidiaries } from "@/content/subsidiaries";

export function Ecosystem() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Our Group</Eyebrow>
          <Heading level={2} className="mt-4">
            One Group. Multiple Businesses.
          </Heading>
          <p className="mt-4 text-body-lg text-muted text-pretty">
            Sejfarms Consults Limited operates alongside a family of
            subsidiaries working across training, value addition and enterprise
            — each contributing to a stronger aquaculture value chain.
          </p>
        </div>

        <div className="mt-16 overflow-x-auto">
          <EcosystemDiagram />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subsidiaries.map((s) => (
            <BusinessCard
              key={s.slug}
              business={{
                slug: s.slug,
                name: s.name,
                tagline: s.tagline,
                description: s.description,
                href: s.href,
                image: s.image,
              }}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function EcosystemDiagram() {
  return (
    <div className="mx-auto min-w-[720px] max-w-4xl">
      <svg viewBox="0 0 720 300" className="w-full" role="img" aria-label="Sejfarms Group structure">
        <rect x="220" y="10" width="280" height="50" rx="12" className="fill-brand" />
        <text x="360" y="42" textAnchor="middle" className="fill-white font-display text-[14px] font-bold">
          SEJFARMS CONSULTS LTD
        </text>

        <line x1="360" y1="60" x2="360" y2="90" className="stroke-brand" strokeWidth="2" />
        <line x1="120" y1="90" x2="600" y2="90" className="stroke-brand" strokeWidth="2" />
        <line x1="120" y1="90" x2="120" y2="130" className="stroke-brand" strokeWidth="2" />
        <line x1="360" y1="90" x2="360" y2="130" className="stroke-brand" strokeWidth="2" />
        <line x1="600" y1="90" x2="600" y2="130" className="stroke-brand" strokeWidth="2" />

        <rect x="40" y="130" width="160" height="60" rx="10" className="fill-brand/10 stroke-brand/30" />
        <text x="120" y="155" textAnchor="middle" className="fill-brand font-display text-[13px] font-semibold">
          Sejfarms Ventures
        </text>
        <text x="120" y="175" textAnchor="middle" className="fill-muted font-sans text-[11px]">
          Agribusiness
        </text>

        <rect x="280" y="130" width="160" height="60" rx="10" className="fill-brand/10 stroke-brand/30" />
        <text x="360" y="155" textAnchor="middle" className="fill-brand font-display text-[13px] font-semibold">
          Mosnerifoods
        </text>
        <text x="360" y="175" textAnchor="middle" className="fill-muted font-sans text-[11px]">
          Food & Value Addition
        </text>

        <rect x="520" y="130" width="160" height="60" rx="10" className="fill-brand/10 stroke-brand/30" />
        <text x="600" y="155" textAnchor="middle" className="fill-brand font-display text-[13px] font-semibold">
          AIID Institute
        </text>
        <text x="600" y="175" textAnchor="middle" className="fill-muted font-sans text-[11px]">
          Training & Development
        </text>

        <line x1="120" y1="190" x2="120" y2="215" className="stroke-brand/40" strokeWidth="2" />
        <line x1="360" y1="190" x2="360" y2="215" className="stroke-brand/40" strokeWidth="2" />
        <line x1="600" y1="190" x2="600" y2="215" className="stroke-brand/40" strokeWidth="2" />
        <line x1="120" y1="215" x2="600" y2="215" className="stroke-brand/40" strokeWidth="2" />
        <line x1="360" y1="215" x2="360" y2="240" className="stroke-brand/40" strokeWidth="2" />

        <rect x="240" y="240" width="240" height="40" rx="8" className="fill-brand-dark" />
        <text x="360" y="265" textAnchor="middle" className="fill-white font-display text-[12px] font-bold tracking-wider">
          AQUACULTURE VALUE CHAIN
        </text>
      </svg>
    </div>
  );
}