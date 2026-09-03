"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { FloatingPhone } from "@/components/FloatingPhone";
import { ContactFormShell } from "@/components/ContactFormShell";
import { SkipToContent } from "@/components/SkipToContent";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactFormShell>
      <SkipToContent />
      <Header />
      {children}
      <FloatingPhone />
    </ContactFormShell>
  );
}
