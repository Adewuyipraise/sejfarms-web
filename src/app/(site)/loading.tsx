import { Container } from "@/components/ui/container";

export default function SiteLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[60vh] w-full bg-brand/10 md:h-[70vh]" />

      {/* Metric strip skeleton */}
      <div className="border-b border-border bg-white py-16 md:py-20">
        <Container>
          <div className="mx-auto h-6 w-64 rounded bg-charcoal/10" />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-16 gap-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="h-12 w-20 rounded bg-charcoal/10" />
                <div className="h-4 w-24 rounded bg-charcoal/5" />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Content skeleton */}
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="h-8 w-3/4 rounded bg-charcoal/10" />
          <div className="h-4 w-full rounded bg-charcoal/5" />
          <div className="h-4 w-5/6 rounded bg-charcoal/5" />
          <div className="h-4 w-4/6 rounded bg-charcoal/5" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-card border border-border bg-white"
            >
              <div className="aspect-[16/10] bg-charcoal/5" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-2/3 rounded bg-charcoal/10" />
                <div className="h-3 w-full rounded bg-charcoal/5" />
                <div className="h-3 w-4/5 rounded bg-charcoal/5" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}