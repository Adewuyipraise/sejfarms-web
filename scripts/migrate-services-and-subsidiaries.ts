import { createClient } from "@sanity/client";
import { services } from "../src/content/services";
import { serviceDetails } from "../src/content/service-details";
import { subsidiaries } from "../src/content/subsidiaries";
import { subsidiaryDetails } from "../src/content/subsidiary-details";
import * as dotenv from "dotenv";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

/**
 * Upload a local image from /public to Sanity and return the asset reference.
 * Returns undefined if the file doesn't exist.
 */
async function uploadImageIfExists(publicPath?: string) {
  if (!publicPath) return undefined;
  if (!publicPath.startsWith("/")) return undefined;

  const filePath = join(process.cwd(), "public", publicPath);
  if (!existsSync(filePath)) {
    console.log(`    ⚠ Image not found: ${publicPath}`);
    return undefined;
  }

  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: publicPath.split("/").pop(),
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function migrateServices() {
  console.log("\nMigrating services…");

  let order = 0;
  for (const service of services) {
    order++;
    const detail = serviceDetails[service.slug];

    const imageAsset = await uploadImageIfExists(service.image);
    const heroAsset = await uploadImageIfExists(detail?.heroImage);

    const doc: any = {
      _type: "service",
      _id: `service-${service.slug}`,
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      groupSlug: service.groupSlug,
      shortDescription: service.shortDescription,
      order,
    };

    if (imageAsset) doc.image = imageAsset;
    if (heroAsset) doc.heroImage = heroAsset;
    if (detail) {
      doc.overview = detail.overview;
      if (detail.offering) {
        doc.offering = detail.offering.map((o: any, i: number) => ({
          _key: `offering-${i}`,
          _type: "offeringItem",
          title: o.title,
          description: o.description,
        }));
      }
      if (detail.process) {
        doc.process = detail.process.map((p: any, i: number) => ({
          _key: `process-${i}`,
          _type: "processStep",
          step: p.step,
          title: p.title,
          description: p.description,
        }));
      }
      if (detail.faqs) {
        doc.faqs = detail.faqs.map((f: any, i: number) => ({
          _key: `faq-${i}`,
          _type: "faq",
          q: f.q,
          a: f.a,
        }));
      }
    }

    await client.createOrReplace(doc);
    console.log(`  ✓ ${service.title}`);
  }
}

async function migrateSubsidiaries() {
  console.log("\nMigrating subsidiaries…");

  let order = 0;
  for (const sub of subsidiaries) {
    order++;
    const detail = subsidiaryDetails[sub.slug];

    const imageAsset = await uploadImageIfExists(sub.image);
    const heroAsset = await uploadImageIfExists(detail?.heroImage);

    const doc: any = {
      _type: "subsidiary",
      _id: `subsidiary-${sub.slug}`,
      name: sub.name,
      shortName: sub.shortName,
      slug: { _type: "slug", current: sub.slug },
      tagline: sub.tagline,
      description: sub.description,
      order,
    };

    if (sub.whatsapp) doc.whatsapp = sub.whatsapp;
    if (sub.email) doc.email = sub.email;
    if (imageAsset) doc.image = imageAsset;
    if (heroAsset) doc.heroImage = heroAsset;

    if (detail) {
      doc.about = detail.about;
      if (detail.services) {
        doc.services = detail.services.map((s: any, i: number) => ({
          _key: `service-${i}`,
          _type: "subsidiaryService",
          title: s.title,
          description: s.description,
        }));
      }
    }

    await client.createOrReplace(doc);
    console.log(`  ✓ ${sub.name}`);
  }
}

async function main() {
  console.log("Starting migration…");
  await migrateServices();
  await migrateSubsidiaries();
  console.log("\n✅ Migration complete.");
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err);
  process.exit(1);
});