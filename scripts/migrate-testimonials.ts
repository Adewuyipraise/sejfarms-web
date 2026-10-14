import { createClient } from "@sanity/client";
import { testimonials, institutionReviews } from "../src/content/testimonials";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!, // needs write access
  useCdn: false,
});

async function migrate() {
  console.log("Migrating testimonials…");

  for (const t of testimonials) {
    const doc = {
      _type: "testimonial",
      _id: `testimonial-${t.slug}`,
      author: t.author,
      slug: { _type: "slug", current: t.slug },
      role: t.role,
      institution: t.institution,
      quote: t.quote,
      featured: t.featured ?? false,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${t.author}`);
  }

  console.log("\nMigrating institution reviews…");

  for (const r of institutionReviews) {
    const doc = {
      _type: "institutionReview",
      _id: `institutionReview-${r.slug}`,
      institution: r.institution,
      slug: { _type: "slug", current: r.slug },
      faculty: r.faculty,
      department: r.department,
      summary: r.summary,
      featured: r.featured ?? false,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${r.institution}`);
  }

  console.log("\n✅ Migration complete.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});