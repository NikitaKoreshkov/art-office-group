import bcrypt from "bcryptjs";
import fs from "node:fs";
import { ensureDb } from "@/lib/db/migrate";
import { getPool } from "@/lib/db/pool";
import {
  DEFAULT_EMAIL,
  DEFAULT_PASSWORD,
  SECOND_ADMIN_EMAIL,
  SECOND_ADMIN_NAME,
  SECOND_ADMIN_PASSWORD,
  USERS_PATH,
} from "./paths";
import { readJson } from "./fs-utils";

export type AdminUserRecord = {
  email: string;
  passwordHash: string;
  name: string;
};

const BOOTSTRAP_ADMINS = [
  { email: DEFAULT_EMAIL, password: DEFAULT_PASSWORD, name: "Администратор" },
  { email: SECOND_ADMIN_EMAIL, password: SECOND_ADMIN_PASSWORD, name: SECOND_ADMIN_NAME },
];

function mapUser(row: { email: string; password_hash: string; name: string }): AdminUserRecord {
  return {
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
  };
}

async function importUserToDb(user: AdminUserRecord) {
  await getPool().query(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
    [user.email, user.passwordHash, user.name],
  );
}

async function ensureBootstrapUser(email: string, password: string, name: string): Promise<AdminUserRecord> {
  const existing = await getUserByEmail(email);
  if (existing) {
    return existing;
  }

  let user: AdminUserRecord;

  if (email === DEFAULT_EMAIL && fs.existsSync(USERS_PATH)) {
    const fromFile = readJson<AdminUserRecord | null>(USERS_PATH, null);
    if (fromFile) {
      user = fromFile.email === email ? fromFile : { ...fromFile, email: DEFAULT_EMAIL };
    } else {
      user = { email, passwordHash: hashPassword(password), name };
    }
  } else {
    user = { email, passwordHash: hashPassword(password), name };
  }

  await importUserToDb(user);
  return (await getUserByEmail(email)) ?? user;
}

export async function ensureUsers(): Promise<AdminUserRecord> {
  await ensureDb();

  for (const admin of BOOTSTRAP_ADMINS) {
    await ensureBootstrapUser(admin.email, admin.password, admin.name);
  }

  const first = await getUser();
  return first ?? ensureBootstrapUser(DEFAULT_EMAIL, DEFAULT_PASSWORD, "Администратор");
}

export async function getUserByEmail(email: string): Promise<AdminUserRecord | null> {
  await ensureDb();

  const result = await getPool().query<{ email: string; password_hash: string; name: string }>(
    "SELECT email, password_hash, name FROM admin_users WHERE email = $1 LIMIT 1",
    [email],
  );

  return result.rows[0] ? mapUser(result.rows[0]) : null;
}

export async function getUser(): Promise<AdminUserRecord | null> {
  await ensureDb();

  const result = await getPool().query<{ email: string; password_hash: string; name: string }>(
    "SELECT email, password_hash, name FROM admin_users ORDER BY id LIMIT 1",
  );

  return result.rows[0] ? mapUser(result.rows[0]) : null;
}

export async function saveUser(user: AdminUserRecord, lookupEmail?: string) {
  await ensureDb();

  await getPool().query(
    `UPDATE admin_users
     SET email = $1,
         password_hash = $2,
         name = $3,
         updated_at = NOW()
     WHERE email = $4`,
    [user.email, user.passwordHash, user.name, lookupEmail ?? user.email],
  );
}

export function verifyPassword(user: AdminUserRecord, password: string) {
  return bcrypt.compareSync(password, user.passwordHash);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 12);
}
