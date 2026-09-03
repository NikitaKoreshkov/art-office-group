import fs from "node:fs";
import path from "node:path";
import type { SiteContent } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/default-content";
import { ensureDb } from "@/lib/db/migrate";
import { getPool } from "@/lib/db/pool";
import { CONTENT_PATH, ROOT } from "./paths";
import { readJson } from "./fs-utils";
import { normalizeContent } from "./normalize-content";
import { mergeKzContent } from "@/lib/content/localize";
import { cleanupOrphanUploads } from "./upload-cleanup";

function jsonFallbackPaths() {
  return [
    CONTENT_PATH,
    path.join(ROOT, "content/site-content.json"),
    path.join(ROOT, "public/content/site-content.json"),
  ];
}

function readContentFromJsonFiles(): SiteContent | null {
  for (const source of jsonFallbackPaths()) {
    if (fs.existsSync(source)) {
      return readJson<SiteContent>(source, DEFAULT_CONTENT);
    }
  }
  return null;
}

async function importContentToDb(content: SiteContent) {
  await getPool().query(
    `INSERT INTO site_content (id, data, version, updated_at)
     VALUES (1, $1::jsonb, $2, NOW())
     ON CONFLICT (id) DO NOTHING`,
    [JSON.stringify(content), content.version || 1],
  );
}

export async function ensureContent(): Promise<SiteContent> {
  await ensureDb();

  const existing = await getPool().query<{ data: SiteContent }>(
    "SELECT data FROM site_content WHERE id = 1",
  );

  if (existing.rows[0]?.data) {
    return normalizeContent(existing.rows[0].data);
  }

  const fallback = readContentFromJsonFiles() ?? DEFAULT_CONTENT;
  await importContentToDb(fallback);

  const imported = await getPool().query<{ data: SiteContent }>(
    "SELECT data FROM site_content WHERE id = 1",
  );

  return imported.rows[0]?.data ?? fallback;
}

export async function getContent(): Promise<SiteContent> {
  await ensureDb();

  const result = await getPool().query<{ data: SiteContent }>(
    "SELECT data FROM site_content WHERE id = 1",
  );

  if (result.rows[0]?.data) {
    return normalizeContent(result.rows[0].data);
  }

  return ensureContent();
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  await ensureDb();

  const kzDefaults = DEFAULT_CONTENT.kz;
  const withKz: SiteContent = {
    ...content,
    kz: kzDefaults ? mergeKzContent(kzDefaults, content.kz) : content.kz,
  };

  const next: SiteContent = normalizeContent({
    ...withKz,
    updatedAt: new Date().toISOString(),
    version: (content.version || 0) + 1,
  });

  await getPool().query(
    `INSERT INTO site_content (id, data, version, updated_at)
     VALUES (1, $1::jsonb, $2, NOW())
     ON CONFLICT (id) DO UPDATE
     SET data = EXCLUDED.data,
         version = EXCLUDED.version,
         updated_at = NOW()`,
    [JSON.stringify(next), next.version],
  );

  await cleanupOrphanUploads(next);
  return next;
}
