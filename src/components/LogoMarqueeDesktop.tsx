"use client";

import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import { LogoImage } from "@/components/ui/LogoImage";
import type { LogoCarouselItem } from "@/components/LogoCarouselMobile";

type LogoMarqueeDesktopProps = {
  panelId: string;
  items: LogoCarouselItem[];
  marqueeClassName: "clients-marquee" | "partners-marquee";
  ariaLabel: string;
};

export function LogoMarqueeDesktop({
  panelId,
  items,
  marqueeClassName,
  ariaLabel,
}: LogoMarqueeDesktopProps) {
  const track = [...items, ...items];
  const trackReverse = [...[...items].reverse(), ...[...items].reverse()];

  return (
    <ServicesPanelGlass id={panelId} className="max-lg:[--panel-radius:20px]">
      <div className={`${marqueeClassName} relative flex flex-col space-y-3 py-5 sm:space-y-4 sm:py-6`} aria-label={ariaLabel}>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[min(96px,16vw)] bg-gradient-to-r from-white via-white/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[min(96px,16vw)] bg-gradient-to-l from-white via-white/80 to-transparent"
          aria-hidden="true"
        />

        {[track, trackReverse].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex w-max items-center ${rowIndex === 1 ? "marquee-track-reverse" : "marquee-track"}`}
          >
            {row.map((item, i) => (
              <div
                key={`${item.id}-${rowIndex}-${i}`}
                className="flex h-[68px] w-[152px] shrink-0 items-center justify-center px-5 sm:h-[76px] sm:w-[176px] sm:px-6"
              >
                <div className="group/tile flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-[#eceef2] bg-white px-3 shadow-[0_4px_16px_rgba(40,48,61,0.06)] transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-[#dfe2e8] hover:shadow-[0_8px_24px_rgba(40,48,61,0.1)]">
                  <div className="relative h-10 w-full max-w-[78%] sm:h-11">
                    <LogoImage
                      src={item.src}
                      alt={item.name}
                      fill
                      sizes="140px"
                      className="object-contain object-center opacity-80 transition-opacity duration-300 group-hover/tile:opacity-100"
                      eager
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ServicesPanelGlass>
  );
}
