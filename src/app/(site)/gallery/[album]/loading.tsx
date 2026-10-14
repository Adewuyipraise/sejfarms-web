import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AlbumLoading() {
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-card bg-charcoal/5"
              />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}