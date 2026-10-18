import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { partners } from "@/content/partners";

export function Partners() {
  if (partners.length === 0) return null;

  return (
    <Section className="bg-white">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Partners</Eyebrow>
          <Heading level={2} className="mt-4">
            Our Partners & Collaborators
          </Heading>
          <p className="mt-4 text-body-lg text-muted text-pretty">
            We work with organizations across agriculture, aquaculture,
            research, development and enterprise to create practical solutions
            and expand impact.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <StaggerItem key={p.name} className="flex items-center justify-center">
              <Image
                src={p.logo}
                alt={p.name}
                width={140}
                height={60}
                className="h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12">
          <Button href="/work-with-us?interest=partnership" variant="secondary">
            Become a Partner →
          </Button>
        </div>
      </Container>
    </Section>
  );
}