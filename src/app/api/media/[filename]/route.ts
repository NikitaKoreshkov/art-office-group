import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { getMediaFile } from "@/lib/admin/media-store";
import { UPLOADS_DIR } from "@/lib/admin/paths";

type RouteContext = {
  params: Promise<{ filename: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { filename } = await context.params;

  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fromDb = await getMediaFile(filename);
  if (fromDb) {
    return new NextResponse(new Uint8Array(fromDb.data), {
      headers: {
        "Content-Type": fromDb.mimeType,
        "Content-Length": String(fromDb.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const legacyPath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(legacyPath)) {
    const data = fs.readFileSync(legacyPath);
    const ext = path.extname(filename).toLowerCase();
    const mime =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
          ? "image/png"
          : ext === ".webp"
            ? "image/webp"
            : ext === ".gif"
              ? "image/gif"
              : ext === ".svg"
                ? "image/svg+xml"
                : ext === ".mp4"
                  ? "video/mp4"
                  : ext === ".webm"
                    ? "video/webm"
                    : ext === ".mov"
                      ? "video/quicktime"
                      : ext === ".pdf"
                        ? "application/pdf"
                        : "application/octet-stream";

    return new NextResponse(data, {
      headers: {
        "Content-Type": mime,
        "Content-Length": String(data.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
