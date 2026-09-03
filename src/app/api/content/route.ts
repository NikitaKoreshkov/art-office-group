import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { ensureContent, getContent, saveContent } from "@/lib/admin/content-store";
import type { SiteContent } from "@/lib/content/types";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureContent();
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/content failed:", error);
    return NextResponse.json(
      { error: "База данных недоступна. Запустите: npm run setup" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;
  if (!content || typeof content !== "object") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  try {
    const saved = await saveContent(content);
    revalidatePath("/", "layout");
    revalidatePath("/clients");
    revalidatePath("/projects");
    revalidatePath("/partners");
    return NextResponse.json(saved);
  } catch (error) {
    console.error("PUT /api/content failed:", error);
    return NextResponse.json(
      { error: "Не удалось сохранить в PostgreSQL. Запустите: npm run setup" },
      { status: 500 },
    );
  }
}
