import type { Metadata } from "next";
import { AdminBodyStyle } from "@/components/admin/AdminBodyStyle";

export const metadata: Metadata = {
  title: "Админ-панель | ART OFFICE GROUP",
  description: "Панель управления контентом сайта ART OFFICE GROUP.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminBodyStyle />
      <link rel="stylesheet" href="/admin/styles.css" />
      {children}
    </>
  );
}
