import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/fetch";
import { PRODUCTS_QUERY } from "@/sanity/queries";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Value-added fish products from Mosnerifoods — smoked, frozen, snacks, and derivatives. Order via WhatsApp.",
};

type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  category: string;
  description: string;
  image?: string;
  sizes?: string[];
  available: boolean;
};

export default async function ProductsPage() {
  const products = await sanityFetch<SanityProduct[]>({
    query: PRODUCTS_QUERY,
    tags: ["product"],
  });

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Mosnerifoods Value-Added Products"
        description="High-quality fish products from our processing subsidiary Mosnerifoods. Browse the range and place your order via WhatsApp."
        tone="dark"
        backgroundImage="/images/hero/processingbanner.jpg"
      />

      <Section>
        <Container>
          {products.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-body-lg text-muted">
                Our product catalogue is being finalised. Check back shortly —
                or contact us directly for our current range.
              </p>
              <div className="mt-6">
                <Button
                  href={whatsappLink(
                    "Hello Mosnerifoods, I'd like to find out about your current product range.",
                    "mosnerifoods",
                  )}
                  variant="whatsapp"
                  external
                >
                  Ask on WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function ProductCard({ product }: { product: SanityProduct }) {
  const orderMessage = `Hello Mosnerifoods, I'd like to order:\n\n• ${product.name} — ₦${product.price.toLocaleString()} (${product.unit})`;

  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-border bg-white transition-all hover:shadow-lift">
      {product.image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-brand/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ) : (
        <div className="relative aspect-[4/3] bg-brand/5" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
          {product.category}
        </span>
        <h3 className="mt-1.5 font-display text-base font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs text-muted">
          {product.description}
        </p>
        <p className="mt-3 font-display text-lg font-bold text-charcoal">
          ₦{product.price.toLocaleString()}
          <span className="ml-1.5 text-xs font-normal text-muted">
            / {product.unit}
          </span>
        </p>
        {product.sizes && product.sizes.length > 0 && (
          <p className="mt-1 text-xs text-muted">
            Sizes: {product.sizes.join(" · ")}
          </p>
        )}
        <div className="mt-4">
          <Button
            href={whatsappLink(orderMessage, "mosnerifoods")}
            size="sm"
            variant="primary"
            external
            className="w-full"
          >
            Order via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}