type AdvantageIconProps = {
  icon: "turnkey" | "design" | "license" | "measure";
  className?: string;
};

export function AdvantageIcon({ icon, className = "h-7 w-7" }: AdvantageIconProps) {
  const props = {
    className,
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "turnkey":
      return (
        <svg {...props}>
          <path d="M5 22V11l9-7 9 7v11" />
          <path d="M10 22v-7h8v7" />
          <path d="M11 11h6" />
        </svg>
      );
    case "design":
      return (
        <svg {...props}>
          <path d="M5 23l5-16 8 3 5-9" />
          <circle cx="21" cy="1" r="1.5" fill="currentColor" stroke="none" />
          <path d="M5 23h18" opacity="0.35" />
        </svg>
      );
    case "license":
      return (
        <svg {...props}>
          <rect x="5" y="4" width="18" height="20" rx="2" />
          <path d="M9 10h10M9 14h10M9 18h5" />
          <path d="M16.5 18.5l1.5 1.5 3.5-3.5" strokeWidth="1.6" />
        </svg>
      );
    case "measure":
      return (
        <svg {...props}>
          <path d="M6 20l12-12" />
          <path d="M8 18l2 2M11 15l2 2M14 12l2 2M17 9l2 2" />
          <circle cx="20" cy="6" r="2.5" />
        </svg>
      );
  }
}
