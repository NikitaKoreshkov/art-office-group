import { loadEnvFiles } from "../src/lib/db/load-env";
import { ensureDb } from "../src/lib/db/migrate";

async function main() {
  loadEnvFiles();
  await ensureDb();
  console.log("PostgreSQL schema is ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
