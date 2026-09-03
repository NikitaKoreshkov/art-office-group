"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useHomeSection } from "@/context/ContentContext";
import { useT } from "@/context/LanguageContext";
import type { SiteContent } from "@/lib/content/types";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import styles from "./services-carousel.module.css";

const INTERVAL_MS = 5500;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const ServiceImageLightbox = dynamic(
  () => import("@/components/ServiceImageLightbox").then((m) => ({ default: m.ServiceImageLightbox })),
  { ssr: false },
);

type ServiceItem = SiteContent["homeSections"]["services"]["items"][number];

function ServiceNavItem({
  service,
  active,
  isLast,
  onActivate,
  tabRef,
}: {
  service: ServiceItem;
  active: boolean;
  isLast: boolean;
  onActivate: () => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={service.title}
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`${styles.navTab} group relative flex flex-col items-center justify-center gap-1 px-2 py-2.5 min-[670px]:max-lg:flex-1 min-[670px]:max-lg:min-w-0 min-[670px]:max-lg:shrink min-[670px]:max-lg:gap-1 min-[670px]:max-lg:px-1 min-[670px]:max-lg:py-2 max-[669px]:min-h-[64px] max-[669px]:min-w-[4.25rem] max-[669px]:shrink-0 lg:min-h-[72px] lg:flex-1 lg:min-w-0 lg:shrink lg:px-1.5 ${
        active ? styles.navTabActive : ""
      } ${active ? "max-lg:shadow-[inset_0_-2px_0_0_#d42b2b]" : ""}`}
    >
      {!isLast && (
        <span className={`${styles.navDivider} absolute inset-y-3 right-0 w-px sm:inset-y-4`} aria-hidden="true" />
      )}

      <span
        className={`${styles.navIcon} flex h-8 w-8 shrink-0 items-center justify-center min-[670px]:max-lg:h-7 min-[670px]:max-lg:w-7 lg:h-10 lg:w-10 ${
          active ? "text-accent" : "text-ink group-hover:text-[#5c6370]"
        }`}
      >
        <ServiceIcon icon={service.icon} className="h-[16px] w-[16px] min-[670px]:max-lg:h-[14px] min-[670px]:max-lg:w-[14px] lg:h-[20px] lg:w-[20px]" />
      </span>

      <span
        className={`${styles.navLabel} line-clamp-2 max-w-[9ch] text-center font-display text-[9px] font-semibold leading-[1.2] tracking-[-0.02em] min-[670px]:max-lg:max-w-full min-[670px]:max-lg:text-[8px] min-[670px]:max-lg:leading-[1.15] lg:max-w-none lg:px-0.5 lg:text-[10px] lg:leading-tight ${
          active ? "text-ink" : "text-[#8b919c] group-hover:text-[#5c6370]"
        }`}
      >
        {service.title}
      </span>
    </button>
  );
}

function ServiceSlide({
  service,
  index,
  total,
  onRequest,
  onImageClick,
}: {
  service: ServiceItem;
  index: number;
  total: number;
  onRequest: () => void;
  onImageClick: () => void;
}) {
  const t = useT();
  return (
    <div
      className={`${styles.slideGrid} flex flex-col max-lg:min-h-0 lg:grid lg:grid-rows-1 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,1fr)]`}
    >
      <div className={`${styles.imageWrap} relative w-full shrink-0 lg:h-full lg:min-h-0`}>
        {service.image && (
          <button
            type="button"
            className={styles.imageButton}
            onClick={onImageClick}
            aria-label={`${service.title} — увеличить фото`}
          >
            <div className={styles.imageInner}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={90}
                priority
              />
            </div>
          </button>
        )}
        <div className={styles.imageShine} aria-hidden="true" />
        <div className="absolute inset-0 bg-dark/15" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/8 to-transparent lg:hidden"
          aria-hidden="true"
        />
        <div className={`${styles.slideBadge} absolute bottom-3 left-3 hidden items-center gap-2 sm:bottom-4 sm:left-4 lg:flex lg:bottom-7 lg:left-7`}>
          <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className={`${styles.contentPane} relative flex flex-col`}>
        <span
          className={`${styles.indexWatermark} pointer-events-none absolute right-4 top-4 hidden select-none font-display font-bold leading-none tracking-[-0.05em] text-ink/[0.035] sm:block`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className={`${styles.contentBody} min-h-0 flex-1`}>
          <h3 className={`${styles.contentTitle} font-display font-semibold tracking-[-0.04em] text-ink lg:max-w-[14ch]`}>
            {service.title}
          </h3>

          <p className={`${styles.contentDescription} text-[#5c6370]`}>
            {service.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onRequest}
          className={`${styles.contentCta} ${styles.ctaButton} inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand text-white hover:bg-accent hover:shadow-[0_16px_40px_-12px_rgba(212,43,43,0.5)] lg:w-fit`}
        >
          {t("Заказать расчёт", "Есептеуге тапсырыс беру")}
          <span aria-hidden="true" className={`${styles.ctaArrow} text-[13px]`}>
            →
          </span>
        </button>
      </div>

    </div>
  );
}

export function ServicesCarousel({ onRequestService }: { onRequestService: (title: string) => void }) {
  const section = useHomeSection("services");
  const services = section.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const active = services[activeIndex];
  const showProgress = !paused && !reducedMotion && lightboxIndex === null;

  const syncIndicator = useCallback(() => {
    const tab = tabRefs.current[activeIndex];
    const scroll = navScrollRef.current;
    if (!tab || !scroll) return;

    setIndicator({
      left: tab.offsetLeft,
      width: tab.offsetWidth,
    });
  }, [activeIndex]);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + services.length) % services.length);
  }, [services.length]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
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

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useLayoutEffect(() => {
    syncIndicator();
  }, [syncIndicator]);

  useEffect(() => {
    const scroll = navScrollRef.current;
    if (!scroll) return;

    const onResize = () => syncIndicator();
    window.addEventListener("resize", onResize, { passive: true });
    scroll.addEventListener("scroll", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      scroll.removeEventListener("scroll", onResize);
    };
  }, [syncIndicator]);

  useEffect(() => {
    let scrollEndTimer = 0;

    const onScroll = () => {
      scrollingRef.current = true;
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        scrollingRef.current = false;
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollEndTimer);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || lightboxIndex !== null) return;

    const id = window.setInterval(() => {
      if (scrollingRef.current) return;
      goNext();
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, reducedMotion, goNext, lightboxIndex]);

  return (
    <div
      className={styles.carouselRoot}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <ServicesPanelGlass id="services-panel" className="max-lg:[--panel-radius:20px]">
        <div className={styles.panelInner}>
          <div className={`${styles.navRail} hidden min-[670px]:block`} role="tablist" aria-label="Все направления">
            <div ref={navScrollRef} className={styles.navScroll}>
              <div
                className={styles.navIndicator}
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  transitionTimingFunction: EASE,
                }}
                aria-hidden="true"
              >
                {showProgress && (
                  <span
                    key={activeIndex}
                    className={styles.navIndicatorProgress}
                    style={{ "--progress-duration": `${INTERVAL_MS}ms` } as CSSProperties}
                  />
                )}
              </div>

              {services.map((service, index) => (
                <ServiceNavItem
                  key={service.id}
                  service={service}
                  active={index === activeIndex}
                  isLast={index === services.length - 1}
                  onActivate={() => goTo(index)}
                  tabRef={(el) => {
                    tabRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className={styles.slideWrap}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <ServiceSlide
              service={active}
              index={activeIndex}
              total={services.length}
              onRequest={() => onRequestService(active.title)}
              onImageClick={() => setLightboxIndex(activeIndex)}
            />
          </div>

          <div className={`${styles.dotTrack} min-[670px]:hidden`} role="tablist" aria-label="Направления">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={service.title}
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </ServicesPanelGlass>

      <ServiceImageLightbox
        services={services}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={(nextIndex) => {
          setLightboxIndex(nextIndex);
          setActiveIndex(nextIndex);
        }}
      />
    </div>
  );
}
