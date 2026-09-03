"use client";

import type { SiteContent } from "@/lib/content/types";
import { ContentImage } from "@/components/ui/ContentImage";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";

type PortfolioProject = SiteContent["homeSections"]["portfolio"]["items"][number];

export function ProjectPortfolioCard({
  project,
  onPhotoClick,
}: {
  project: PortfolioProject;
  onPhotoClick?: () => void;
}) {
  return (
    <ServicesPanelGlass
      id={`project-card-${project.id}`}
      className="[--panel-radius:22px] max-lg:[--panel-radius:20px]"
    >
      <article className="group/card relative w-full p-2.5 sm:p-3">
        <button
          type="button"
          onClick={onPhotoClick}
          disabled={!onPhotoClick || !project.cover}
          aria-label={project.cover ? `${project.name} — увеличить фото` : project.name}
          className="relative mx-auto block aspect-[16/10] w-[calc(100%-28px)] overflow-hidden rounded-2xl border border-[#eceef2] bg-[#fafbfc] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-[border-color,box-shadow] duration-300 enabled:cursor-zoom-in enabled:hover:border-ink/15 enabled:hover:shadow-[0_8px_24px_rgba(40,48,61,0.08)] disabled:cursor-default sm:w-[calc(100%-32px)]"
        >
          <ContentImage
            src={project.cover}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </button>
        <div className="px-1 pt-3 sm:px-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b919c] sm:text-[11px]">
            {project.type}
          </p>
          <h2 className="mt-1 font-display text-[15px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[16px]">
            {project.name}
          </h2>
        </div>
      </article>
    </ServicesPanelGlass>
  );
}
