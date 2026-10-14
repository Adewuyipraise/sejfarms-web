import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Metric } from "@/components/shared/metric";
import { verifiedMetrics } from "@/content/metrics";

export function MetricStrip() {
  if (verifiedMetrics.length === 0) return null;

  return (
    <Section className="border-b border-border bg-white py-16 md:py-20">
      <Container>
        <p className="text-center font-display text-h3 font-semibold text-charcoal">
          Growing agriculture. Creating impact.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {verifiedMetrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>
      </Container>
    </Section>
  );
}