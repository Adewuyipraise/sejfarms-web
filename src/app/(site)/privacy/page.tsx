import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SEJFARMS Group collects, uses and protects the personal information you share through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains what we collect through this website, why we collect it, and the choices you have."
      />

      <Section>
        <Container>
          <Prose>
            <p>Last updated: January 2026</p>

            <h2>Who we are</h2>
            <p>
              SEJFARMS Group (&ldquo;SEJFARMS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is an
              agriculture and aquaculture company based in Lagos, Nigeria. This policy applies to
              information collected through sejfarmsgroup.com.
            </p>

            <h2>Information we collect</h2>
            <p>We only collect information you choose to give us:</p>
            <ul>
              <li>
                <strong>Enquiry form data</strong> — your name, organisation, email address, phone
                number, location and message.
              </li>
              <li>
                <strong>Consent</strong> — your acknowledgement that we may contact you in response
                to your enquiry.
              </li>
              <li>
                <strong>WhatsApp contact</strong> — if you contact us through the WhatsApp links on
                this site, WhatsApp handles that conversation under its own privacy policy.
              </li>
            </ul>
            <p>
              We do not use tracking cookies, advertising cookies or analytics scripts on this
              website.
            </p>

            <h2>How we use your information</h2>
            <p>We use the information you submit to:</p>
            <ul>
              <li>Respond to your enquiry and provide the information or service you asked for.</li>
              <li>Follow up on business, partnership or application discussions you initiate.</li>
              <li>Maintain a record of correspondence where relevant to an engagement.</li>
            </ul>
            <p>
              Enquiry form submissions are delivered to our team by email through Resend, an email
              delivery service. Your message is stored in our email systems as part of that
              correspondence.
            </p>

            <h2>Who we share it with</h2>
            <p>
              We do not sell, rent or trade your personal information. We share it only with service
              providers who help us operate this website and respond to you (currently Resend for
              email delivery), and where we are required to do so by law.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry correspondence for as long as it is needed to handle your request and
              for legitimate business record-keeping, then delete or anonymise it.
            </p>

            <h2>Your rights</h2>
            <p>You may ask us to:</p>
            <ul>
              <li>Give you a copy of the personal information we hold about you.</li>
              <li>Correct information that is inaccurate or incomplete.</li>
              <li>Delete your personal information, where we have no overriding legitimate reason to keep it.</li>
              <li>Stop contacting you.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>.
            </p>

            <h2>Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect the information
              you send us. No method of transmission over the internet is completely secure, and we
              cannot guarantee absolute security.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The latest version will always be
              published on this page with an updated date.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
