import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-border bg-white p-6">
      <blockquote className="flex-1 text-sm text-charcoal/85">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="font-semibold text-charcoal">{testimonial.author}</p>
        <p className="text-xs text-muted">
          {testimonial.role}
          {testimonial.institution !== "—" && ` · ${testimonial.institution}`}
        </p>
      </figcaption>
    </figure>
  );
}