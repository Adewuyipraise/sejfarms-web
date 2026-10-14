import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { PageCTA } from "@/components/shared/page-cta";
import { faqs, faqCategories } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about Sejfarms Consults Limited.",
};

export default function FAQsPage() {
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
          <div className="mx-auto max-w-3xl">
            {faqCategories.map((cat) => {
              const items = faqs.filter((f) => f.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat} className="mb-12 last:mb-0">
                  <h2 className="font-display text-h3 font-semibold">{cat}</h2>
                  <dl className="mt-6 divide-y divide-border border-t border-border">
                    {items.map((f) => (
                      <div key={f.question} className="py-6">
                        <dt className="font-display font-semibold text-charcoal">
                          {f.question}
                        </dt>
                        <dd className="mt-2 text-muted">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
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