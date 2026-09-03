import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AppChrome } from "@/components/AppChrome";
import { Analytics, GtmNoscript } from "@/components/Analytics";
import { getSiteContent } from "@/lib/content/get-site-content";
import { DEFAULT_CONTENT } from "@/lib/content/default-content";
import { BASE_SITE_METADATA, buildSiteMetadata } from "@/lib/site-metadata";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-onest",
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getSiteContent();
    return buildSiteMetadata(content);
  } catch {
    return BASE_SITE_METADATA;
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let content = DEFAULT_CONTENT;
  try {
    content = await getSiteContent();
  } catch {
    content = DEFAULT_CONTENT;
  }

  preload(content.hero.poster, { as: "image", fetchPriority: "high" });

  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${onest.variable} ${inter.className} bg-light text-ink antialiased`}
      >
        <GtmNoscript />
        <Analytics />
        <LanguageProvider>
          <ContentProvider initialContent={content}>
            <AppChrome>{children}</AppChrome>
          </ContentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
