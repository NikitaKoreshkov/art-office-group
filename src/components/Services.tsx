"use client";

import { useContactForm } from "@/context/ContactFormContext";
import { useHomeSection } from "@/context/ContentContext";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  const { requestService } = useContactForm();
  const section = useHomeSection("services");

  return (
    <section
      id="services"
      data-header-theme="light"
      className="section-noise relative section-anchor section-py bg-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.38]" />
      </div>

      <Container>
        <SectionHeading
          label={section.label}
          title={section.title}
          align="center"
          compact
        />

        <ServicesCarousel onRequestService={requestService} />
      </Container>
    </section>
  );
}
