import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand">
        404
      </p>
      <h1 className="mt-4 font-display text-h1 font-bold">
        This page couldn't be found.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        It may have been moved or removed. Let's get you back on track.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/">Back to Home</Button>
        <Button href="/contact" variant="secondary">
          Contact Us
        </Button>
      </div>
    </Container>
  );
}