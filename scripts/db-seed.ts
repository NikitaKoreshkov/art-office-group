import { loadEnvFiles } from "../src/lib/db/load-env";
import { ensureContent } from "../src/lib/admin/content-store";
import { ensureUsers } from "../src/lib/admin/users";
import { ensureDb } from "../src/lib/db/migrate";
import { getPool } from "../src/lib/db/pool";

async function main() {
  loadEnvFiles();
  await ensureDb();

  const content = await ensureContent();
  const user = await ensureUsers();

  const stats = await getPool().query<{ table_name: string; rows: string }>(`
    SELECT 'site_content' AS table_name, COUNT(*)::text AS rows FROM site_content
    UNION ALL
    SELECT 'admin_users', COUNT(*)::text FROM admin_users
    UNION ALL
    SELECT 'media_files', COUNT(*)::text FROM media_files
  `);

  console.log("PostgreSQL seed complete.");
  console.log(`  Admin: ${user.email}`);
  console.log(`  Content version: ${content.version ?? 1}`);
  for (const row of stats.rows) {
    console.log(`  ${row.table_name}: ${row.rows} row(s)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
