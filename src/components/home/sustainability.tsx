import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const pillars = [
  { icon: "🌱", title: "Sustainable Agriculture" },
  { icon: "🐟", title: "Responsible Aquaculture" },
  { icon: "👨🏾‍🌾", title: "Farmer Empowerment" },
  { icon: "🔬", title: "Research & Innovation" },
];

export function Sustainability() {
  return (
    <Section>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Sustainability</Eyebrow>
          <Heading level={2} className="mt-4">
            Growing Today. Protecting Tomorrow.
          </Heading>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <StaggerItem
              key={p.title}
              className="rounded-card border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="text-3xl" aria-hidden>{p.icon}</div>
              <h3 className="mt-4 font-display text-h4 font-semibold">
                {p.title}
              </h3>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}