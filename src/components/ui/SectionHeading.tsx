type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  compact?: boolean;
};

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  theme = "light",
  compact = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`${compact ? "mb-4 sm:mb-5 lg:mb-6" : "mb-6 sm:mb-8 lg:mb-10"} ${isCenter ? "text-center" : "text-left"}`}
    >
      {label && (
        <div className={`mb-2.5 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
          {!isCenter && (
            <span
              className={`h-px w-8 sm:hidden ${isDark ? "bg-accent/70" : "bg-accent"}`}
              aria-hidden="true"
            />
          )}
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-[11px] sm:tracking-[0.22em] ${
              isDark ? "text-white/40" : "text-[#8b919c]"
            }`}
          >
            {label}
          </p>
        </div>
      )}
      <h2
        className={`font-display text-[clamp(1.625rem,7vw,2.625rem)] font-semibold leading-[1.08] tracking-[-0.03em] sm:leading-[1.12] sm:tracking-[-0.025em] ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {isCenter && (
        <div className="mx-auto mt-3 h-[2px] w-14 overflow-hidden rounded-full sm:mt-4 sm:w-16" aria-hidden="true">
          <div className="accent-line-shimmer h-full w-full" />
        </div>
      )}
      {subtitle && (
        <p
          className={`mt-3 max-w-[560px] text-[14px] leading-[1.7] sm:mt-4 sm:text-[15px] sm:leading-[1.65] ${
            isCenter ? "mx-auto" : ""
          } ${isDark ? "text-white/55" : "text-[#5c6370]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
