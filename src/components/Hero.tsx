"use client";

import { useEffect, useRef, useState } from "react";
import { useContactForm } from "@/context/ContactFormContext";
import { useSiteContent } from "@/context/ContentContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLockedHeroHeight } from "@/hooks/useLockedHeroHeight";
import { canPlayHeroVideo } from "@/lib/media";

export function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;
  const { openContactModal } = useContactForm();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enableVideo, setEnableVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useLockedHeroHeight(sectionRef);

  useEffect(() => {
    const update = () => setEnableVideo(canPlayHeroVideo());
    update();

    const desktopMq = window.matchMedia("(min-width: 640px)");
    desktopMq.addEventListener("change", update);

    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    conn?.addEventListener?.("change", update);

    return () => {
      desktopMq.removeEventListener("change", update);
      conn?.removeEventListener?.("change", update);
    };
  }, []);

  const parallaxRef = useRef({
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  useEffect(() => {
    if (!enableVideo) {
      setIsVideoPlaying(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const markPlaying = () => {
      video.classList.add("is-playing");
      setIsVideoPlaying(true);
    };

    const tryPlay = () => {
      if (reducedMotion) return;
      video
        .play()
        .then(markPlaying)
        .catch(() => {});
    };

    const onLoadedData = () => {
      if (video.readyState >= 2) markPlaying();
      tryPlay();
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", tryPlay);

    if (video.readyState >= 2) onLoadedData();
    else tryPlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else if (!reducedMotion) video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };

    document.addEventListener("visibilitychange", onVisibility);

    const unlockOnTouch = () => {
      tryPlay();
    };
    window.addEventListener("touchstart", unlockOnTouch, { once: true, passive: true });

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", tryPlay);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchstart", unlockOnTouch);
    };
  }, [enableVideo]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 1023px)").matches;
    if (prefersReduced || isCoarsePointer || isNarrow) return;

    const section = sectionRef.current;
    const videoLayer = videoLayerRef.current;
    const contentText = contentTextRef.current;
    if (!section || !videoLayer || !contentText) return;

    let rafId = 0;
    let parallaxActive = false;

    const lerp = (from: number, to: number, factor: number) => from + (to - from) * factor;

    const tick = () => {
      if (!parallaxActive) return;

      const state = parallaxRef.current;
      state.mouseX = lerp(state.mouseX, state.targetMouseX, 0.09);
      state.mouseY = lerp(state.mouseY, state.targetMouseY, 0.09);

      const scroll = state.scrollY;

      const videoScrollY = scroll * 0.28;
      const contentScrollY = -scroll * 0.52;

      const videoX = state.mouseX * 70;
      const videoY = state.mouseY * 50 + videoScrollY;
      videoLayer.style.transform = `translate3d(${videoX}px, ${videoY}px, 0) scale(1.2)`;

      const contentX = state.mouseX * -24;
      const contentY = state.mouseY * -16 + contentScrollY;
      contentText.style.transform = `translate3d(${contentX}px, ${contentY}px, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const state = parallaxRef.current;
      state.targetMouseX = (e.clientX - rect.left) / rect.width - 0.5;
      state.targetMouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0) {
        parallaxActive = false;
        stopParallax();
        return;
      }

      const heroHeight = section.offsetHeight;
      parallaxRef.current.scrollY = Math.min(heroHeight, Math.max(0, -rect.top));
    };

    const startParallax = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    };

    const resetParallaxStyles = () => {
      contentText.style.transform = "";
      videoLayer.style.transform = "";
    };

    const stopParallax = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      resetParallaxStyles();
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        parallaxActive = entry.isIntersecting;
        if (parallaxActive) {
          startParallax();
        } else {
          stopParallax();
        }
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(section);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      visibilityObserver.disconnect();
      stopParallax();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      resetParallaxStyles();
    };
  }, []);

  return (
    <div
      id="hero-video"
      ref={sectionRef}
      data-header-theme="dark"
      className="relative z-0 flex w-full max-w-full items-end justify-center overflow-hidden bg-dark sm:aspect-[18/9] sm:min-h-[480px] sm:max-h-svh sm:items-center lg:min-h-[520px]"
    >
      <div
        ref={videoLayerRef}
        className="hero-video-layer absolute inset-0 overflow-hidden will-change-transform motion-reduce:transform-none"
        aria-hidden="true"
      >
        {hero.poster ? (
          <div
            className={`hero-video-poster ${enableVideo && isVideoPlaying ? "hero-video-poster--hidden" : ""}`}
            style={{ backgroundImage: `url(${hero.poster})` }}
            aria-hidden="true"
          />
        ) : null}

        {enableVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={hero.poster}
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        ) : null}

        <div className="hero-mobile-vignette absolute inset-0 z-[2]" aria-hidden="true" />
        <div className="hero-glass-arch absolute inset-0 z-[2]" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-start px-[var(--container-px)] pb-24 pt-[calc(var(--header-offset)+1rem)] text-left sm:items-center sm:pb-0 sm:text-center sm:py-[calc(var(--header-offset)+2rem)]">
        <div
          ref={contentTextRef}
          className="flex w-full flex-col items-start will-change-transform motion-reduce:transform-none sm:items-center"
        >
          <ScrollReveal delay={0} className="w-full sm:w-auto">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/40 sm:mb-5">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              {hero.badge}
            </p>
            <h1 className="hero-title mb-4 max-w-[min(100%,20rem)] text-balance font-extrabold uppercase text-white sm:mb-5 sm:max-w-none sm:text-center">
              {hero.title}
              {hero.titleAccent ? (
                <>
                  {" "}
                  <span className="hero-accent-underline">{hero.titleAccent}</span>
                </>
              ) : null}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={120} className="w-full sm:w-auto">
            <div className="mb-6 flex w-full max-w-[640px] flex-col items-start gap-2.5 sm:mb-8 sm:items-center sm:gap-1.5">
              <p className="max-w-[22ch] text-pretty text-[clamp(15px,4.2vw,26px)] font-semibold leading-snug text-white/90 sm:max-w-none sm:text-center sm:whitespace-nowrap sm:text-white/95">
                {hero.subtitle1}
              </p>
              <p className="max-w-[20ch] text-pretty text-[clamp(15px,4.2vw,26px)] font-semibold leading-snug text-white/75 sm:max-w-none sm:text-center sm:whitespace-nowrap sm:text-white/95">
                {hero.subtitle2}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180} className="w-full sm:w-auto">
            <div className="flex w-full max-w-[520px] flex-col items-stretch gap-3 sm:max-w-[560px] sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => openContactModal()}
                className="btn-accent-glow inline-flex min-h-[52px] w-full flex-1 items-center justify-center whitespace-nowrap rounded-[14px] bg-accent px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_40px_rgba(212,43,43,0.35)] transition-[box-shadow,background-color] duration-300 hover:bg-accent-hover hover:shadow-[0_0_40px_rgba(212,43,43,0.5)] sm:min-h-[48px] sm:basis-0 sm:rounded-xl sm:px-6 sm:py-4 sm:text-[15px] sm:shadow-none"
              >
                {hero.ctaPrimary}
              </button>
              <div
                className="hero-glass-btn inline-flex min-h-[52px] w-full flex-1 items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 sm:min-h-[48px] sm:basis-0 sm:rounded-xl sm:px-6 sm:py-4"
                aria-label={`${hero.yearsCount} ${hero.yearsLabel}`}
              >
                <span className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em] text-white">
                  {hero.yearsCount}
                </span>
                <span className="text-[13px] font-semibold uppercase leading-tight tracking-[0.08em] text-white/90 sm:text-[14px]">
                  {hero.yearsLabel}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div
        className="hero-scroll-hint pointer-events-none absolute z-20 flex flex-col items-center gap-2 sm:hidden"
        aria-hidden="true"
      >
        <span className="hero-scroll-hint-text text-[9px] font-semibold uppercase tracking-[0.24em] text-white/30">
          {hero.scrollHint}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="hero-scroll-hint-icon text-white/40"
        >
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
