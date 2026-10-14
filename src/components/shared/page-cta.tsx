import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export function PageCTA({
  title,
  description,
  primary,
  whatsapp,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  whatsapp?: { label?: string; message: string };
}) {
  return (
    <section className="border-t border-border bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-h2 font-bold text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-body-lg text-muted text-pretty">
              {description}
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={primary.href} size="lg" variant="primary">
              {primary.label}
            </Button>
            {whatsapp && (
              <Button
                href={whatsappLink(whatsapp.message)}
                size="lg"
                variant="whatsapp"
                external
              >
                {whatsapp.label ?? "WhatsApp Us"}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}