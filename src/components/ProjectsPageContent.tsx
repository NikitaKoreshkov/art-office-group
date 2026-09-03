"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { useState } from "react";
import { useHomeSection, useSiteContent } from "@/context/ContentContext";
import type { SiteContent } from "@/lib/content/types";
import { ProjectPortfolioCard } from "@/components/ProjectPortfolioCard";

type PortfolioProject = SiteContent["homeSections"]["portfolio"]["items"][number];

const PortfolioLightbox = dynamic(
  () => import("@/components/PortfolioLightbox").then((m) => ({ default: m.PortfolioLightbox })),
  { ssr: false },
);

export function ProjectsPageContent() {
  const { content } = useSiteContent();
  const section = useHomeSection("portfolio");
  const page = content.pages.projects;
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);

  return (
    <>
      <div className="mb-8 sm:mb-10">
        <BackLink href="/#portfolio" className="mb-6" />
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b919c]">{page.label}</p>
        <h1 className="font-display text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
          {page.heading}
        </h1>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {section.items.map((project, index) => (
          <li
            key={project.id}
            className="projects-card-appear"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <ProjectPortfolioCard
              project={project}
              onPhotoClick={project.cover ? () => setLightboxProject(project) : undefined}
            />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center sm:mt-12">
        <Link
          href="/#contacts"
          className="group inline-flex items-center gap-3 rounded-[14px] border border-[#dfe2e8] bg-white px-8 py-4 text-[15px] font-semibold text-ink shadow-[0_2px_12px_rgba(40,48,61,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-ink/20 hover:shadow-[0_8px_28px_rgba(40,48,61,0.1)]"
        >
          Обсудить проект
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <PortfolioLightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
    </>
  );
}
