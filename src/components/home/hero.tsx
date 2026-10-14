import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/hero/default.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/90 to-brand-dark/100" />

      <Container className="relative flex min-h-[85vh] flex-col justify-center py-24 md:py-32">
        <Eyebrow className="text-base font-semibold tracking-[0.18em] text-accent md:text-lg">
          {site.name}
        </Eyebrow>

        <h1 className="mt-6 max-w-5xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {site.tagline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 text-pretty md:text-xl">
          {site.subline}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/services" size="lg" variant="primary">
            Explore Our Services
          </Button>
          <Button href="/work-with-us" size="lg" variant="secondary">
            Work With Us
          </Button>
          <Button
            href={whatsappLink(whatsappMessages.general)}
            size="lg"
            variant="whatsapp"
            external
          >
            WhatsApp Us
          </Button>
        </div>
      </Container>
    </section>
  );
}