import { unstable_noStore as noStore } from "next/cache";
import fs from "node:fs";
import path from "node:path";
import type { SiteContent } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/default-content";
import { hasDatabase } from "@/lib/db/pool";
import { getContent } from "@/lib/admin/content-store";
import { CONTENT_PATH, ROOT } from "@/lib/admin/paths";
import { readJson } from "@/lib/admin/fs-utils";

function readJsonFallback(): SiteContent {
  const fallbacks = [
    CONTENT_PATH,
    path.join(ROOT, "content/site-content.json"),
    path.join(ROOT, "public/content/site-content.json"),
  ];

  for (const source of fallbacks) {
    if (fs.existsSync(source)) {
      return readJson<SiteContent>(source, DEFAULT_CONTENT);
    }
  }

  return DEFAULT_CONTENT;
}

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  if (hasDatabase()) {
    try {
      return await getContent();
    } catch (error) {
      console.warn("Failed to load content from PostgreSQL, using JSON fallback:", error);
    }
  }

  return readJsonFallback();
}
