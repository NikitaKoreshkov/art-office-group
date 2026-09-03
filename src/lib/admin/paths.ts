import path from "node:path";

export const ROOT = process.cwd();
export const DATA_DIR = path.join(ROOT, "data");
export const USERS_PATH = path.join(DATA_DIR, "users.json");
export const CONTENT_PATH = path.join(DATA_DIR, "site-content.json");
export const UPLOADS_DIR = path.join(ROOT, "public/uploads");

export const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "art-office-admin-secret-change-in-production";
export const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || "artoffice@gmail.com";
export const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "HxHYHGnp";
export const SECOND_ADMIN_EMAIL = process.env.SECOND_ADMIN_EMAIL || "nikita.koreshcov@gmail.com";
export const SECOND_ADMIN_PASSWORD = process.env.SECOND_ADMIN_PASSWORD || "HxHYHGnp";
export const SECOND_ADMIN_NAME = process.env.SECOND_ADMIN_NAME || "Nikita";
