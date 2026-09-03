import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://art-office.kz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
