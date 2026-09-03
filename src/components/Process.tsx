"use client";

import { useCallback, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { useHomeSection } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import { useInView } from "@/hooks/useInView";
import styles from "./process.module.css";

function ProcessStep({
  num,
  title,
  text,
  highlight,
  isLast,
}: {
  num: string;
  title: string;
  text: string;
  highlight?: string;
  isLast: boolean;
}) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.35, rootMargin: "0px 0px -10% 0px" });

  const content: ReactNode = highlight ? (
    <>
      {text}
      <span className="text-ink">{highlight}</span>
    </>
  ) : (
    text
  );

  return (
    <li
      ref={ref}
      className={`relative pl-8 sm:pl-10 ${isLast ? "" : "pb-5 sm:pb-7"}`}
    >
      <span
        className={`process-step-dot absolute left-0 top-1.5 flex h-[13px] w-[13px] items-center justify-center rounded-full border border-ink/12 bg-[#eceef2] sm:h-[17px] sm:w-[17px] ${inView ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <span className="h-[5px] w-[5px] rounded-full bg-accent sm:h-[6px] sm:w-[6px]" />
      </span>

      <div className={`scroll-reveal scroll-reveal-left ${inView ? "is-visible" : ""}`}>
        <p className="mb-2 font-display text-[12px] font-medium tabular-nums tracking-[0.08em] text-[#8b919c]">
          {num}
        </p>

        <h3 className="mb-2 text-[clamp(1rem,1.8vw,1.25rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
          {title}
        </h3>

        <p className="max-w-[400px] text-[14px] leading-[1.65] text-[#5c6370]">{content}</p>
      </div>
    </li>
  );
}

function ProcessMobile({
  steps,
  activeIndex,
  onSelect,
  onTouchStart,
  onTouchEnd,
}: {
  steps: { num: string; title: string; text: string; highlight?: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}) {
  const active = steps[activeIndex];

  const mobileText: ReactNode = active.highlight ? (
    <>
      {active.text}
      <span className="text-ink">{active.highlight}</span>
    </>
  ) : (
    active.text
  );

  return (
    <div className={styles.mobileRoot} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className={styles.mobileViewport} aria-live="polite">
        <span className={styles.mobileAccentBar} aria-hidden="true" />
        <p className={styles.mobileCounter} aria-hidden="true">
          {active.num} / {String(steps.length).padStart(2, "0")}
        </p>

        <div
          key={active.num}
          id={`process-slide-${activeIndex}`}
          role="tabpanel"
          aria-label={`Шаг ${activeIndex + 1}: ${active.title}`}
          className={styles.mobileSlide}
        >
          <span className={styles.mobileWatermark} aria-hidden="true">
            {active.num}
          </span>

          <div className={styles.mobileBody}>
            <p className={styles.mobileStepLabel}>Шаг {active.num}</p>
            <h3 className={styles.mobileTitle}>{active.title}</h3>
            <p className={styles.mobileText}>{mobileText}</p>
          </div>
        </div>
      </div>

      <div className={styles.dotTrack} role="tablist" aria-label="Этапы процесса">
        {steps.map(({ num, title }, index) => (
          <button
            key={num}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`process-slide-${index}`}
            aria-label={`${num}. ${title}`}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export function Process() {
  const section = useHomeSection("process");
  const { lang } = useLanguage();
  const steps = section.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: timelineRef, inView: timelineInView } = useInView<HTMLOListElement>({
    threshold: 0.08,
    rootMargin: "0px 0px -5% 0px",
  });

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + steps.length) % steps.length);
    },
    [steps.length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

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
    <section data-header-theme="light" className="section-noise relative section-py overflow-hidden bg-[#eceef2]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-diagonal-lines opacity-[0.22]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/[0.08] to-transparent" />
      </div>

      <Container>
        <div className="lg:hidden">
          <SectionHeading label={section.label} title={section.title} align="center" compact />
          <p className={styles.headingAccent}>{section.accent}</p>
        </div>

        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-x-12 xl:gap-x-14">
          <ScrollReveal
            className={`hidden w-full shrink-0 text-center lg:block lg:sticky lg:top-28 ${lang === "kz" ? "lg:max-w-[360px]" : "max-w-[280px]"}`}
            threshold={0.2}
            rootMargin="0px 0px -6% 0px"
          >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8b919c]">
              {section.label}
            </p>
            <h2
              className={`font-display text-[clamp(1.25rem,4vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink ${lang === "kz" ? styles.processTitleKz : ""}`}
            >
              {section.title}
            </h2>
            <p className="mt-1.5 font-display text-[clamp(0.95rem,2.5vw,1.2rem)] font-medium tracking-[-0.02em] text-accent">
              {section.accent}
            </p>
          </ScrollReveal>

          <ServicesPanelGlass
            id="process-panel"
            className="w-full max-lg:[--panel-radius:20px] lg:max-w-[480px] lg:shrink-0 lg:[--panel-radius:22px]"
          >
            <div className="lg:hidden">
              <ProcessMobile
                steps={steps}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
            </div>

            <ol ref={timelineRef} className="relative hidden px-6 py-5 sm:px-8 sm:py-6 lg:block">
              <div
                className={`process-timeline absolute bottom-5 left-[calc(1.5rem+6px)] top-5 w-px bg-gradient-to-b from-transparent via-[#d42b2b]/35 to-transparent sm:bottom-6 sm:left-[calc(2rem+8px)] sm:top-6 ${timelineInView ? "is-visible" : ""}`}
                aria-hidden="true"
              />

              {steps.map(({ num, title, text, highlight }, index) => (
                <ProcessStep
                  key={num}
                  num={num}
                  title={title}
                  text={text}
                  highlight={highlight}
                  isLast={index === steps.length - 1}
                />
              ))}
            </ol>
          </ServicesPanelGlass>
        </div>
      </Container>
    </section>
  );
}
