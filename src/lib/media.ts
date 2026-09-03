/** Не грузить тяжёлые медиа при экономии трафика или медленной сети. */
export function prefersLightMedia(): boolean {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return true;

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (conn?.saveData) return true;

  const slow = conn?.effectiveType;
  if (slow === "slow-2g" || slow === "2g" || slow === "3g") return true;

  return false;
}

export function canPlayHeroVideo(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersLightMedia()) return false;
  return window.matchMedia("(min-width: 640px)").matches;
}
