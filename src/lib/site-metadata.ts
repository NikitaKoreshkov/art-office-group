import type { Metadata } from "next";
import { DEFAULT_CONTENT } from "@/lib/content/default-content";
import type { SiteContent } from "@/lib/content/types";

export const BASE_SITE_METADATA: Metadata = {
  metadataBase: new URL(DEFAULT_CONTENT.meta.siteUrl),
  title: {
    default: DEFAULT_CONTENT.meta.title,
    template: DEFAULT_CONTENT.meta.titleTemplate,
  },
  description: DEFAULT_CONTENT.meta.description,
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: DEFAULT_CONTENT.meta.siteUrl,
    siteName: DEFAULT_CONTENT.branding.companyName,
    title: DEFAULT_CONTENT.meta.ogTitle,
    description: DEFAULT_CONTENT.meta.ogDescription,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export function buildSiteMetadata(content: SiteContent): Metadata {
  const siteUrl = content.meta.siteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: content.meta.title,
      template: content.meta.titleTemplate,
    },
    description: content.meta.description,
    openGraph: {
      type: "website",
      locale: "ru_KZ",
      url: siteUrl,
      siteName: content.branding.companyName,
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
  };
}
