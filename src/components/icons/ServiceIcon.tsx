import type { ServiceIconId } from "@/lib/content/types";

type ServiceIconProps = {
  icon: ServiceIconId;
  className?: string;
};

export function ServiceIcon({ icon, className = "h-7 w-7" }: ServiceIconProps) {
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
    case "partitions":
      return (
        <svg {...props}>
          <rect x="4" y="5" width="20" height="18" rx="1" />
          <path d="M14 5v18M8 11h4M16 17h4" />
        </svg>
      );
    case "doors":
      return (
        <svg {...props}>
          <rect x="6" y="4" width="16" height="20" rx="1" />
          <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
          <path d="M6 14h16" opacity="0.35" />
        </svg>
      );
    case "windows":
      return (
        <svg {...props}>
          <rect x="4" y="6" width="20" height="16" rx="1" />
          <path d="M14 6v16M4 14h20" />
        </svg>
      );
    case "facades":
      return (
        <svg {...props}>
          <path d="M4 24V10l10-6 10 6v14" />
          <rect x="9" y="14" width="4" height="6" />
          <rect x="15" y="14" width="4" height="6" />
        </svg>
      );
    case "railings":
      return (
        <svg {...props}>
          <path d="M4 20h20M6 20V10M11 20V10M17 20V10M22 20V10" />
          <path d="M4 10h20" />
        </svg>
      );
    case "glass":
      return (
        <svg {...props}>
          <path d="M4 18L14 8l10 10" />
          <path d="M8 18h12" opacity="0.5" />
        </svg>
      );
    case "shower":
      return (
        <svg {...props}>
          <rect x="7" y="5" width="14" height="18" rx="1.5" />
          <path d="M7 11h14" opacity="0.45" />
          <circle cx="14" cy="8" r="1" fill="currentColor" stroke="none" />
          <path d="M10 16h8M10 19h5" opacity="0.55" />
        </svg>
      );
    case "design":
      return (
        <svg {...props}>
          <path d="M6 22l4-14 8 4 4-8" />
          <circle cx="20" cy="4" r="2" />
        </svg>
      );
  }
}
