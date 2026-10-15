import { createClient } from "@sanity/client";
import { leadership } from "../src/content/leadership";
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
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function migrate() {
  console.log("Migrating leadership…\n");
  let order = 0;
  for (const leader of leadership) {
    order++;
    const photoAsset = await uploadImageIfExists(leader.photo);

    const doc: any = {
      _type: "leader",
      _id: `leader-${slugify(leader.name)}`,
      name: leader.name,
      role: leader.role,
      bio: leader.bio,
      order,
    };

    if (photoAsset) doc.photo = photoAsset;

    await client.createOrReplace(doc);
    console.log(`  ✓ ${leader.name}`);
  }
  console.log("\n✅ Leadership migration complete.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});