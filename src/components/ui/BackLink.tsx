"use client";

import Link from "next/link";
import { useT } from "@/context/LanguageContext";

type BackLinkProps = {
  href: string;
  className?: string;
};

export function BackLink({ href, className = "" }: BackLinkProps) {
  const t = useT();

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-[13px] font-semibold text-[#8b919c] transition-colors hover:text-ink ${className}`.trim()}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M19 12H5M5 12l7 7M5 12l7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {t("Назад", "Артқа")}
    </Link>
  );
}
