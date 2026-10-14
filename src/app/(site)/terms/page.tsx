import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply when you use the SEJFARMS Group website and the content published on it.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="These terms govern your use of sejfarmsgroup.com. By using the site, you agree to them."
      />

      <Section>
        <Container>
          <Prose>
            <p>Last updated: January 2026</p>

            <h2>About these terms</h2>
            <p>
              This website is operated by SEJFARMS Group, based in Lagos, Nigeria. These terms apply
              to your use of this website and its content. If you engage us for any service, that
              engagement will be governed by separate written terms.
            </p>

            <h2>Use of this website</h2>
            <p>You may use this website for lawful purposes only. You agree not to:</p>
            <ul>
              <li>Use the site in any way that breaches applicable Nigerian law or regulation.</li>
              <li>Attempt to gain unauthorised access to the site or its supporting systems.</li>
              <li>Introduce malware, excessive automated traffic or other harmful material.</li>
              <li>Scrape or republish site content at scale without our written permission.</li>
            </ul>

            <h2>Content and intellectual property</h2>
            <p>
              Unless otherwise stated, the text, photography, branding and design on this website
              belong to SEJFARMS Group or are used with permission. You may view and print content
              for personal, non-commercial reference. You may not reproduce, distribute or modify
              site content for commercial purposes without our prior written consent.
            </p>

            <h2>Information on this site</h2>
            <p>
              We keep the information on this site accurate and up to date, but it is provided for
              general information only. It is not professional agricultural, technical, financial or
              legal advice, and it does not constitute an offer, contract or warranty. Farming
              outcomes depend on many conditions outside our control.
            </p>

            <h2>External links</h2>
            <p>
              This site may link to third-party websites, including WhatsApp and social platforms,
              for convenience. We do not control and are not responsible for the content, accuracy
              or privacy practices of those sites.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, SEJFARMS Group is not liable for any indirect,
              incidental or consequential loss arising from your use of, or inability to use, this
              website or reliance on its content. Nothing in these terms excludes liability that
              cannot be excluded under applicable law.
            </p>

            <h2>Changes to the site or these terms</h2>
            <p>
              We may update the site and these terms at any time. The current version will always be
              published on this page with an updated date. Continued use of the site after changes
              constitutes acceptance of the updated terms.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria, and its
              courts have exclusive jurisdiction over any dispute arising from them.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
