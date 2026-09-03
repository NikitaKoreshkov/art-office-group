import type { ReactNode } from "react";

const REGION_GRADIENT = {
  backgroundImage:
    "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.03) 0%, transparent 38%)",
} as const;

type ContactFooterRegionProps = {
  children: ReactNode;
};

export function ContactFooterRegion({ children }: ContactFooterRegionProps) {
  return (
    <div
      className="relative mt-6 overflow-hidden rounded-t-[28px] bg-dark-deep sm:-mt-10 sm:mt-0 sm:overflow-visible sm:rounded-none"
      data-header-theme="dark"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={REGION_GRADIENT} />
      <div className="relative">{children}</div>
    </div>
  );
}
