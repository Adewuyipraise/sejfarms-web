import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function ProductsLoading() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-border bg-brand-dark/90 py-16 md:py-24">
        <Container>
          <div className="h-4 w-32 rounded bg-white/20" />
          <div className="mt-4 h-10 w-2/3 rounded bg-white/20" />
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-card border border-border bg-white"
              >
                <div className="aspect-[4/3] bg-charcoal/5" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-16 rounded bg-brand/20" />
                  <div className="h-4 w-3/4 rounded bg-charcoal/10" />
                  <div className="h-6 w-1/2 rounded bg-charcoal/10" />
                  <div className="h-9 w-full rounded bg-brand/20" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}