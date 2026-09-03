import type { HomeSectionId, SiteContent } from "@/lib/content/types";
import { resolveImageSrc } from "@/lib/images";
import { translatePortfolioType } from "@/lib/content/portfolio-type-kz";

const LIST_SECTIONS: HomeSectionId[] = [
  "services",
  "advantages",
  "portfolio",
  "clients",
  "partners",
  "process",
];

function toArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") return Object.values(value as Record<string, T>);
  return [];
}

function rewriteImageField(value: unknown): unknown {
  if (typeof value !== "string") return value;
  return resolveImageSrc(value) ?? value;
}

function rewriteItemImages(item: Record<string, unknown>): Record<string, unknown> {
  const next = { ...item };
  for (const key of ["src", "image", "cover", "photo", "placeholderImage"] as const) {
    if (key in next) next[key] = rewriteImageField(next[key]);
  }
  if (Array.isArray(next.photos)) {
    next.photos = next.photos.map(rewriteImageField);
  }
  if (Array.isArray(next.gallery)) {
    next.gallery = next.gallery.map(rewriteImageField);
  }
  return next;
}

function resyncKzPortfolioItems(content: SiteContent): SiteContent {
  const mainItems = content.homeSections.portfolio?.items;
  if (!mainItems || !content.kz?.homeSections) return content;

  if (!content.kz.homeSections.portfolio) {
    content.kz.homeSections.portfolio = {};
  }

  content.kz.homeSections.portfolio.items = mainItems.map((item) => ({
    id: item.id,
    type: translatePortfolioType(item.type) ?? item.type.trim(),
  }));

  return content;
}

/** Ensures list sections always use arrays (no implicit item caps). */
export function normalizeContent(content: SiteContent): SiteContent {
  if (!content?.homeSections) return content;

  for (const key of LIST_SECTIONS) {
    const section = content.homeSections[key];
    if (!section || !("items" in section)) continue;
    const items = toArray<Record<string, unknown>>(section.items).map(rewriteItemImages);
    (section as { items: unknown }).items = items;
  }

  content.homeSections.order = toArray<HomeSectionId>(content.homeSections.order);

  return resyncKzPortfolioItems(content);
}
