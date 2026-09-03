import { useEffect } from "react";
import { getAnchorScrollTop } from "@/lib/anchorScroll";

let lockCount = 0;
let savedScrollY = 0;
let pendingAnchor: string | null = null;

/** После снятия lock прокрутить к секции вместо возврата на позицию открытия меню */
export function scrollToAnchorAfterUnlock(hash: string) {
  pendingAnchor = hash.startsWith("#") ? hash : `#${hash}`;
}

function lockScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    const { documentElement, body } = document;

    documentElement.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }

  lockCount += 1;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;

  const scrollY = savedScrollY;
  const { documentElement, body } = document;

  documentElement.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";

  const anchor = pendingAnchor;
  pendingAnchor = null;

  requestAnimationFrame(() => {
    if (anchor) {
      const id = anchor.slice(1);
      const target = document.getElementById(id);
      if (target) {
        history.replaceState(null, "", anchor);
        window.scrollTo({
          top: getAnchorScrollTop(target),
          left: 0,
          behavior: "instant",
        });
        return;
      }
    }

    window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
  });
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockScroll();
    return () => unlockScroll();
  }, [locked]);
}
