import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/fetch";
import { OPEN_JOBS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a team working to transform agriculture and aquaculture through knowledge, innovation and enterprise.",
};

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
  open: boolean;
};

export default async function CareersPage() {
  const jobs = await sanityFetch<SanityJob[]>({
    query: OPEN_JOBS_QUERY,
    tags: ["jobPosting"],
  });

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work With Us"
        description="Join a team working to transform agriculture and aquaculture through knowledge, innovation and enterprise."
        tone="dark"
        backgroundImage="/images/case-studies/farmer-capacity-programme.jpg"
      />

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <Heading level={2}>Why Sejfarms?</Heading>
            <Stagger className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Real Operations",
                  body: "Work on live farms, not simulations. Every role touches production, training or enterprise.",
                },
                {
                  title: "Cross-Business Exposure",
                  body: "Move across consultancy, ventures, processing and development — build breadth as well as depth.",
                },
                {
                  title: "Learning Culture",
                  body: "We invest in developing our people as much as we invest in the farms.",
                },
                {
                  title: "Growth Trajectory",
                  body: "Sejfarms is expanding. Roles evolve as the group grows.",
                },
              ].map((p) => (
                <StaggerItem
                  key={p.title}
                  className="rounded-card border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <h3 className="font-display text-h4 font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </Container>
      </Section>

      <Section id="openings" className="bg-white">
        <Container>
          <Reveal>
            <Heading level={2}>Current Opportunities</Heading>
          </Reveal>

          {jobs.length === 0 ? (
            <p className="mt-6 max-w-2xl text-muted">
              There are no openings at the moment. Send us a speculative
              application or check back soon.
            </p>
          ) : (
            <Stagger className="mt-10 space-y-4">
              {jobs.map((job) => (
                <StaggerItem key={job._id}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex flex-col gap-3 rounded-card border border-border bg-cream p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-h4 font-semibold">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {job.department} · {job.type} · {job.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    View role
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <p className="mt-12 max-w-2xl text-sm text-muted">
            Not seeing the right role?{" "}
            <Link
              href="/contact?interest=careers"
              className="font-medium text-brand hover:underline"
            >
              Send us a speculative application
            </Link>{" "}
            and we’ll keep you in mind.
          </p>
        </Container>
      </Section>

      <PageCTA
        title="Ready to apply?"
        description="Submit your application and we'll be in touch."
        primary={{
          label: "Send Speculative Application",
          href: "/contact?interest=careers",
        }}
      />
    </>
  );
}