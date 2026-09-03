import { NextResponse } from "next/server";
import { ADMIN_COOKIE, signToken } from "@/lib/admin/auth";
import { ensureUsers, getUserByEmail, verifyPassword } from "@/lib/admin/users";

export async function POST(request: Request) {
  await ensureUsers();
  const { email, password } = (await request.json()) as { email?: string; password?: string };
  const user = email ? await getUserByEmail(email) : null;

  if (!user || !password || !verifyPassword(user, password)) {
    return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
  }

  const token = signToken({ email: user.email, name: user.name });
  const res = NextResponse.json({ email: user.email, name: user.name });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
