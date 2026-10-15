"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

type Testimonial = {
  _id: string;
  author: string;
  slug: string;
  role: string;
  institution: string;
  quote: string;
  photo?: string;
};

export function ImpactTeaserClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[index];

  // Compute initials for the placeholder
  const initials = current.author
    .replace(/^(Mr\.|Mrs\.|Miss|Dr\.|Ms\.)\s+/i, "") // strip honorifics
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
              <Button href="/reviews">Read More Reviews →</Button>
            </div>
          </div>

          <figure
            key={current.slug}
            className="rounded-card border border-border bg-white p-8 shadow-soft"
          >
            <blockquote className="font-display text-p font-medium text-charcoal">
              “{current.quote}”
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
              {/* Photo or initials placeholder */}
              {current.photo ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand/10">
                  <Image
                    src={current.photo}
                    alt={current.author}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-base font-semibold text-brand">
                  {initials}
                </div>
              )}

              <div>
                <p className="font-semibold text-charcoal">
                  {current.author}
                </p>
                <p className="text-sm text-muted">
                  {current.role}
                  {current.institution !== "—" && ` · ${current.institution}`}
                </p>
              </div>
            </figcaption>

            {testimonials.length > 1 && (
              <div className="mt-6 flex gap-2">
                {testimonials.map((_, i) => (
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