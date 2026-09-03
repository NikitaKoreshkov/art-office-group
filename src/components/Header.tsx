"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useContactForm } from "@/context/ContactFormContext";
import { useMobileMenu } from "@/context/MobileMenuContext";
import { useSiteContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsappUrl } from "@/lib/contacts-utils";
import { MobileMenu } from "./MobileMenu";
import { useScrollLock } from "@/hooks/useScrollLock";

type NavLink = {
  href: string;
  label: string;
  page?: true;
};

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LangSwitcher({ onLightBg }: { onLightBg: boolean }) {
  const { lang, setLang } = useLanguage();

  const baseBtn = `text-[11px] font-bold tracking-widest px-1.5 py-0.5 rounded-md transition-all duration-200 leading-none`;
  const activeClass = onLightBg
    ? "text-ink bg-ink/10"
    : "text-white bg-white/15";
  const inactiveClass = onLightBg
    ? "text-ink/35 hover:text-ink/60"
    : "text-white/35 hover:text-white/60";
  const dividerClass = onLightBg ? "text-ink/20" : "text-white/20";

  return (
    <div className="flex items-center gap-0.5" aria-label="Выбор языка">
      <button
        type="button"
        onClick={() => setLang("ru")}
        className={`${baseBtn} ${lang === "ru" ? activeClass : inactiveClass}`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
      <span className={`text-[10px] select-none ${dividerClass}`} aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLang("kz")}
        className={`${baseBtn} ${lang === "kz" ? activeClass : inactiveClass}`}
        aria-pressed={lang === "kz"}
      >
        KZ
      </button>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { content } = useSiteContent();
  const { header, branding, contacts } = content;
  const whatsappUrl = getWhatsappUrl(contacts.whatsappPhone, contacts.whatsappMessage);
  const navLinks = header.navLinks as NavLink[];
  const { menuOpen, setMenuOpen, toggleMenu } = useMobileMenu();
  const [onLightBg, setOnLightBg] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { openContactModal } = useContactForm();

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    history.replaceState(null, "", "/");
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let rafId = 0;
    let themedSections: HTMLElement[] = [];
    let lastOnLight: boolean | null = null;

    const cacheSections = () => {
      themedSections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    };

    const resolveThemeAt = (probeY: number): boolean => {
      for (const section of themedSections) {
        const sRect = section.getBoundingClientRect();
        if (probeY >= sRect.top && probeY < sRect.bottom) {
          return section.dataset.headerTheme === "light";
        }
      }

      const hero = document.getElementById("hero-video");
      if (hero) {
        const hRect = hero.getBoundingClientRect();
        if (probeY < hRect.bottom) return false;
      }

      return lastOnLight ?? false;
    };

    const update = () => {
      const rect = header.getBoundingClientRect();
      const probeY = rect.top + rect.height * 0.55;
      const next = resolveThemeAt(probeY);

      if (next !== lastOnLight) {
        lastOnLight = next;
        setOnLightBg(next);
      }
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onScroll = () => {
      scheduleUpdate();
    };

    const onResize = () => {
      cacheSections();
      scheduleUpdate();
    };

    cacheSections();
    scheduleUpdate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  useScrollLock(menuOpen);

  const iconLight = menuOpen || !onLightBg;

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header fixed top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 z-50 w-[calc(100%-20px)] max-w-[1200px] -translate-x-1/2 rounded-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-[max-width,border-color,background-color] duration-300 sm:top-5 sm:w-[calc(100%-40px)] sm:rounded-[20px] sm:shadow-none ${
          lang === "kz" ? "lg:max-w-[1280px] xl:max-w-[1380px]" : ""
        } ${
          onLightBg ? "site-header-light border-ink/10" : "site-header-dark border-white/15"
        }`}
      >
        <div className="grid min-h-[60px] grid-cols-[1fr_auto] items-center gap-3 px-3 sm:min-h-[72px] sm:gap-4 sm:px-6 lg:grid-cols-3">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex min-w-0 shrink items-center gap-2.5 justify-self-start"
            aria-label={`${branding.companyName} — на главную`}
          >
            <Image
              src={branding.logo}
              alt=""
              width={2000}
              height={2678}
              priority
              aria-hidden="true"
              className="header-logo-mark h-11 w-auto sm:h-12"
            />
            <span
              className={`block truncate text-[11px] font-bold tracking-tight transition-colors sm:text-[13px] ${
                onLightBg ? "text-ink" : "text-white"
              }`}
            >
              {branding.companyName}
            </span>
          </Link>

          <nav
            className="hidden min-w-0 shrink items-center justify-center gap-3 justify-self-center whitespace-nowrap lg:flex xl:gap-4 2xl:gap-5"
            aria-label="Основная навигация"
          >
            {navLinks.map(({ href, label, page }) => {
              const linkClassName = `relative shrink-0 whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full xl:text-[14px] ${
                onLightBg ? "text-[#2a2d35] hover:text-ink" : "text-white/85 hover:text-white"
              }`;

              return page ? (
                <Link key={href} href={href} className={linkClassName}>
                  {label}
                </Link>
              ) : (
                <a key={href} href={href} className={linkClassName}>
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-2 sm:gap-4">
            <LangSwitcher onLightBg={onLightBg} />
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[#25d366] transition-transform hover:scale-105 hover:bg-[#25d366]/10"
              >
                <WhatsAppIcon />
              </a>
              <button
                type="button"
                onClick={() => openContactModal()}
                className={`inline-flex shrink-0 items-center rounded-xl bg-accent px-4 py-2.5 font-semibold text-white transition-[box-shadow,background-color] duration-300 hover:bg-accent-hover hover:shadow-[0_0_28px_rgba(212,43,43,0.45)] ${
                  lang === "kz" ? "text-[13px] tracking-[-0.01em] xl:px-5 xl:text-sm" : "px-[18px] text-sm"
                }`}
              >
                {header.ctaButton}
              </button>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span
                className={`block h-0.5 w-6 origin-center rounded-full transition-transform transition-colors duration-300 ease-out ${
                  iconLight ? "bg-white" : "bg-ink"
                } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 origin-center rounded-full transition-[opacity,background-color] duration-300 ease-out ${
                  iconLight ? "bg-white" : "bg-ink"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 origin-center rounded-full transition-transform transition-colors duration-300 ease-out ${
                  iconLight ? "bg-white" : "bg-ink"
                } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOrderCall={openContactModal} />
    </>
  );
}
