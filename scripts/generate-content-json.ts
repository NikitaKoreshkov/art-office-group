import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_CONTENT } from "../src/lib/content/default-content.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  join(root, "public/content/site-content.json"),
  join(root, "content/site-content.json"),
  join(root, "data/site-content.json"),
];

const json = JSON.stringify(DEFAULT_CONTENT, null, 2);

for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, json, "utf8");
  console.log("Wrote", target);
}
