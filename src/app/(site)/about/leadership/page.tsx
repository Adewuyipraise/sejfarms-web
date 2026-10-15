import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { sanityFetch } from "@/sanity/fetch";
import { LEADERS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Leadership & Team",
  description:
    "The people leading Sejfarms Consults Limited across its businesses and initiatives.",
};

type SanityLeader = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  order: number;
};

export default async function LeadershipPage() {
  const leaders = await sanityFetch<SanityLeader[]>({
    query: LEADERS_QUERY,
    tags: ["leader"],
  });

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Leadership & Team"
        description="The people steering Sejfarms Consults Limited across its businesses, initiatives and partnerships."
        tone="dark"
        backgroundImage="/images/projects/farmer-capacity-development.jpg"
      />

      <Section>
        <Container>
          {leaders.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-body-lg text-muted">
                Leadership information is being finalised. Please check back
                soon.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {leaders.map((person) => (
                  <div
                    key={person._id}
                    className="overflow-hidden rounded-card border border-border bg-white"
                  >
                    <div className="relative aspect-square bg-brand/10">
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-display text-4xl font-bold text-brand/30">
                          {person.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-h4 font-semibold">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-brand">
                        {person.role}
                      </p>
                      <p className="mt-2 text-sm text-muted">{person.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}