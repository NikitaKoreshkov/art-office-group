import { ensureDb } from "@/lib/db/migrate";
import { getPool } from "@/lib/db/pool";

export type MediaFileRecord = {
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
};

export async function saveMediaFile(file: Omit<MediaFileRecord, "data"> & { data: Buffer }) {
  await ensureDb();

  await getPool().query(
    `INSERT INTO media_files (filename, mime_type, size, data)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (filename) DO UPDATE
     SET mime_type = EXCLUDED.mime_type,
         size = EXCLUDED.size,
         data = EXCLUDED.data`,
    [file.filename, file.mimeType, file.size, file.data],
  );
}

export async function getMediaFile(filename: string): Promise<MediaFileRecord | null> {
  await ensureDb();

  const result = await getPool().query<{
    filename: string;
    mime_type: string;
    size: string;
    data: Buffer;
  }>("SELECT filename, mime_type, size, data FROM media_files WHERE filename = $1", [filename]);

  const row = result.rows[0];
  if (!row) return null;

  return {
    filename: row.filename,
    mimeType: row.mime_type,
    size: Number(row.size),
    data: row.data,
  };
}

export async function deleteMediaFilesExcept(keep: Set<string>): Promise<string[]> {
  await ensureDb();

  const result = await getPool().query<{ filename: string }>("SELECT filename FROM media_files");
  const removed: string[] = [];

  for (const row of result.rows) {
    if (keep.has(row.filename)) continue;
    await getPool().query("DELETE FROM media_files WHERE filename = $1", [row.filename]);
    removed.push(row.filename);
  }

  return removed;
}
