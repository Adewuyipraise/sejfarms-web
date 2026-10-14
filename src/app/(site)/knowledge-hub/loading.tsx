import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function KnowledgeHubLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="border-b border-border bg-brand-dark/90 py-16 md:py-24">
        <Container>
          <div className="h-4 w-32 rounded bg-white/20" />
          <div className="mt-4 h-10 w-3/4 rounded bg-white/20" />
          <div className="mt-4 h-4 w-1/2 rounded bg-white/10" />
        </Container>
      </div>

      {/* Grid skeleton */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-card border border-border bg-white"
              >
                <div className="aspect-[16/9] bg-charcoal/5" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-20 rounded bg-brand/20" />
                  <div className="h-5 w-5/6 rounded bg-charcoal/10" />
                  <div className="h-3 w-full rounded bg-charcoal/5" />
                  <div className="h-3 w-3/4 rounded bg-charcoal/5" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}