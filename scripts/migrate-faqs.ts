import { createClient } from "@sanity/client";
import { faqs } from "../src/content/faqs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

function slugify(text: string, index: number) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) + `-${index}`
  );
}

async function migrate() {
  console.log("Migrating FAQs…\n");
  let index = 0;
  for (const item of faqs) {
    index++;
    const doc = {
      _type: "faq",
      _id: `faq-${slugify(item.question, index)}`,
      question: item.question,
      answer: item.answer,
      category: item.category,
      order: index,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ [${item.category}] ${item.question.slice(0, 60)}…`);
  }
  console.log(`\n✅ Migrated ${index} FAQs.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});