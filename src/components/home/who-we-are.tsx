import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const pillars = [
  "Production",
  "Consultancy",
  "Training",
  "Infrastructure",
  "Value Addition",
  "Research",
  "Market Access",
];

export function WhoWeAre() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image left */}
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-card bg-brand/10">
            <Image
              src="/images/hero/home.jpg"
              alt="Sejfarms operations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          {/* Text right */}
          <Reveal delay={0.08} className="flex flex-col justify-center">
            <Eyebrow>Who We Are</Eyebrow>
            <Heading level={2} className="mt-4">
              More Than a Farm. An Agricultural Ecosystem.
            </Heading>

            <p className="mt-6 text-body-lg text-charcoal/80 text-pretty">
              Sejfarms Consults Limited is a leading one-stop-solution fish farm
              consultancy and training company committed to empowering farmers
              and creating opportunities across the aquaculture value chain.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {pillars.map((p) => (
                <li
                  key={p}
                  className="rounded-pill border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand"
                >
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/about" variant="ghost" className="px-0">
                Learn About Sejfarms →
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}