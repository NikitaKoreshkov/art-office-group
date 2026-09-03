"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_CONTENT } from "@/lib/content/default-content";
import type { SiteContent } from "@/lib/content/types";
import { applyKzOverlay, mergeKzContent } from "@/lib/content/localize";
import { useLanguage } from "@/context/LanguageContext";

const CONTENT_VERSION_KEY = "site-content-version";
const CONTENT_CHANNEL = "site-content";

type ContentContextValue = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue>({
  content: DEFAULT_CONTENT,
  loading: false,
  refresh: async () => {},
});

export function ContentProvider({
  children,
  initialContent = DEFAULT_CONTENT,
}: {
  children: ReactNode;
  initialContent?: SiteContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [loading, setLoading] = useState(false);

  const loadLatest = useCallback(async () => {
    if (pathname.startsWith("/admin")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/content/public?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;

      const data = (await res.json()) as SiteContent;
      setContent(data);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isAdmin) return;

    let channel: BroadcastChannel | null = null;

    try {
      channel = new BroadcastChannel(CONTENT_CHANNEL);
      channel.onmessage = () => {
        loadLatest();
      };
    } catch {
      // BroadcastChannel is unavailable in some browsers.
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === CONTENT_VERSION_KEY) {
        loadLatest();
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", onStorage);
    };
  }, [isAdmin, loadLatest]);

  const { lang } = useLanguage();

  const localizedContent = useMemo(() => {
    if (lang === "ru") return content;
    const defaults = DEFAULT_CONTENT.kz;
    if (!defaults) return content;
    const kz = mergeKzContent(defaults, content.kz);
    return applyKzOverlay(content, kz);
  }, [content, lang]);

  const value = useMemo(
    () => ({ content: localizedContent, loading, refresh: loadLatest }),
    [localizedContent, loading, loadLatest],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(ContentContext);
}

export function useContacts() {
  const { content } = useSiteContent();
  return content.contacts;
}

export function useHomeSection<T extends keyof SiteContent["homeSections"]>(key: T) {
  const { content } = useSiteContent();
  return content.homeSections[key];
}
