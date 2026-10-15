import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Metric } from "@/components/shared/metric";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { verifiedMetrics } from "@/content/metrics";

export function MetricStrip() {
  if (verifiedMetrics.length === 0) return null;

  return (
    <Section className="border-b border-border bg-white py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="text-center font-display text-h3 font-semibold text-charcoal">
            Growing agriculture. Creating impact.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {verifiedMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <Metric {...m} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}