"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { SiteContent } from "@/lib/content/types";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type ServiceItem = SiteContent["homeSections"]["services"]["items"][number];

type ServiceImageLightboxProps = {
  services: ServiceItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const CLOSE_MS = 280;
const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.5;

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-white/55 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:h-9 sm:w-9"
    >
      {children}
    </button>
  );
}

export function ServiceImageLightbox({
  services,
  index,
  onClose,
  onIndexChange,
}: ServiceImageLightboxProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "service-lightbox-title";

  const open = index !== null && Boolean(services[index]?.image);
  const service = index !== null ? services[index] : null;
  const hasMultiple = services.length > 1;

  useScrollLock(open);
  useFocusTrap(open && visible, panelRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open, index]);

  const requestClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (index === null || services.length === 0) return;
    onIndexChange((index - 1 + services.length) % services.length);
  }, [index, onIndexChange, services.length]);

  const goNext = useCallback(() => {
    if (index === null || services.length === 0) return;
    onIndexChange((index + 1) % services.length);
  }, [index, onIndexChange, services.length]);

  const zoomIn = useCallback(() => {
    setZoom((value) => Math.min(ZOOM_MAX, +(value + ZOOM_STEP).toFixed(1)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((value) => {
      const next = Math.max(ZOOM_MIN, +(value - ZOOM_STEP).toFixed(1));
      if (next === ZOOM_MIN) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const toggleZoom = useCallback(() => {
    setZoom((value) => {
      if (value > 1) {
        setPan({ x: 0, y: 0 });
        return 1;
      }
      return 2;
    });
  }, []);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (zoom > 1) resetZoom();
        else requestClose();
        return;
      }
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-") zoomOut();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, requestClose, goPrev, goNext, zoom, zoomIn, zoomOut, resetZoom]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current || zoom <= 1) return;
    setPan({
      x: dragStart.current.panX + (event.clientX - dragStart.current.x),
      y: dragStart.current.panY + (event.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  if (!mounted || !open || !service?.image) return null;

  const isZoomed = zoom > 1;

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-end justify-center p-0 transition-opacity duration-300 sm:items-center sm:p-5 lg:p-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={requestClose}
    >
      <div className="absolute inset-0 bg-dark-deep/92 backdrop-blur-sm" aria-hidden="true" />

      <button
        type="button"
        onClick={requestClose}
        className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-30 flex h-10 w-10 items-center justify-center text-white/45 transition-colors hover:text-white sm:right-5 sm:top-5"
        aria-label="Закрыть"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <div
        ref={panelRef}
        className={`relative z-10 flex h-[100dvh] w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-dark-panel shadow-none transition-[opacity,transform] duration-300 sm:h-[min(88vh,860px)] sm:max-w-[min(1280px,96vw)] sm:rounded-[18px] sm:border sm:border-white/10 sm:shadow-[0_40px_100px_rgba(30,51,64,0.55)] lg:h-[min(84vh,820px)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="relative min-h-0 flex-[1.15] lg:flex-1">
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-dark/55 text-white/70 backdrop-blur-sm transition-colors hover:text-white sm:left-4"
                  aria-label="Предыдущее направление"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-dark/55 text-white/70 backdrop-blur-sm transition-colors hover:text-white sm:right-4"
                  aria-label="Следующее направление"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}

            <div
              className={`relative h-full min-h-[200px] overflow-hidden bg-dark sm:min-h-[240px] lg:min-h-0 ${isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onDoubleClick={toggleZoom}
            >
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    key={service.image}
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-2 sm:p-4"
                    sizes="(max-width: 1024px) 100vw, min(1200px, 90vw)"
                    quality={90}
                    priority
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="flex max-h-[42dvh] min-h-0 w-full shrink-0 flex-col border-t border-white/[0.08] bg-dark-panel sm:max-h-none lg:w-[300px] lg:border-t-0 lg:border-l xl:w-[320px]">
            <div className="border-b border-white/[0.06] px-4 py-4 sm:px-6 sm:py-6">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/32">
                Направление {index !== null ? String(index + 1).padStart(2, "0") : ""}
              </p>
              <h3
                id={titleId}
                className="font-display text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[1.25rem]"
              >
                {service.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.65] text-white/45 sm:text-[14px]">{service.description}</p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-1">
                <IconButton label="Уменьшить" onClick={zoomOut} disabled={zoom <= ZOOM_MIN}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3M8 11h6" strokeLinecap="round" />
                  </svg>
                </IconButton>
                <IconButton label="Увеличить" onClick={zoomIn} disabled={zoom >= ZOOM_MAX}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                  </svg>
                </IconButton>
              </div>
              {hasMultiple && index !== null && (
                <p className="text-[11px] font-semibold tabular-nums tracking-[0.08em] text-white/35">
                  {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}
