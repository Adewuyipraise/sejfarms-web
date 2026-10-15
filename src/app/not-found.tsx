import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Fallback 404 for requests that don't match any route (and therefore never
 * enter the `(site)` group). In-site 404s use `(site)/not-found.tsx`, which has
 * the Navbar/Footer chrome.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 font-display text-h1 font-bold text-balance">
        This page couldn’t be found.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        It may have been moved or removed. Let’s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/">Back to Home</Button>
        <Button href="/contact" variant="secondary">
          Contact Us
        </Button>
      </div>
    </Container>
  );
}
