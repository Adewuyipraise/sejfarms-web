import { sanityFetch } from "@/sanity/fetch";
import { FEATURED_TESTIMONIALS_QUERY } from "@/sanity/queries";
import { ImpactTeaserClient } from "./impact-teaser-client";

type SanityTestimonial = {
  _id: string;
  author: string;
  slug: string;
  role: string;
  institution: string;
  quote: string;
  photo?: string;
  featured: boolean;
};

export async function ImpactTeaser() {
  const testimonials = await sanityFetch<SanityTestimonial[]>({
    query: FEATURED_TESTIMONIALS_QUERY,
    tags: ["testimonial"],
  });

  if (testimonials.length === 0) return null;

  return <ImpactTeaserClient testimonials={testimonials} />;
}