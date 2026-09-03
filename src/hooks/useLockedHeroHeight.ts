"use client";

import { useEffect, type RefObject } from "react";

const MOBILE_MQ = "(max-width: 639px)";

/**
 * Locks hero block height on mobile so Chrome's collapsing URL bar
 * does not resize the section and stretch the background video.
 */
export function useLockedHeroHeight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mq = window.matchMedia(MOBILE_MQ);

    const clear = () => {
      node.style.removeProperty("height");
      node.style.removeProperty("min-height");
      node.style.removeProperty("max-height");
      document.documentElement.style.removeProperty("--hero-locked-h");
    };

    const lock = () => {
      if (!mq.matches) {
        clear();
        return;
      }

      const height = window.innerHeight;
      const px = `${height}px`;
      document.documentElement.style.setProperty("--hero-locked-h", px);
      node.style.height = px;
      node.style.minHeight = px;
      node.style.maxHeight = px;
    };

    lock();

    const onOrientation = () => {
      window.setTimeout(lock, 200);
    };

    mq.addEventListener("change", lock);
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      mq.removeEventListener("change", lock);
      window.removeEventListener("orientationchange", onOrientation);
      clear();
    };
  }, [ref]);
}
