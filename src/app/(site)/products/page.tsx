import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { ProductCart } from "@/components/shared/product-cart";
import { sanityFetch } from "@/sanity/fetch";
import { PRODUCTS_QUERY } from "@/sanity/queries";
import { whatsappLink } from "@/lib/whatsapp";

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
        description="High-quality fish products from our processing subsidiary Mosnerifoods. Add to cart, then send your order via WhatsApp."
        tone="dark"
        backgroundImage="/images/hero/processingbanner.jpg"
      />

      <Section className="pb-32 md:pb-40">
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
            <ProductCart products={products} />
          )}
        </Container>
      </Section>
    </>
  );
}