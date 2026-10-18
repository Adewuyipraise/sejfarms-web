import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { valueProps } from "@/content/value-props";

export function WhySejfarms() {
  return (
    <Section className="bg-brand text-white">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-accent">Why SEJFARMS</Eyebrow>
          <Heading level={2} className="mt-4 text-white">
            Why Work With SEJFARMS?
          </Heading>
        </Reveal>

        <Stagger className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((v) => (
            <StaggerItem key={v.title} className="border-l-2 border-accent pl-6">
              <h3 className="font-display text-h4 font-semibold text-white">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-cream/80">{v.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}