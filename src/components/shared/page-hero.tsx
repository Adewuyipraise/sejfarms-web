import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  backgroundImage,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  backgroundImage?: string;
}) {
  const isDark = tone === "dark" || !!backgroundImage;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border py-20 md:py-28",
        !backgroundImage && (isDark ? "bg-brand-dark" : "bg-cream"),
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-dark/90" aria-hidden />
        </>
      )}

      <Container className="relative">
        <div
          className={cn(
            "max-w-4xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <Eyebrow
              className={cn(
                "text-sm font-semibold tracking-[0.18em]",
                isDark && "text-accent",
              )}
            >
              {eyebrow}
            </Eyebrow>
          )}

          <h1
            className={cn(
              "mt-4 font-display text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-5xl",
              isDark && "text-white",
            )}
          >
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                "mt-6 max-w-3xl text-lg leading-relaxed text-pretty md:text-xl",
                isDark ? "text-cream/90" : "text-charcoal/80",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}