"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { useContacts, useSiteContent } from "@/context/ContentContext";
import { useLanguage, useT } from "@/context/LanguageContext";
import { getMapEmbedUrl, getMapSearchUrl, getWhatsappUrl } from "@/lib/contacts-utils";
import { submitContactRequest } from "@/lib/submit-contact-request";
import { ContactSubmitSuccess } from "@/components/ui/ContactSubmitSuccess";
import { useContactForm } from "@/context/ContactFormContext";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactFieldClassName } from "@/components/ui/contactFieldStyles";
import { ServicePicker } from "@/components/ui/ServicePicker";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import { useHydrated } from "@/hooks/useHydrated";
import styles from "./contact-form.module.css";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OfficeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactRow({
  icon,
  iconClass,
  children,
}: {
  icon: ReactNode;
  iconClass: string;
  children: ReactNode;
}) {
  return (
    <li className="group flex gap-4 py-5 first:pt-0 last:pb-0">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 group-hover:border-white/[0.14] group-hover:bg-white/[0.05] ${iconClass}`}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1 pt-1">{children}</div>
    </li>
  );
}

function PhoneLink({ href, label, number, primary }: { href: string; label: string; number: string; primary?: boolean }) {
  return (
    <a
      href={href}
      className="group/link block rounded-lg py-1 transition-colors"
    >
      <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/28 transition-colors group-hover/link:text-white/40">
        {label}
      </span>
      <span
        className={`block tracking-[-0.01em] transition-colors group-hover/link:text-accent ${
          primary ? "font-display text-[18px] font-medium text-white" : "text-[15px] font-medium text-white/55"
        }`}
      >
        {number}
      </span>
    </a>
  );
}

function ContactActionsMobile() {
  const contacts = useContacts();
  const whatsappUrl = getWhatsappUrl(contacts.whatsappPhone, contacts.whatsappMessage);
  const t = useT();

  return (
    <div className={`${styles.mobileActions} lg:hidden`}>
      <div className={styles.mobileActionsGrid}>
        <a href={contacts.phonePrimaryHref} className={styles.mobileActionCard}>
          <span className={`${styles.mobileActionIcon} text-accent`}>
            <PhoneIcon />
          </span>
          <span>
            <span className={styles.mobileActionTitle}>{t("Позвонить", "Қоңырау шалу")}</span>
            <span className={styles.mobileActionHint}>{contacts.phonePrimary}</span>
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileActionCard}
        >
          <span className={`${styles.mobileActionIcon} text-[#25d366]`}>
            <WhatsAppIcon />
          </span>
          <span>
            <span className={styles.mobileActionTitle}>WhatsApp</span>
            <span className={styles.mobileActionHint}>{t("Быстрый ответ", "Жылдам жауап")}</span>
          </span>
        </a>
      </div>

      <a href={contacts.phoneSecondaryHref} className={styles.mobileSecondaryPhone}>
        <span className="text-white/45">{t("Городской", "Қалалық")}</span>
        <span className="font-medium text-white/75">{contacts.phoneSecondary}</span>
      </a>

      <p className="mt-2.5 text-center text-[11px] text-white/30">{contacts.hours}</p>
    </div>
  );
}

function OfficeMapPanel({ className = "" }: { className?: string }) {
  const contacts = useContacts();
  const { lat, lng } = contacts.mapCoordinates;
  const [mapLoaded, setMapLoaded] = useState(false);
  const t = useT();

  return (
    <div className={className}>
      <div className={`${styles.mapFrame} relative w-full`}>
        {mapLoaded ? (
          <iframe
            src={getMapEmbedUrl(lat, lng)}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта офиса ART OFFICE GROUP"
            className="absolute inset-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setMapLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a1d24] px-6 text-center transition-colors hover:bg-[#22262f]"
            aria-label="Показать карту офиса ART OFFICE GROUP"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            </span>
            <span className="max-w-[220px] text-[13px] font-medium leading-relaxed text-white/70">
              {t("Показать карту офиса", "Кеңсе картасын көрсету")}
            </span>
          </button>
        )}
      </div>
      <div className={styles.mapFooter}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="shrink-0 text-accent"
          aria-hidden="true"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className={styles.mapAddress}>
          {contacts.address}
          <span className="mt-0.5 block text-[12px] font-normal text-white/45">{contacts.addressMeta}</span>
        </p>
        <a
          href={getMapSearchUrl(lat, lng, contacts.address)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapOpenLink}
        >
          {t("Открыть", "Ашу")}
        </a>
      </div>
    </div>
  );
}

function ContactInfoDesktop() {
  const contacts = useContacts();
  const whatsappUrl = getWhatsappUrl(contacts.whatsappPhone, contacts.whatsappMessage);
  const t = useT();

  return (
    <div className="hidden border-b border-white/[0.07] p-5 sm:p-6 lg:block lg:border-b-0 lg:border-r lg:border-white/[0.07] lg:p-8 lg:py-9">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/32">
        {t("Связаться с нами", "Бізбен байланысу")}
      </p>
      <p className="mb-6 max-w-[320px] text-[14px] leading-relaxed text-white/38 sm:mb-7">
        {t(
          "Позвоните, напишите в WhatsApp или оставьте заявку — ответим в рабочие часы.",
          "Қоңырау шалыңыз, WhatsApp-қа жазыңыз немесе өтінім қалдырыңыз — жұмыс уақытында міндетті түрде жауап береміз.",
        )}
      </p>

      <ul className="divide-y divide-white/[0.07]">
        <ContactRow icon={<PhoneIcon />} iconClass="text-accent">
          <div className="space-y-3">
            <PhoneLink
              href={contacts.phonePrimaryHref}
              label={t("Мобильный", "Ұялы")}
              number={contacts.phonePrimary}
              primary
            />
            <PhoneLink
              href={contacts.phoneSecondaryHref}
              label={t("Городской", "Қалалық")}
              number={contacts.phoneSecondary}
            />
          </div>
        </ContactRow>

        <ContactRow icon={<WhatsAppIcon />} iconClass="text-[#25d366]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link block rounded-lg transition-colors"
          >
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/28 transition-colors group-hover/link:text-white/40">
              {t("Мессенджер", "Мессенджер")}
            </span>
            <span className="block text-[15px] font-medium text-white/70 transition-colors group-hover/link:text-white">
              {t("Написать в WhatsApp", "WhatsApp арқылы жазу")}
            </span>
          </a>
        </ContactRow>

        <ContactRow icon={<OfficeIcon />} iconClass="text-white/55 group-hover:text-white/75">
          <div>
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/28">
              {t("Офис", "Кеңсе")}
            </span>
            <p className="text-[14px] leading-[1.7] text-white/48">
              {contacts.company}
              <br />
              {contacts.address}
              <br />
              <span className="text-white/35">{contacts.hours}</span>
            </p>
          </div>
        </ContactRow>
      </ul>
    </div>
  );
}

function ContactFormFieldsSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-[76px] rounded-[14px] bg-white/[0.04]" />
        <div className="h-[76px] rounded-[14px] bg-white/[0.04]" />
      </div>
      <div className="h-[76px] rounded-[14px] bg-white/[0.04]" />
      <div className="mt-6 h-[52px] rounded-[14px] bg-white/[0.06]" />
    </div>
  );
}

export function ContactForm() {
  const { content } = useSiteContent();
  const contactsSection = content.homeSections.contacts;
  const { service, setService, name, phone, setName, setPhone } = useContactForm();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const hydrated = useHydrated();
  const t = useT();
  const { lang } = useLanguage();

  useEffect(() => {
    if (service) {
      setSubmitted(false);
      setSubmitError("");
    }
  }, [service]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!service || !name.trim() || !phone.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await submitContactRequest({ name, phone, service }, lang);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t("Не удалось отправить заявку", "Өтінімді жіберу мүмкін болмады"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacts" className={`section-anchor ${styles.section}`}>
      <Container>
        <ScrollReveal>
          <div className={`${styles.headingWrap} mb-5 sm:mb-6 lg:mb-8 [&>div]:!mb-0`}>
            <SectionHeading
              label={contactsSection.label}
              title={contactsSection.title}
              subtitle={contactsSection.formSubtitle}
              theme="dark"
              compact
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <div className={styles.panelWrap}>
            <div className={`${styles.mapPanel} ${styles.mapPanelDesktop}`}>
              <ServicesPanelGlass id="contact-map-panel" className="max-lg:[--panel-radius:20px]">
                <OfficeMapPanel />
              </ServicesPanelGlass>
            </div>

            <ServicesPanelGlass id="contact-form-panel" className="max-lg:[--panel-radius:20px]">
              <div className={`${styles.panelGrid} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`}>
                <ContactActionsMobile />
                <ContactInfoDesktop />

                <div className={styles.formCol}>
                  <div className={`${styles.formIntro} hidden lg:block`}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/32">
                      {t("Форма заявки", "Өтінім формасы")}
                    </p>
                    <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-white">
                      {contactsSection.formTitle || t("Бесплатный расчёт проекта", "Жобаны тегін есептеу")}
                    </h3>
                  </div>

                  {submitted ? (
                    <ContactSubmitSuccess onDismiss={() => setSubmitted(false)} />
                  ) : !hydrated ? (
                    <ContactFormFieldsSkeleton />
                  ) : (
                    <form onSubmit={handleSubmit} className={styles.formFields} suppressHydrationWarning>
                      <div className={styles.formRow}>
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                          >
                            {t("Имя", "Аты")}
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={contactFieldClassName}
                            placeholder={t("Как к вам обращаться", "Атыңыз")}
                            suppressHydrationWarning
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                          >
                            {t("Телефон", "Телефон")}
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={contactFieldClassName}
                            placeholder="+7 (___) ___-__-__"
                            suppressHydrationWarning
                          />
                        </div>
                      </div>

                      <ServicePicker id="contact-service" value={service} onChange={setService} />

                      <button type="submit" className={styles.submitBtn} disabled={submitting}>
                        {submitting ? t("Отправка...", "Жіберілуде...") : t("Отправить", "Жіберу")}
                      </button>

                      {submitError ? (
                        <p className="text-center text-[13px] leading-relaxed text-accent">{submitError}</p>
                      ) : null}

                      <p className={styles.formLegal}>
                        {t(
                          "Нажимая кнопку, вы отправляете заявку — мы свяжемся с вами в рабочее время",
                          "Батырманы бассаңыз, өтінім жіберіледі — жұмыс уақытында хабарласамыз",
                        )}
                      </p>
                    </form>
                  )}
                </div>

                <OfficeMapPanel className={`${styles.mapPanelMobile} lg:hidden`} />
              </div>
            </ServicesPanelGlass>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
