"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useHomeSection } from "@/context/ContentContext";
import type { SiteContent } from "@/lib/content/types";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import styles from "./portfolio.module.css";

type PortfolioProject = SiteContent["homeSections"]["portfolio"]["items"][number];

const AUTO_ADVANCE_MS = 5500;

const PortfolioLightbox = dynamic(
  () => import("@/components/PortfolioLightbox").then((m) => ({ default: m.PortfolioLightbox })),
  { ssr: false },
);

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function Portfolio() {
  const section = useHomeSection("portfolio");
  const homeProjects = section.items.filter((p) => p.showOnHome);
  const projectCount = homeProjects.length;
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (projectCount === 0) return;
      setActiveIndex((index + projectCount) % projectCount);
      setProgressKey((k) => k + 1);
    },
    [projectCount],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused || projectCount === 0) return;

    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, isPaused, goNext, activeIndex, projectCount]);

  if (projectCount === 0) return null;

  const activeProject = homeProjects[activeIndex];

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        data-header-theme="light"
        className={`section-anchor ${styles.section}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsPaused(false);
          }
        }}
      >
        <div className={styles.bgDecor} aria-hidden="true">
          <div className={styles.diagonal} />
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/[0.1] to-transparent" />
        </div>

        <Container className="relative">
          <ScrollReveal className={styles.headingWrap}>
            <SectionHeading label={section.label} title={section.title} align="center" compact />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className={styles.mobileShowcaseWrap}>
              <ServicesPanelGlass id="portfolio-panel" className="max-lg:[--panel-radius:20px]">
                <div className={styles.showcase}>
                  <div
                    className={styles.heroPanel}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className={styles.heroSlides} aria-live="polite">
                      {homeProjects.map((project, index) => (
                        <div
                          key={project.id}
                          className={`${styles.heroSlide} ${index === activeIndex ? styles.heroSlideActive : ""}`}
                          aria-hidden={index !== activeIndex}
                        >
                          <button
                            type="button"
                            className={styles.heroImageWrap}
                            onClick={() => setLightboxProject(project)}
                            aria-label={`${project.name} — увеличить фото`}
                          >
                            <ContentImage
                              src={project.cover}
                              alt={project.name}
                              fill
                              priority={index === 0}
                              className={styles.heroImage}
                              sizes="(max-width: 1023px) 100vw, 62vw"
                              quality={90}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className={styles.heroOverlay} aria-hidden="true" />

                    <div className={styles.heroContent}>
                      <div className={styles.heroMeta}>
                        <p className={styles.heroType}>{activeProject.type}</p>
                        <p className={`${styles.heroCounter} hidden lg:block`}>
                          {padIndex(activeIndex)} / {String(projectCount).padStart(2, "0")}
                        </p>
                      </div>

                      <h3 className={styles.heroTitle}>{activeProject.name}</h3>

                      <div className={`${styles.heroActions} hidden lg:flex`}>
                        <a href={section.ctaLink} className={styles.heroBtn}>
                          {section.allProjectsLabel}
                        </a>
                      </div>
                    </div>

                    <div className={`${styles.progressTrack} hidden lg:block`} aria-hidden="true">
                      <div
                        key={progressKey}
                        className={`${styles.progressFill} ${isPaused ? "" : styles.progressFillRunning}`}
                        style={{ "--advance-duration": `${AUTO_ADVANCE_MS}ms` } as CSSProperties}
                      />
                    </div>
                  </div>

                  <div className={styles.dotTrack} role="tablist" aria-label="Проекты">
                    {homeProjects.map((project, index) => (
                      <button
                        key={project.id}
                        type="button"
                        role="tab"
                        aria-selected={index === activeIndex}
                        aria-label={project.name}
                        className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                        onClick={() => goTo(index)}
                      />
                    ))}
                  </div>

                  <div className={styles.railPanel}>
                    <div className={styles.railHeader}>
                      <p className={styles.railLabel}>{section.allProjectsLabel}</p>
                      <div className={styles.railControls}>
                        <button type="button" className={styles.railControlBtn} onClick={goPrev} aria-label="Предыдущий проект">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button type="button" className={styles.railControlBtn} onClick={goNext} aria-label="Следующий проект">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className={styles.projectList} role="tablist" aria-label="Выбор проекта">
                      {homeProjects.map((project, index) => (
                        <button
                          key={project.id}
                          type="button"
                          role="tab"
                          aria-selected={index === activeIndex}
                          className={`${styles.projectItem} ${index === activeIndex ? styles.projectItemActive : ""}`}
                          onClick={() => goTo(index)}
                        >
                          <div className={styles.projectThumb}>
                            <ContentImage
                              src={project.cover}
                              alt=""
                              fill
                              className={styles.projectThumbImage}
                              sizes="72px"
                              quality={75}
                            />
                          </div>
                          <div className={styles.projectBody}>
                            <p className={styles.projectType}>{project.type}</p>
                            <p className={styles.projectName}>{project.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </ServicesPanelGlass>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className={`${styles.ctaRow} hidden lg:flex`}>
              <a href={section.ctaLink} className={styles.ctaLink}>
                <span>{section.ctaText}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <PortfolioLightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
    </>
  );
}
