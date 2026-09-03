"use client";

import type { ReactNode } from "react";
import { useContacts, useSiteContent } from "@/context/ContentContext";
import { getWhatsappUrl } from "@/lib/contacts-utils";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type FooterProps = {
  embedded?: boolean;
};

function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">
      {children}
    </p>
  );
}

function SocialIcon({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-white/40 transition-all duration-300 hover:border-white/[0.16] hover:text-white/90"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{children}</span>
    </a>
  );
}

export function Footer({ embedded = false }: FooterProps) {
  const { content } = useSiteContent();
  const contacts = useContacts();
  const { footer } = content;
  const whatsappUrl = getWhatsappUrl(contacts.whatsappPhone, contacts.whatsappMessage);

  return (
    <footer
      className={`footer-surface relative z-[2] pb-8 sm:pb-10 lg:pb-12 ${
        embedded ? "pt-[clamp(3rem,7vw,5rem)]" : "pt-[clamp(2.5rem,6vw,4rem)]"
      }`}
    >
      <div className="footer-divider" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-10 lg:gap-14">
          <ScrollReveal variant="left" rootMargin="0px 0px 0px 0px">
            <div>
              <ColumnLabel>Компания</ColumnLabel>
              <p className="text-[14px] font-medium leading-relaxed text-white/70">{contacts.company}</p>
              {!embedded && (
                <address className="mt-3 not-italic text-[13px] leading-[1.85] text-white/42">
                  {contacts.address}
                  <br />
                  <span className="text-white/35">{contacts.hours}</span>
                </address>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80} className="sm:justify-self-end" rootMargin="0px 0px 0px 0px">
            <div>
              <ColumnLabel>Соцсети</ColumnLabel>
              <div className="flex items-center gap-2">
                <SocialIcon label="WhatsApp" href={whatsappUrl}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="Instagram" href={contacts.instagram}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="footer-bottom mt-8 flex flex-col gap-3 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-7 lg:mt-12">
          <p className="text-[13px] leading-relaxed text-white/45">
            <span aria-hidden="true">© </span>
            {footer.year} {contacts.company}. {footer.copyrightSuffix}
          </p>
          <div className="flex flex-col gap-1 sm:items-end">
            <a
              href={`mailto:${contacts.email}`}
              className="text-[13px] text-white/45 transition-colors hover:text-white/75"
            >
              {contacts.email}
            </a>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/28">
              {footer.location}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
