"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/content/testimonials";

export function ImpactTeaser() {
  const [index, setIndex] = useState(0);
  const featured = testimonials.filter((t) => t.featured);

  useEffect(() => {
    if (featured.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;
  const current = featured[index];

  return (
    <Section className="bg-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Our Impact</Eyebrow>
            <Heading level={2} className="mt-4">
              Creating Impact Beyond Production
            </Heading>
            <p className="mt-6 text-body-lg text-charcoal/80 text-pretty">
              Our work reaches beyond our own farms. We build the capacity of
              farmers, train the next generation of aquaculture professionals,
              and strengthen the value chain across the communities we serve.
            </p>
            <div className="mt-8">
              <Button href="/reviews">
                Read More Reviews →
              </Button>
            </div>
          </div>

          <figure
            key={current.slug}
            className="rounded-card border border-border bg-white p-8 shadow-soft transition-opacity duration-1000"
          >
            <blockquote className="font-display text-p font-medium text-charcoal">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-6">
              <p className="font-semibold text-charcoal">{current.author}</p>
              <p className="text-sm text-muted">
                {current.role}
                {current.institution !== "—" && ` · ${current.institution}`}
              </p>
            </figcaption>

            {featured.length > 1 && (
              <div className="mt-6 flex gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`View testimonial ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === index ? "bg-brand" : "bg-brand/20"
                    }`}
                  />
                ))}
              </div>
            )}
          </figure>
        </div>
      </Container>
    </Section>
  );
}