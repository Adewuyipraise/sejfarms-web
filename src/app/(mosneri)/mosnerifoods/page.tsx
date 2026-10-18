import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // Add this
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ArticleCard } from "@/components/shared/article-card";
import { sanityFetch } from "@/sanity/fetch";
import { MOSNERI_POSTS_QUERY, TRAINING_PARTNERS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Mosnerifoods | Value-Added Fish Products",
  description: "Premium smoked fish, fish snacks, and derivatives by Sejfarms Group.",
};

export default async function MosneriLandingPage() {
  const posts = await sanityFetch<any[]>({ query: MOSNERI_POSTS_QUERY, tags: ["post"] });
  const partners = await sanityFetch<any[]>({ query: TRAINING_PARTNERS_QUERY, tags: ["trainingPartner"] });

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-mosneri-black py-10 text-white md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-mosneri-black via-mosneri-black to-mosneri-red/20" />
        <Image 
          src="/logos/mosnerifoods.jpg" 
          alt="Mosnerifoods" 
          fill 
          priority
          className="absolute inset-0 object-cover w-full h-full opacity-20" 
        />
        <Container className="relative">
          {/*<span className="inline-block rounded-full bg-mosneri-orange/10 px-4 py-1.5 text-sm font-semibold text-mosneri-orange">
            Sejfarms Group Subsidiary
          </span>*/}
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Elevating the <span className="text-mosneri-orange">Fish Value Addition</span> Industry.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/80">
            We are the first fish processing company to introduce fish crackers to the Nigerian market. 
            From premium processing to empowering women and youth through training, we are revolutionizing snacking options in the country.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/mosnerifoods/products" size="lg" variant="mosneri">
              Shop Products
            </Button>
            <Button href="#training" size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Explore Training
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. About Us */}
      <Section id="about" className="bg-white py-16 md:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-mosneri-red">Our Story</span>
              <Heading level={2} className="mt-3 text-mosneri-black">
                Premium Quality, Innovative Flavors.
              </Heading>
              <div className="mt-6 space-y-4 text-body-lg text-muted">
                <p>
                  Mosnerifoods is a leading fish value addition company specializing in processing fish into a wide range of premium-quality fish-based products. Our commitment to quality has made us a preferred choice for delicious and healthy food options.
                </p>
                <p>
                  We benefit from a strong foundation and years of industry experience, developing robust supply chains with local fishermen and farmers. Our state-of-the-art facilities and strict quality control measures guarantee the highest standards of safety and taste.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8 border border-gray-100">
              <h3 className="font-display text-xl font-bold text-mosneri-black mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  "Premium-quality products",
                  "Innovative flavors",
                  "Commitment to sustainability",
                  "Excellent customer service"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mosneri-orange/20 text-mosneri-orange text-sm font-bold">✓</div>
                    <span className="font-medium text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Products Teaser (Replaces the full cart) 
      <Section id="products-teaser" className="bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="text-sm font-bold uppercase tracking-widest text-mosneri-orange">Shop Now</span>
            <Heading level={2} className="mt-2 text-mosneri-black">Taste the Difference</Heading>
            <p className="mt-4 text-muted text-lg">
              From Catfish Kilishi to Fish Crackers and Peppered Giz. Available for personal consumption, and indoor/outdoor supply for corporate and social events.
            </p>
            <div className="mt-8">
              <Button href="/mosnerifoods/products" size="lg" variant="mosneri">
                Browse Our Full Menu
              </Button>
            </div>
          </div>
        </Container>
      </Section>*/}

      {/* 4. Training & Partners */}
      <Section id="training" className="bg-mosneri-black text-white py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-mosneri-yellow">Empowerment</span>
              <Heading level={2} className="mt-3 text-white">Fish Value Addition Training</Heading>
              <p className="mt-4 text-white/80 text-body-lg">
                We offer comprehensive training programs with special emphasis on women, youth, and small-scale entrepreneurs. We also run Industrial Training (IT/SIWES) programs for students in Tertiary Institutions.
              </p>
              
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-lg font-bold text-mosneri-orange">What You Will Learn:</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {["Smoking and marinating", "Filleting", "Product formulation", "Packaging", "Fish product formulation", "Value chain economics"].map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="text-mosneri-orange">•</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <h3 className="font-display text-xl font-bold text-white mb-6">Our Training Partners</h3>
              <p className="text-sm text-white/60 mb-6">We collaborate with leading organizations to facilitate training on fish value addition.</p>
              
              {partners.length === 0 ? (
                <p className="text-sm text-mosneri-yellow">Loading partners...</p>
              ) : (
                <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {partners.map((partner) => (
                    <li key={partner._id} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
                      
                      {/* Image container */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 p-2">
                        {partner.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-white/50">Logo</span>
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-white leading-tight">{partner.name}</p>
                        <p className="text-xs text-mosneri-orange mt-1">{partner.program}</p>
                      </div>

                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Featured Updates (Knowledge Hub) */}
      {posts.length > 0 && (
        <Section id="updates" className="bg-white py-16 md:py-16">
          <Container>
            <div className="mb-10">
              <span className="text-sm font-bold uppercase tracking-widest text-mosneri-yellow">Stay Informed</span>
              <Heading level={2} className="mt-2 text-mosneri-black">Latest from Mosnerifoods</Heading>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}