import type { Metadata } from "next";
import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { ReviewSubmissionForm } from "@/components/shared/review-submission-form";
import { sanityFetch } from "@/sanity/fetch";
import {
  TESTIMONIALS_QUERY,
  INSTITUTION_REVIEWS_QUERY,
} from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description:
    "What students, interns, partner institutions and clients say about working with Sejfarms Consults Limited.",
};

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

type SanityInstitutionReview = {
  _id: string;
  institution: string;
  slug: string;
  faculty?: string;
  department: string;
  summary: string;
  pdfUrl?: string;
  featured: boolean;
};

export default async function ReviewsPage() {
  const [testimonials, institutions] = await Promise.all([
    sanityFetch<SanityTestimonial[]>({
      query: TESTIMONIALS_QUERY,
      tags: ["testimonial"],
    }),
    sanityFetch<SanityInstitutionReview[]>({
      query: INSTITUTION_REVIEWS_QUERY,
      tags: ["institutionReview"],
    }),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What Our Partners & Clients Say"
        description="Reviews from institutions, students, and clients who have worked with Sejfarms Consults Limited over the years."
        tone="dark"
        backgroundImage="/images/case-studies/farmer-capacity-programme.jpg"
      />

      {institutions.length > 0 && (
        <Section>
          <Container>
            <Heading level={2}>Institutional Reviews</Heading>
            <p className="mt-4 max-w-3xl text-muted">
              Reviews from academic institutions whose students and staff have
              worked with Sejfarms through internships, training and
              collaborative programmes.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {institutions.map((review) => (
                <InstitutionCard key={review._id} review={review} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Heading level={2}>What Our People Say</Heading>
            <p className="mt-4 max-w-3xl text-muted">
              Testimonials from students, interns and clients who have trained
              or worked with us.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-cream">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Heading level={2}>Share Your Experience</Heading>
            <p className="mt-4 text-muted">
              Have you worked with Sejfarms Consults Limited? We'd love to hear
              from you. Reviews are moderated before publication.
            </p>
          </div>
          <div className="mt-10">
            <ReviewSubmissionForm />
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: SanityTestimonial;
}) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-border bg-white p-6">
      <blockquote className="flex-1 text-sm text-charcoal/85">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-4">
        {testimonial.photo ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-brand/10">
            <Image
              src={testimonial.photo}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-sm font-semibold text-brand">
            {testimonial.author.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-semibold text-charcoal">{testimonial.author}</p>
          <p className="text-xs text-muted">
            {testimonial.role}
            {testimonial.institution !== "—" && ` · ${testimonial.institution}`}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function InstitutionCard({
  review,
}: {
  review: SanityInstitutionReview;
}) {
  return (
    <div className="flex flex-col rounded-card border border-border bg-white p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <FileText className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-h4 font-semibold text-charcoal">
            {review.institution}
          </h3>
          {review.faculty && (
            <p className="text-xs text-muted">{review.faculty}</p>
          )}
          <p className="text-sm font-medium text-brand">{review.department}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm text-muted">{review.summary}</p>

      {review.pdfUrl ? (
        <a
          href={review.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          View Original Letter
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ) : (
        <p className="mt-6 text-xs text-muted">
          Original letter available on request.
        </p>
      )}
    </div>
  );
}