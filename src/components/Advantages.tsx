"use client";

import { useCallback, useRef, useState, type TouchEvent } from "react";
import { AdvantageIcon } from "@/components/icons/AdvantageIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import { useHomeSection } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import type { SiteContent } from "@/lib/content/types";
import styles from "./advantages.module.css";

type AdvantageItem = SiteContent["homeSections"]["advantages"]["items"][number];

function AdvantageRow({
  icon,
  shortTitle,
  active,
  onActivate,
}: {
  icon: AdvantageItem["icon"];
  shortTitle: string;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={shortTitle}
      aria-pressed={active}
      onClick={onActivate}
      className={`${styles.sidebarItem} h-[72px] sm:h-[76px] lg:h-[80px] ${active ? styles.sidebarItemActive : ""}`}
    >
      <span className={styles.sidebarContent}>
        <span className={styles.sidebarIcon}>
          <AdvantageIcon icon={icon} className="h-[20px] w-[20px] sm:h-[22px] sm:w-[22px]" />
        </span>
        <span className={styles.sidebarLabel}>{shortTitle}</span>
      </span>
    </button>
  );
}

function AdvantageDetail({
  title,
  lead,
  text,
  highlights,
  itemIndex,
  variant = "desktop",
  animate = false,
}: {
  title: string;
  lead: string;
  text: string;
  highlights: readonly string[];
  itemIndex: number;
  variant?: "desktop" | "mobile";
  animate?: boolean;
}) {
  const { lang } = useLanguage();
  const showHighlightsLabel = lang === "kz" && itemIndex === 0;
  const isMobile = variant === "mobile";

  return (
    <div
      className={`relative z-[1] min-w-0 ${isMobile ? "flex w-full flex-col gap-3 sm:gap-3.5" : animate ? "advantage-detail-enter" : ""}`}
    >
      <h3
        className={`relative font-display font-semibold tracking-[-0.035em] text-white ${
          isMobile
            ? `${styles.mobileDetailTitle} text-[clamp(1.3125rem,5.5vw,1.625rem)] leading-[1.15]`
            : "mb-3 max-w-[540px] text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.15] sm:mb-4"
        }`}
      >
        {title}
      </h3>

      <p
        className={`font-medium tracking-[-0.01em] text-white/80 ${
          isMobile
            ? `${styles.mobileDetailLead} text-[clamp(0.9375rem,4vw,1.0625rem)] leading-[1.55]`
            : "mb-4 max-w-[520px] text-[15px] leading-[1.55] text-white/75 sm:mb-5 sm:text-[16px] sm:leading-[1.6]"
        }`}
      >
        {lead}
      </p>

      <p
        className={
          isMobile
            ? `${styles.mobileDetailText} text-[clamp(0.875rem,3.8vw,1rem)] leading-[1.65] text-white/55`
            : "mb-5 max-w-[540px] text-[14px] leading-[1.75] text-white/45 sm:mb-6 sm:text-[15px] sm:leading-[1.8]"
        }
      >
        {text}
      </p>

      {!isMobile && highlights.length > 0 && (
        <>
          {showHighlightsLabel && (
            <p className="mb-2 text-[13px] font-semibold text-white/70 sm:mb-2.5 sm:text-[14px]">
              Нәтижесі:
            </p>
          )}
          <ul className="flex flex-col gap-2 sm:gap-2.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                <span
                  className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(212,43,43,0.5)]"
                  aria-hidden="true"
                />
                <span className="text-[13px] leading-[1.5] text-white/65 sm:text-[14px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function AdvantagesMobile({
  advantages,
  activeIndex,
  onSelect,
  onTouchStart,
  onTouchEnd,
}: {
  advantages: AdvantageItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}) {
  return (
    <div
      className={styles.mobileRoot}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.mobileViewport} aria-live="polite">
        <div
          key={advantages[activeIndex].shortTitle}
          id={`advantage-slide-${activeIndex}`}
          role="tabpanel"
          aria-label={advantages[activeIndex].title}
          className={`${styles.mobileSlide} ${styles.mobileSlideActive}`}
        >
          <div className={styles.mobileBody}>
            <AdvantageDetail
              variant="mobile"
              itemIndex={activeIndex}
              title={advantages[activeIndex].title}
              lead={advantages[activeIndex].lead}
              text={advantages[activeIndex].text}
              highlights={advantages[activeIndex].highlights}
            />
          </div>
        </div>
      </div>

      <div className={styles.dotTrack} role="tablist" aria-label="Преимущества">
        {advantages.map(({ shortTitle }, index) => (
          <button
            key={shortTitle}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`advantage-slide-${index}`}
            aria-label={shortTitle}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export function Advantages() {
  const section = useHomeSection("advantages");
  const advantages = section.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailAnimate, setDetailAnimate] = useState(false);
  const isFirstTabRef = useRef(true);
  const active = advantages[activeIndex];

  const selectTab = useCallback((index: number) => {
    if (isFirstTabRef.current) {
      isFirstTabRef.current = false;
      setActiveIndex(index);
      return;
    }

    setDetailAnimate(true);
    setActiveIndex(index);
  }, []);

  const goTo = useCallback((index: number) => {
    selectTab((index + advantages.length) % advantages.length);
  }, [selectTab, advantages.length]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      const diffY = touchStartY.current - e.changedTouches[0].clientY;

      if (Math.abs(diffX) < 48 || Math.abs(diffX) < Math.abs(diffY) * 1.2) return;

      if (diffX > 0) {
        goNext();
      } else {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  return (
    <section data-header-theme="dark" className="relative overflow-hidden section-py bg-dark">
      <div className={`pointer-events-none absolute inset-0 ${styles.bgDecor}`} aria-hidden="true">
        <div className="absolute inset-0 bg-dark-grid opacity-[0.18]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Container className="relative">
        <SectionHeading
          label={section.label}
          title={section.title}
          align="center"
          theme="dark"
          compact
        />

        <ServicesPanelGlass id="advantages-panel" className="max-lg:[--panel-radius:20px]">
          <div className="lg:min-h-[420px]">
            <div className="lg:hidden">
              <AdvantagesMobile
                advantages={advantages}
                activeIndex={activeIndex}
                onSelect={selectTab}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
            </div>

            <div className="hidden lg:grid lg:min-h-[420px] lg:grid-cols-[280px_minmax(0,1fr)] lg:grid-rows-1">
              <div className={`${styles.sidebarNav} flex w-[280px] shrink-0 flex-col justify-center overflow-visible border-b border-white/[0.08] lg:h-full lg:border-b-0 lg:border-r`}>
                {advantages.map(({ icon, shortTitle }, index) => (
                  <AdvantageRow
                    key={shortTitle}
                    icon={icon}
                    shortTitle={shortTitle}
                    active={activeIndex === index}
                    onActivate={() => selectTab(index)}
                  />
                ))}
              </div>

              <div className="relative p-6 sm:p-8 lg:flex lg:min-h-[420px] lg:items-center lg:p-8 xl:p-10">
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:block"
                  aria-hidden="true"
                />

                <span
                  className="pointer-events-none absolute right-8 top-8 select-none font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-none tracking-[-0.05em] text-white/[0.04] xl:right-10 xl:top-10"
                  aria-hidden="true"
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <div className="relative w-full overflow-hidden py-2">
                  <AdvantageDetail
                    key={activeIndex}
                    animate={detailAnimate}
                    itemIndex={activeIndex}
                    title={active.title}
                    lead={active.lead}
                    text={active.text}
                    highlights={active.highlights}
                  />
                </div>
              </div>
            </div>
          </div>
        </ServicesPanelGlass>
      </Container>
    </section>
  );
}
