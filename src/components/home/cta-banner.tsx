import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export function CTABanner() {
  return (
    <Section className="bg-brand-dark text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Heading level={2} className="text-white">
            Ready to Work With SEJFARMS?
          </Heading>
          <p className="mt-4 text-body-lg text-cream/85 text-pretty">
            Whether you're a farmer, investor, organisation or student — let's
            talk about how we can work together.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg" variant="primary">
              Get in Touch
            </Button>
            <Button
              href={whatsappLink(whatsappMessages.general)}
              size="lg"
              variant="whatsapp"
              external
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}