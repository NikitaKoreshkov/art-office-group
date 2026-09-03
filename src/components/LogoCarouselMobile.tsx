"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { LogoImage } from "@/components/ui/LogoImage";
import styles from "./logo-carousel.module.css";

export type LogoCarouselItem = {
  id: string;
  name: string;
  src: string;
  subtitle?: string;
};

const AUTO_ADVANCE_MS = 4000;
const SWIPE_THRESHOLD = 48;

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

type LogoCarouselMobileProps = {
  items: LogoCarouselItem[];
  ariaLabel: string;
  variant?: "clients" | "partners";
};

export function LogoCarouselMobile({
  items,
  ariaLabel,
  variant = "clients",
}: LogoCarouselMobileProps) {
  const count = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex((index + count) % count);
      setProgressKey((key) => key + 1);
    },
    [count],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const diffX = touchStartX.current - event.changedTouches[0].clientX;
      const diffY = touchStartY.current - event.changedTouches[0].clientY;

      if (Math.abs(diffX) >= SWIPE_THRESHOLD && Math.abs(diffX) >= Math.abs(diffY) * 1.2) {
        if (diffX > 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      window.setTimeout(() => setIsPaused(false), 280);
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused || count === 0) return;

    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, isPaused, goNext, activeIndex, count]);

  if (count === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <div
      className={styles.root}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.stage}>
        <div className={styles.viewport} aria-live="polite">
          <div key={activeItem.id} className={styles.slide}>
            <div className={`${styles.card} ${variant === "partners" ? styles.cardPartners : ""}`}>
              <div className={styles.logoSlot}>
                <LogoImage
                  src={activeItem.src}
                  alt={activeItem.name}
                  fill
                  sizes="(max-width: 640px) 72vw, 176px"
                  className={styles.logo}
                  priority={activeIndex === 0}
                />
              </div>
            </div>

            <div className={styles.caption}>
              <p className={styles.name}>{activeItem.name}</p>
              {activeItem.subtitle && <p className={styles.subtitle}>{activeItem.subtitle}</p>}
            </div>
          </div>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <div
            key={progressKey}
            className={`${styles.progressFill} ${isPaused || reducedMotion ? "" : styles.progressFillRunning}`}
            style={{ "--advance-duration": `${AUTO_ADVANCE_MS}ms` } as CSSProperties}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.counter}>
          {padIndex(activeIndex)} / {String(count).padStart(2, "0")}
        </span>
        <div className={styles.dotTrack} role="tablist" aria-label="Логотипы">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={item.name}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
