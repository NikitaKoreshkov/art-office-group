"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { SiteContent } from "@/lib/content/types";
import { ContentImage } from "@/components/ui/ContentImage";
import { getProjectPhotos } from "@/lib/portfolio-photo";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type PortfolioProject = SiteContent["homeSections"]["portfolio"]["items"][number];

type PortfolioLightboxProps = {
  project: PortfolioProject | null;
  onClose: () => void;
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

function ZoomInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M8 11h6" strokeLinecap="round" />
    </svg>
  );
}

export function PortfolioLightbox({ project, onClose }: PortfolioLightboxProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [displayProject, setDisplayProject] = useState<PortfolioProject | null>(null);
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "portfolio-lightbox-title";

  useScrollLock(Boolean(displayProject));
  useFocusTrap(Boolean(displayProject && visible), panelRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (project) {
      setDisplayProject(project);
      setIndex(0);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      requestAnimationFrame(() => setVisible(true));
    }
  }, [project]);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  const requestClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setDisplayProject(null);
      onClose();
    }, CLOSE_MS);
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (!displayProject) return;
    const photos = getProjectPhotos(displayProject);
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [displayProject]);

  const goNext = useCallback(() => {
    if (!displayProject) return;
    const photos = getProjectPhotos(displayProject);
    setIndex((i) => (i + 1) % photos.length);
  }, [displayProject]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1));
      if (next === ZOOM_MIN) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const toggleZoom = useCallback(() => {
    setZoom((z) => {
      if (z > 1) {
        setPan({ x: 0, y: 0 });
        return 1;
      }
      return 2;
    });
  }, []);

  useEffect(() => {
    if (!displayProject) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom > 1) resetZoom();
        else requestClose();
        return;
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [displayProject, requestClose, goPrev, goNext, zoom, zoomIn, zoomOut, resetZoom]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current || zoom <= 1) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!displayProject || !mounted) return null;

  const photos = getProjectPhotos(displayProject);
  if (photos.length === 0) return null;

  const image = photos[index] ?? photos[0];
  const hasMultiple = photos.length > 1;
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Viewer */}
          <div className="relative min-h-0 flex-[1.15] lg:flex-1">
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
                  <ContentImage
                    key={image}
                    src={image}
                    alt={`${displayProject.name} — фото ${index + 1}`}
                    fill
                    className="object-contain p-2 sm:p-4"
                    sizes="(max-width: 1024px) 100vw, min(1200px, 90vw)"
                    quality={90}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex max-h-[42dvh] min-h-0 w-full shrink-0 flex-col border-t border-white/[0.08] bg-dark-panel sm:max-h-none lg:w-[300px] lg:border-t-0 lg:border-l xl:w-[320px]">
            <div className="border-b border-white/[0.06] px-4 py-4 sm:px-6 sm:py-6">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/32">
                {displayProject.type}
              </p>
              <h3
                id={titleId}
                className="font-display text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[1.25rem]"
              >
                {displayProject.name}
              </h3>
            </div>

            {hasMultiple && (
              <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 sm:mb-3">
                  Все фото
                </p>
                <ul className="grid grid-cols-4 gap-2 overflow-x-auto overflow-y-auto p-0.5 [-webkit-overflow-scrolling:touch] sm:grid-cols-3 sm:gap-2.5">
                  {photos.map((thumb, i) => (
                    <li key={thumb}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Фото ${i + 1}`}
                        aria-current={i === index ? "true" : undefined}
                        className={`relative aspect-[4/3] w-full overflow-hidden rounded-md border-2 transition-[opacity,border-color] duration-200 ${
                          i === index
                            ? "border-white/75 opacity-100"
                            : "border-transparent opacity-45 hover:opacity-75"
                        }`}
                      >
                        <ContentImage
                          src={thumb}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="128px"
                          quality={75}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!hasMultiple && <div className="flex-1" />}
          </aside>
        </div>

        {/* Unified footer — one line across both panels */}
        <div className="flex shrink-0 flex-col border-t border-white/[0.08] pb-[env(safe-area-inset-bottom)] lg:flex-row">
          <div className="flex min-h-[52px] flex-1 items-center justify-between gap-2 px-3 sm:min-h-[56px] sm:gap-3 sm:px-4">
            <div className="flex items-center gap-1">
              <IconButton label="Уменьшить" onClick={zoomOut} disabled={zoom <= ZOOM_MIN}>
                <ZoomOutIcon />
              </IconButton>
              <IconButton label="Увеличить" onClick={zoomIn} disabled={zoom >= ZOOM_MAX}>
                <ZoomInIcon />
              </IconButton>
              {isZoomed && (
                <button
                  type="button"
                  onClick={resetZoom}
                  className="ml-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white/80"
                >
                  Сброс
                </button>
              )}
            </div>
            <p className="text-[11px] tabular-nums text-white/35 sm:text-[12px]">
              {Math.round(zoom * 100)}%
              {hasMultiple && (
                <span className="ml-2 text-white/25 sm:ml-3">
                  · {index + 1} / {photos.length}
                </span>
              )}
            </p>
          </div>

          {hasMultiple && (
            <div className="flex min-h-[52px] items-center justify-between gap-3 border-t border-white/[0.08] px-4 sm:min-h-[56px] sm:px-5 lg:w-[300px] lg:shrink-0 lg:border-t-0 lg:border-l xl:w-[320px]">
              <IconButton label="Предыдущее фото" onClick={goPrev}>
                <span className="text-xl leading-none">‹</span>
              </IconButton>
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/30">Галерея</p>
              <IconButton label="Следующее фото" onClick={goNext}>
                <span className="text-xl leading-none">›</span>
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
