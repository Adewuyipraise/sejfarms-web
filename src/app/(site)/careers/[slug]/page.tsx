import { headers } from "next/headers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { JobApplicationForm } from "@/components/shared/job-application-form";
import { sanityFetch } from "@/sanity/fetch";
import { JOB_BY_SLUG_QUERY, JOB_SLUGS_QUERY } from "@/sanity/queries";
import { LikeAndShare } from "@/components/shared/like-and-share";

export const instant = false;

type Params = { slug: string };

type SanityJob = {
  _id: string;
  title: string;
  slug: string;
  department: string;
  type: string;
  location: string;
  postedAt: string;
  closesAt?: string;
  summary: string;
  likes?: number;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  howToApply: string;
  open: boolean;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: JOB_SLUGS_QUERY,
    revalidate: 3600,
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await sanityFetch<SanityJob | null>({
    query: JOB_BY_SLUG_QUERY,
    params: { slug },
    tags: [`jobPosting:${slug}`],
  });
  if (!job) return {};
  return { title: job.title, description: job.summary };
}

export default function JobPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <JobContent params={params} />
    </Suspense>
  );
}

async function JobContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const job = await sanityFetch<SanityJob | null>({
    query: JOB_BY_SLUG_QUERY,
    params: { slug },
    tags: [`jobPosting:${slug}`],
  });
  if (!job) notFound();

  const closesAt = job.closesAt
    ? new Date(job.closesAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

    const headersList = await headers();
    const host = headersList.get("host") || "www.sejfarmsgroup.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const jobUrl = `${protocol}://${host}/careers/${slug}`;


  return (
    <>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        description={`${job.type} · ${job.location}${closesAt ? ` · Applications close ${closesAt}` : ""}`}
        tone="dark"
        backgroundImage="/images/case-studies/farmer-capacity-programme.jpg"
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            <div>
              <p className="text-body-lg text-charcoal/80">{job.summary}</p>
            </div>

            <div>
              <Heading level={3}>Responsibilities</Heading>
              <ul className="mt-4 space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-charcoal/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Heading level={3}>Requirements</Heading>
              <ul className="mt-4 space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3 text-charcoal/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {job.niceToHave && job.niceToHave.length > 0 && (
              <div>
                <Heading level={3}>Nice to have</Heading>
                <ul className="mt-4 space-y-2">
                  {job.niceToHave.map((r, i) => (
                    <li key={i} className="flex gap-3 text-charcoal/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <Heading level={3}>How to apply</Heading>
              <p className="mt-4 text-charcoal/80">
                {job.howToApply ||
                  "Submit your application through the form below."}
              </p>
            </div>
          </div>
        </Container>
      </Section>
      
      <div className="mx-auto max-w-3xl mt-8">
        <LikeAndShare
          documentId={job._id}
          title={job.title}
          url={jobUrl}
          initialLikes={job.likes || 0}
        />
      </div>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level={2}>Apply for this role</Heading>
            <div className="mt-8">
              <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}