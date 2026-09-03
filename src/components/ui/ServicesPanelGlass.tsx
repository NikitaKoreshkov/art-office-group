"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";
import styles from "./services-panel-glass.module.css";

const ACTIVATION_ZONE = 200;
const ELASTICITY = 0.18;
const LERP = 0.08;
const MOBILE_MQ = "(max-width: 1023px)";

interface ServicesPanelGlassProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Отключает mouse-эффекты и backdrop-filter — для тяжёлых секций при скролле */
  lite?: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function ServicesPanelGlass({
  children,
  id = "services-panel",
  className = "",
  lite = false,
}: ServicesPanelGlassProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const geomRef = useRef({ cx: 0, cy: 0, w: 0, h: 0 });
  const mouseRef = useRef({ x: 0, y: 0, fade: 0 });
  const currentRef = useRef({ tx: 0, ty: 0, sx: 1, sy: 1 });
  const rafActiveRef = useRef(false);
  const scrollRafRef = useRef(0);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const mobileRef = useRef(false);

  const effectsDisabled = useCallback(
    () => lite || reducedMotionRef.current || mobileRef.current,
    [lite],
  );

  const updateRim = useCallback((offsetX: number, offsetY: number) => {
    const rim = rimRef.current;
    if (!rim) return;

    const rimAngle = 135 + offsetX * 1.5;
    const rimPeak = Math.min(1, 1 + Math.abs(offsetX) * 0.002);
    const rimEdge = Math.min(0.9, (Math.abs(offsetX) + Math.abs(offsetY)) * 0.001);

    rim.style.background = `linear-gradient(${rimAngle}deg,
      rgba(255,255,255,${rimEdge}) 0%,
      rgba(255,255,255,${rimPeak}) 45%,
      rgba(255,255,255,${rimPeak * 0.9}) 55%,
      rgba(255,255,255,${rimEdge * 0.7}) 100%)`;
  }, []);

  const resetElastic = useCallback(() => {
    mouseRef.current = { x: 0, y: 0, fade: 0 };
    currentRef.current = { tx: 0, ty: 0, sx: 1, sy: 1 };
    rafActiveRef.current = false;
    updateRim(0, 0);
    const el = shellRef.current;
    if (el) {
      el.style.transform = "";
      el.style.willChange = "auto";
    }
  }, [updateRim]);

  const syncGeom = useCallback(() => {
    const el = shellRef.current;
    if (!el || !visibleRef.current) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1) return;
    geomRef.current = {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      w: rect.width,
      h: rect.height,
    };
  }, []);

  const calcTarget = useCallback(() => {
    const { cx, cy, w } = geomRef.current;
    const { x: mx, y: my, fade } = mouseRef.current;
    if (w < 1 || fade <= 0) {
      return { tx: 0, ty: 0, sx: 1, sy: 1 };
    }

    const tx = (mx - cx) * ELASTICITY * 0.1 * fade;
    const ty = (my - cy) * ELASTICITY * 0.1 * fade;

    const deltaX = mx - cx;
    const deltaY = my - cy;
    const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
    const nx = deltaX / centerDistance;
    const ny = deltaY / centerDistance;
    const stretch = Math.min(centerDistance / 300, 1) * ELASTICITY * fade;
    const sx = 1 + Math.abs(nx) * stretch * 0.3 - Math.abs(ny) * stretch * 0.15;
    const sy = 1 + Math.abs(ny) * stretch * 0.3 - Math.abs(nx) * stretch * 0.15;

    return {
      tx,
      ty,
      sx: Math.max(0.985, sx),
      sy: Math.max(0.985, sy),
    };
  }, []);

  const startRaf = useCallback(() => {
    if (effectsDisabled() || rafActiveRef.current || !visibleRef.current) return;
    rafActiveRef.current = true;

    const tick = () => {
      const target = calcTarget();
      const c = currentRef.current;
      c.tx = lerp(c.tx, target.tx, LERP);
      c.ty = lerp(c.ty, target.ty, LERP);
      c.sx = lerp(c.sx, target.sx, LERP);
      c.sy = lerp(c.sy, target.sy, LERP);

      const el = shellRef.current;
      if (el) {
        el.style.transform = `translate3d(${c.tx}px, ${c.ty}px, 0) scale(${c.sx}, ${c.sy})`;
      }

      const settled =
        Math.abs(c.tx - target.tx) < 0.02 &&
        Math.abs(c.ty - target.ty) < 0.02 &&
        Math.abs(c.sx - target.sx) < 0.001 &&
        Math.abs(c.sy - target.sy) < 0.001;

      if (!settled || mouseRef.current.fade > 0.001) {
        requestAnimationFrame(tick);
      } else {
        rafActiveRef.current = false;
        if (el) el.style.willChange = "auto";
      }
    };

    const el = shellRef.current;
    if (el) el.style.willChange = "transform";
    requestAnimationFrame(tick);
  }, [calcTarget, effectsDisabled]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const syncMobile = () => {
      const wasMobile = mobileRef.current;
      mobileRef.current = mq.matches;
      if (mq.matches && !wasMobile) resetElastic();
    };
    syncMobile();
    mq.addEventListener("change", syncMobile);
    return () => mq.removeEventListener("change", syncMobile);
  }, [resetElastic]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = shellRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!effectsDisabled()) syncGeom();
        } else {
          resetElastic();
        }
      },
      { rootMargin: "80px 0px", threshold: 0 },
    );

    observer.observe(el);

    const onScroll = () => {
      if (effectsDisabled() || !visibleRef.current) return;
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(syncGeom);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(scrollRafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [effectsDisabled, lite, resetElastic, syncGeom]);

  useEffect(() => {
    if (lite) return;

    const onMove = (e: MouseEvent) => {
      if (effectsDisabled() || !visibleRef.current) return;

      syncGeom();
      const { cx, cy, w, h } = geomRef.current;
      if (w < 1) return;

      const edgeX = Math.max(0, Math.abs(e.clientX - cx) - w / 2);
      const edgeY = Math.max(0, Math.abs(e.clientY - cy) - h / 2);
      const dist = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
      const fade = dist > ACTIVATION_ZONE ? 0 : 1 - dist / ACTIVATION_ZONE;

      mouseRef.current = { x: e.clientX, y: e.clientY, fade };
      updateRim(((e.clientX - cx) / w) * 100 * fade, ((e.clientY - cy) / h) * 100 * fade);
      startRaf();
    };

    const onLeave = () => {
      mouseRef.current = { x: 0, y: 0, fade: 0 };
      updateRim(0, 0);
      startRaf();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [effectsDisabled, lite, syncGeom, startRaf, updateRim]);

  return (
    <div
      id={id}
      ref={shellRef}
      className={`${styles.shell} ${lite ? styles.shellLite : ""} ${className}`.trim()}
    >
      <div ref={rimRef} className={styles.rim} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
