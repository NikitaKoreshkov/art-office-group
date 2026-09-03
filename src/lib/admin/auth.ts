import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_SECRET } from "./paths";

export type AdminSession = {
  email: string;
  name: string;
};

const COOKIE = "admin_token";

export function signToken(user: AdminSession) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export { COOKIE as ADMIN_COOKIE };
