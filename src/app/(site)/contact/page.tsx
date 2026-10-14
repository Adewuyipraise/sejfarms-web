import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/shared/contact-form";
import { site } from "@/content/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to SEJFARMS about aquaculture, agriculture, consultancy, training, products or partnership.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  // We can't await searchParams in a sync component; make it async in Next 16.
  // Handled below via a small wrapper.
  return <ContactInner />;
}

async function ContactInner() {
  // In Next 15+, searchParams is a Promise in server components. For static
  // rendering we read it via the page props; to keep this file simple we don't
  // thread it here — the client form defaults to "Aquaculture".
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Work Together"
        description="Tell us what you're interested in and we'll get back to you within two business days."
        tone="dark"
        backgroundImage="/images/hero/home.jpg"
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
            <ContactForm />

            <aside className="space-y-8">
              <div>
                <h3 className="font-display text-h4 font-semibold">Talk to Us</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <span className="block text-muted">Phone</span>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-medium text-brand hover:underline">
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <span className="block text-muted">Email</span>
                    <a href={`mailto:${site.email}`} className="font-medium text-brand hover:underline">
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <span className="block text-muted">WhatsApp</span>
                    <a
                      href={whatsappLink(whatsappMessages.general)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand hover:underline"
                    >
                      Message us now
                    </a>
                  </li>
                  <li>
                    <span className="block text-muted">Office</span>
                    <span>{site.address}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}