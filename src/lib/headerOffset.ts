export function getHeaderOffsetPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-offset").trim();
  if (!raw) return 84;

  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 84;

  if (raw.includes("rem")) {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return value * rootFontSize;
  }

  return value;
}
