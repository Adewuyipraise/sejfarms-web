import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/shared/page-hero";
import { leadership } from "@/content/leadership";

export const metadata: Metadata = {
  title: "Leadership & Team",
  description: "The people leading SEJFARMS across its businesses and initiatives.",
};

export default function LeadershipPage() {
  // Hide placeholder leaders from the public page.
  const verified = leadership.filter(
    (l) => !l.name.toLowerCase().includes("to be confirmed"),
  );

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
          {verified.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-body-lg text-muted">
                Leadership information is being finalised. Please check back
                soon.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {verified.map((person) => (
                  <Card key={person.name} className="overflow-hidden p-0">
                    <div className="relative aspect-square bg-brand/10">
                      {person.photo && (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
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
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}