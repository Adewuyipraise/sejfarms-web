import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProductCart } from "@/components/shared/product-cart";
import { sanityFetch } from "@/sanity/fetch";
import { PRODUCTS_QUERY } from "@/sanity/queries";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop Products | Mosnerifoods",
  description: "Browse our range of premium value-added fish products.",
};

export default async function MosneriProductsPage() {
  const products = await sanityFetch<any[]>({ query: PRODUCTS_QUERY, tags: ["product"] });

  return (
    <>
      <section className="bg-mosneri-black py-16 text-white md:py-24 border-b-4 border-mosneri-orange">
        <Container>
          <Link href="/mosnerifoods" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Mosnerifoods
          </Link>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Our Products</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Browse our selection of premium fish products. Add items to your cart and send your order directly to our team on WhatsApp.
          </p>
        </Container>
      </section>

      <Section className="bg-gray-50 py-12 md:py-20">
        <Container>
          {products.length === 0 ? (
            <p className="text-center text-muted">No products available yet.</p>
          ) : (
            <ProductCart products={products} theme="mosneri" />
          )}
        </Container>
      </Section>
    </>
  );
}