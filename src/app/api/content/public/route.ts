import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { DEFAULT_CONTENT } from "@/lib/content/default-content";
import { getSiteContent } from "@/lib/content/get-site-content";

export async function GET() {
  noStore();

  try {
    const content = await getSiteContent();
    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/content/public failed:", error);
    return NextResponse.json(DEFAULT_CONTENT, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
