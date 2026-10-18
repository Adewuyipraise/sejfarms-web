import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { Reveal } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/fetch";
import { FAQS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about Sejfarms Consults Limited.",
};

type SanityFAQ = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export default async function FAQsPage() {
  const faqs = await sanityFetch<SanityFAQ[]>({
    query: FAQS_QUERY,
    tags: ["faq"],
  });

  // Group by category while preserving order
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Answers to the questions we hear most often from farmers, interns, partners and clients."
        tone="dark"
        backgroundImage="/images/hero/processingbanner.jpg"
      />

      <Section>
        <Container>
          {faqs.length === 0 ? (
            <p className="text-center text-muted">
              FAQs are being finalised. Check back shortly.
            </p>
          ) : (
            <div className="mx-auto max-w-3xl">
              {categories.map((cat) => {
                const items = faqs.filter((f) => f.category === cat);
                if (items.length === 0) return null;
                return (
                  <Reveal key={cat} className="mb-12 last:mb-0">
                    <h2 className="font-display text-h3 font-semibold">
                      {cat}
                    </h2>
                    <dl className="mt-6 divide-y divide-border border-t border-border">
                      {items.map((f) => (
                        <div key={f._id} className="py-6">
                          <dt className="font-display font-semibold text-charcoal">
                            {f.question}
                          </dt>
                          <dd className="mt-2 text-muted">{f.answer}</dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      <PageCTA
        title="Still have a question?"
        description="Our team is happy to help — reach out and we'll point you in the right direction."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}