"use client";

import type { PortfolioProject } from "@/data/portfolio";
import { ContentImage } from "@/components/ui/ContentImage";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";

export function PortfolioCard({
  project,
  onClick,
}: {
  project: PortfolioProject;
  onClick: () => void;
}) {
  return (
    <ServicesPanelGlass
      id={`portfolio-card-${project.id}`}
      className="h-full [--panel-radius:18px] max-lg:[--panel-radius:16px]"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`${project.name} — увеличить фото`}
        className="group relative flex h-full w-full flex-col overflow-hidden bg-white text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span
          className="pointer-events-none absolute bottom-5 left-0 top-5 z-[2] w-[2px] origin-center scale-y-0 rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
          aria-hidden="true"
        />

        <div className="relative z-[1] aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink">
          <ContentImage
            src={project.cover}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            quality={85}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-[1] flex min-h-[88px] flex-col border-t border-[#eceef2] p-3 sm:min-h-[92px] sm:p-3.5 lg:min-h-[96px] lg:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b919c] transition-colors duration-500 group-hover:text-accent sm:text-[11px]">
            {project.type}
          </p>
          <h3 className="mt-1 font-display text-[13px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-[letter-spacing] duration-500 group-hover:tracking-[-0.03em] sm:mt-1.5 sm:text-[14px] lg:text-[15px]">
            {project.name}
          </h3>
        </div>

        <span
          className="portfolio-card-accent-line relative z-[1] h-px w-0 shrink-0 bg-ink/10 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
          aria-hidden="true"
        />
      </button>
    </ServicesPanelGlass>
  );
}
