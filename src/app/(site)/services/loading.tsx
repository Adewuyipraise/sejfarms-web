import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function ServicesLoading() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-border bg-brand-dark/90 py-16 md:py-24">
        <Container>
          <div className="h-4 w-32 rounded bg-white/20" />
          <div className="mt-4 h-10 w-3/4 rounded bg-white/20" />
        </Container>
      </div>

      <Section>
        <Container>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-card border border-border bg-white p-6 md:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="h-4 w-8 rounded bg-brand/20" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-2/3 rounded bg-charcoal/10" />
                    <div className="h-3 w-full rounded bg-charcoal/5" />
                    <div className="h-3 w-5/6 rounded bg-charcoal/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}