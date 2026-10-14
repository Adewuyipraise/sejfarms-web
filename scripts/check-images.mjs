import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

// 1. Collect all files under public/
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push("/" + relative("public", full).replace(/\\/g, "/"));
  }
  return acc;
}

const onDisk = new Set(walk("public"));

// 2. Collect all references from src/
function walkSrc(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkSrc(full, acc);
    else if (/\.(ts|tsx)$/.test(entry)) acc.push(full);
  }
  return acc;
}

const references = new Set();
for (const file of walkSrc("src")) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/["'](\/(?:images|logos|resources)\/[^"']+)["']/g)) {
    references.add(match[1]);
  }
}

// 3. Report
const missing = [...references].filter((r) => !onDisk.has(r));
const unused = [...onDisk].filter((f) => !references.has(f));

console.log(`\n✓ ${onDisk.size} files on disk`);
console.log(`✓ ${references.size} references in code\n`);

if (missing.length) {
  console.log("❌ Missing (referenced but not on disk):");
  missing.sort().forEach((m) => console.log("   " + m));
  console.log();
}

if (unused.length) {
  console.log("⚠️  On disk but not referenced:");
  unused.sort().forEach((u) => console.log("   " + u));
  console.log();
}

if (!missing.length && !unused.length) {
  console.log("✅ All references resolve and every file is used.\n");
}

process.exit(missing.length ? 1 : 0);