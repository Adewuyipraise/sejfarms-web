import { createClient } from "@sanity/client";
import { projects } from "../src/content/projects";
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

async function migrateProjects() {
  console.log("\nMigrating projects…");

  let order = 0;
  for (const project of projects) {
    order++;

    const imageAsset = await uploadImageIfExists(project.image);

    const doc: any = {
      _type: "project",
      _id: `project-${project.slug}`,
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: project.category,
      location: project.location,
      year: project.year,
      description: project.description,
      featured: project.featured ?? false,
      order,
    };

    if (imageAsset) doc.image = imageAsset;

    // Optional fields from the Project type
    if ("challenge" in project && project.challenge) {
      doc.challenge = project.challenge;
    }
    if ("approach" in project && Array.isArray(project.approach)) {
      doc.approach = project.approach;
    }
    if ("outcome" in project && Array.isArray(project.outcome)) {
      doc.outcome = project.outcome;
    }

    await client.createOrReplace(doc);
    console.log(`  ✓ ${project.title}`);
  }
}

async function main() {
  console.log("Starting project migration…");
  await migrateProjects();
  console.log("\n✅ Migration complete.");
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err);
  process.exit(1);
});