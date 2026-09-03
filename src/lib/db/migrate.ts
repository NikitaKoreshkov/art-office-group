import fs from "node:fs";
import path from "node:path";
import { getPool, hasDatabase } from "./pool";

let migrated = false;

export async function ensureDb() {
  if (!hasDatabase()) {
    throw new Error("DATABASE_URL is not set");
  }

  if (migrated) return;

  const schemaPath = path.join(process.cwd(), "src/lib/db/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  await getPool().query(schema);
  migrated = true;
}
