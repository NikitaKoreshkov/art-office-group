import { Footer } from "@/components/Footer";

type FooterSectionProps = {
  /** Внутри ContactFooterRegion — без отдельного фона */
  embedded?: boolean;
};

export function FooterSection({ embedded = false }: FooterSectionProps) {
  return (
    <div
      className={embedded ? "relative" : "relative bg-dark-deep"}
      data-header-theme="dark"
    >
      {!embedded && (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.03) 0%, transparent 38%)",
          }}
        />
      )}
      <Footer embedded={embedded} />
    </div>
  );
}
