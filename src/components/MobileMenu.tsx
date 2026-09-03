"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { scrollToAnchorAfterUnlock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useContacts, useSiteContent } from "@/context/ContentContext";
import { useT } from "@/context/LanguageContext";
import { getWhatsappUrl } from "@/lib/contacts-utils";

type NavLink = {
  href: string;
  label: string;
  page?: true;
};


type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onOrderCall: () => void;
};

export function MobileMenu({ open, onClose, onOrderCall }: MobileMenuProps) {
  const { content } = useSiteContent();
  const contacts = useContacts();
  const navLinks = content.header.navLinks as NavLink[];
  const whatsappUrl = getWhatsappUrl(contacts.whatsappPhone, contacts.whatsappMessage);
  const t = useT();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "mobile-menu-title";

  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleNavClick = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToAnchorAfterUnlock(href);
    onClose();
  };

  return (
    <div
      data-mobile-menu
      data-header-theme="dark"
      className={`fixed inset-0 z-40 lg:hidden ${
        open ? "visible" : "invisible"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-dark-deep/90 backdrop-blur-2xl transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={`mobile-menu-panel relative flex h-full flex-col px-[var(--container-px)] pt-[calc(env(safe-area-inset-top)+4.75rem)] ${
          open ? "is-open" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open ? true : undefined}
      >
        <div className="flex items-center justify-end pb-8">
          <p id={titleId} className="sr-only">
            ART OFFICE GROUP
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white"
            aria-label="Закрыть меню"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1" aria-label="Мобильная навигация">
          {navLinks.map(({ href, label, page }, index) => {
            const linkClassName =
              "mobile-menu-link group flex min-h-[56px] items-center gap-5 border-b border-white/[0.06] py-4";
            const linkStyle = { transitionDelay: open ? `${100 + index * 70}ms` : "0ms" };
            const linkContent = (
              <>
                <span className="font-display text-[13px] tabular-nums tracking-[0.08em] text-white/25 transition-colors group-hover:text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.5rem,6vw,2rem)] font-semibold tracking-[-0.03em] text-white transition-colors group-hover:text-accent whitespace-nowrap">
                  {label}
                </span>
              </>
            );

            return page ? (
              <Link key={href} href={href} onClick={onClose} style={linkStyle} className={linkClassName}>
                {linkContent}
              </Link>
            ) : (
              <a key={href} href={href} onClick={handleNavClick(href)} style={linkStyle} className={linkClassName}>
                {linkContent}
              </a>
            );
          })}
        </nav>

        <div
          className={`mobile-menu-footer mt-auto shrink-0 rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 pb-5 mb-[calc(2.75rem+env(safe-area-inset-bottom))] backdrop-blur-md ${
            open ? "" : ""
          }`}
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">
            {t("Связаться", "Байланысу")}
          </p>
          <div className="mb-4 space-y-2">
            <a
              href={contacts.phonePrimaryHref}
              onClick={onClose}
              className="block font-display text-[1.125rem] font-medium tracking-[-0.01em] text-white"
            >
              {contacts.phonePrimary}
            </a>
            <a
              href={contacts.phoneSecondaryHref}
              onClick={onClose}
              className="block text-[15px] text-white/45"
            >
              {contacts.phoneSecondary}
            </a>
          </div>
          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-[14px] font-medium text-white/80"
            >
              <span className="text-[#25d366]" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOrderCall();
              }}
              className="h-12 flex-[1.2] rounded-xl bg-accent px-4 text-[13px] font-semibold leading-tight text-white sm:text-[14px]"
            >
              {content.header.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
