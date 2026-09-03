"use client";

import { useHomeSection } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";
import { LogoCarouselMobile } from "@/components/LogoCarouselMobile";
import { LogoMarqueeDesktop } from "@/components/LogoMarqueeDesktop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionCtaLink } from "@/components/ui/SectionCtaLink";

export function Partners() {
  const section = useHomeSection("partners");
  const items = section.items.map((partner) => ({
    id: partner.id,
    name: partner.name,
    src: partner.src,
  }));

  return (
    <section
      id="partners"
      data-header-theme="light"
      className="section-noise relative section-anchor overflow-hidden section-py bg-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/[0.08] to-transparent" />
      </div>

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            label={section.label}
            title={section.title}
            subtitle={section.subtitle}
            align="center"
            compact
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="lg:hidden">
            <LogoCarouselMobile items={items} ariaLabel="Логотипы партнёров" variant="partners" />
          </div>
          <div className="hidden lg:block">
            <LogoMarqueeDesktop
              panelId="partners-panel"
              items={items}
              marqueeClassName="partners-marquee"
              ariaLabel="Логотипы партнёров"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <SectionCtaLink href={section.ctaLink ?? "/partners"}>{section.ctaText ?? "Все партнёры"}</SectionCtaLink>
        </ScrollReveal>
      </Container>
    </section>
  );
}
