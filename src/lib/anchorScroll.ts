export function getAnchorScrollTop(target: HTMLElement): number {
  const offset = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-offset"),
  );
  const headerOffset = Number.isFinite(offset) ? offset : 84;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
}

export function scrollToAnchor(target: HTMLElement, hash: string, behavior: ScrollBehavior = "instant") {
  const top = getAnchorScrollTop(target);
  history.replaceState(null, "", hash.startsWith("#") ? hash : `#${hash}`);
  window.scrollTo({ top, left: 0, behavior });
}
