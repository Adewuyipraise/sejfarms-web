import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { MetricStrip } from "@/components/home/metric-strip";
import { WhoWeAre } from "@/components/home/who-we-are";
import { Ecosystem } from "@/components/home/ecosystem";
import { WhatWeDo } from "@/components/home/what-we-do";
import { WhySejfarms } from "@/components/home/why-sejfarms";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ImpactTeaser } from "@/components/home/impact-teaser";
import { Partners } from "@/components/home/partners";
import { LatestInsights } from "@/components/home/latest-insights";
import { CTABanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricStrip />
      <WhoWeAre />
      <Ecosystem />
      <WhatWeDo />
      <WhySejfarms />
      <FeaturedProjects />
      <ImpactTeaser />
      <Partners />
      <LatestInsights />
      <CTABanner />
    </>
  );
}

export const metadata: Metadata = {
  openGraph: {
    images: [{ url: "/images/og/home.jpg", width: 1200, height: 630 }],
  },
};