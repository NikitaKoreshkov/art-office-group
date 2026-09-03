import fs from "node:fs";
import path from "node:path";
import type { SiteContent } from "@/lib/content/types";
import { deleteMediaFilesExcept } from "./media-store";
import { UPLOADS_DIR } from "./paths";

function collectMediaFilenames(value: unknown, filenames: Set<string>) {
  if (typeof value === "string") {
    if (value.startsWith("/api/media/")) {
      filenames.add(path.basename(value));
    }
    if (value.startsWith("/uploads/")) {
      filenames.add(path.basename(value));
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectMediaFilenames(item, filenames);
    return;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectMediaFilenames(item, filenames);
  }
}

export function getReferencedMedia(content: SiteContent): Set<string> {
  const referenced = new Set<string>();
  collectMediaFilenames(content, referenced);
  return referenced;
}

function cleanupLegacyDiskUploads(referenced: Set<string>): string[] {
  if (!fs.existsSync(UPLOADS_DIR)) return [];

  const removed: string[] = [];

  for (const filename of fs.readdirSync(UPLOADS_DIR)) {
    if (filename.startsWith(".")) continue;
    if (referenced.has(filename)) continue;

    const fullPath = path.join(UPLOADS_DIR, filename);
    if (!fs.statSync(fullPath).isFile()) continue;

    fs.unlinkSync(fullPath);
    removed.push(filename);
  }

  return removed;
}

/** Удаляет медиа из PostgreSQL и legacy-файлы из public/uploads без ссылок в контенте. */
export async function cleanupOrphanUploads(content: SiteContent): Promise<string[]> {
  const referenced = getReferencedMedia(content);
  const removedDb = await deleteMediaFilesExcept(referenced);
  const removedDisk = cleanupLegacyDiskUploads(referenced);
  return [...removedDb, ...removedDisk];
}
