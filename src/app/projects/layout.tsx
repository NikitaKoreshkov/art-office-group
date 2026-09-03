import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Все реализованные проекты",
  description:
    "Фото реализованных проектов ART OFFICE GROUP — остекление, фасады и стеклянные конструкции в Алматы и Казахстане.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
