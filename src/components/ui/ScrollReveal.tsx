"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left";
  threshold?: number;
  rootMargin?: string;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: ScrollRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold, rootMargin });

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${variant === "left" ? "scroll-reveal-left" : ""} ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
