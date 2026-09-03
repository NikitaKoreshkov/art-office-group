"use client";

import { useHomeSection } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";
import { LogoCarouselMobile } from "@/components/LogoCarouselMobile";
import { LogoMarqueeDesktop } from "@/components/LogoMarqueeDesktop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionCtaLink } from "@/components/ui/SectionCtaLink";
import styles from "./clients.module.css";

export function Clients() {
  const section = useHomeSection("clients");
  const items = section.items.map((client) => ({
    id: client.id,
    name: client.name,
    src: client.src,
    subtitle: client.category,
  }));

  return (
    <section
      id="clients"
      data-header-theme="light"
      className={`section-noise relative section-anchor overflow-hidden bg-[#eceef2] ${styles.section}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-diagonal-lines opacity-[0.12]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/[0.08] to-transparent" />
      </div>

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading label={section.label} title={section.title} align="center" compact />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="lg:hidden">
            <LogoCarouselMobile items={items} ariaLabel="Логотипы клиентов" variant="clients" />
          </div>
          <div className="hidden lg:block">
            <LogoMarqueeDesktop
              panelId="clients-panel"
              items={items}
              marqueeClassName="clients-marquee"
              ariaLabel="Логотипы клиентов"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <SectionCtaLink href={section.ctaLink ?? "/clients"}>{section.ctaText ?? "Все клиенты"}</SectionCtaLink>
        </ScrollReveal>
      </Container>
    </section>
  );
}
