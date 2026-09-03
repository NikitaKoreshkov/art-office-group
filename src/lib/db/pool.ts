import { Pool } from "pg";

const globalForPg = globalThis as unknown as { pgPool?: Pool };

export function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

export function hasDatabase() {
  return Boolean(getDatabaseUrl());
}

export function getPool(): Pool {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!globalForPg.pgPool) {
    globalForPg.pgPool = new Pool({ connectionString: url });
  }

  return globalForPg.pgPool;
}
