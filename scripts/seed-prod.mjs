import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import pg from "pg";

const { Pool } = pg;
const root = process.cwd();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const schema = fs.readFileSync(path.join(root, "src/lib/db/schema.sql"), "utf8");
await pool.query(schema);

const bootstrapAdmins = [
  {
    email: process.env.ADMIN_EMAIL || "artoffice@gmail.com",
    password: process.env.ADMIN_PASSWORD || "HxHYHGnp",
    name: "Администратор",
  },
  {
    email: process.env.SECOND_ADMIN_EMAIL || "nikita.koreshcov@gmail.com",
    password: process.env.SECOND_ADMIN_PASSWORD || "HxHYHGnp",
    name: process.env.SECOND_ADMIN_NAME || "Nikita",
  },
];

for (const admin of bootstrapAdmins) {
  const hash = bcrypt.hashSync(admin.password, 12);
  await pool.query(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
    [admin.email, hash, admin.name],
  );
}

const contentPaths = [
  path.join(root, "data/site-content.json"),
  path.join(root, "content/site-content.json"),
  path.join(root, "public/content/site-content.json"),
];

let content = null;
for (const source of contentPaths) {
  if (fs.existsSync(source)) {
    content = JSON.parse(fs.readFileSync(source, "utf8"));
    break;
  }
}

if (content) {
  await pool.query(
    `INSERT INTO site_content (id, data, version, updated_at)
     VALUES (1, $1::jsonb, $2, NOW())
     ON CONFLICT (id) DO NOTHING`,
    [JSON.stringify(content), content.version || 1],
  );
}

const stats = await pool.query(`
  SELECT 'admin_users' AS table_name, COUNT(*)::text AS rows FROM admin_users
  UNION ALL
  SELECT 'site_content', COUNT(*)::text FROM site_content
`);

console.log("Seed complete");
for (const row of stats.rows) {
  console.log(`  ${row.table_name}: ${row.rows}`);
}

await pool.end();
