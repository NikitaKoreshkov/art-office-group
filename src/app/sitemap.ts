import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://art-office.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/clients`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/partners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
