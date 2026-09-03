import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { getUserByEmail, hashPassword, saveUser, verifyPassword } from "@/lib/admin/users";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserByEmail(session.email);
  const body = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
    newEmail?: string;
    name?: string;
  };

  if (!user || !body.currentPassword || !verifyPassword(user, body.currentPassword)) {
    return NextResponse.json({ error: "Неверный текущий пароль" }, { status: 400 });
  }

  if (body.newEmail) user.email = body.newEmail;
  if (body.name) user.name = body.name;
  if (body.newPassword && body.newPassword.length >= 6) {
    user.passwordHash = hashPassword(body.newPassword);
  }

  await saveUser(user, session.email);
  return NextResponse.json({ email: user.email, name: user.name });
}
