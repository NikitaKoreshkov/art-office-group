import path from "node:path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { saveMediaFile } from "@/lib/admin/media-store";

const ALLOWED = /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov|pdf)$/i;

export const maxDuration = 600;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не загружен" }, { status: 400 });
  }

  if (!ALLOWED.test(file.name)) {
    return NextResponse.json({ error: "Недопустимый тип файла" }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  const base = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .slice(0, 48);
  const filename = `${Date.now()}-${base}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await saveMediaFile({
    filename,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    data: buffer,
  });

  return NextResponse.json({
    url: `/api/media/${filename}`,
    filename,
    mimetype: file.type,
    size: file.size,
  });
}
