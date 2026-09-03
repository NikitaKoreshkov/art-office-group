"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useContacts } from "@/context/ContentContext";
import { useLanguage, useT } from "@/context/LanguageContext";
import { getWhatsappUrl } from "@/lib/contacts-utils";
import { submitContactRequest } from "@/lib/submit-contact-request";
import { ContactSubmitSuccess } from "@/components/ui/ContactSubmitSuccess";
import { useContactForm } from "@/context/ContactFormContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { contactFieldClassName } from "@/components/ui/contactFieldStyles";
import { ServicePicker } from "@/components/ui/ServicePicker";

export function ContactRequestModal() {
  const contacts = useContacts();
  const { service, setService, modalOpen, closeContactModal, name, phone, setName, setPhone } = useContactForm();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const t = useT();
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "contact-modal-title";

  useScrollLock(modalOpen);
  useFocusTrap(modalOpen, panelRef, nameInputRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    setSubmitted(false);
    setSubmitError("");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeContactModal]);

  useEffect(() => {
    if (modalOpen && service) setSubmitted(false);
  }, [modalOpen, service]);

  if (!modalOpen || !mounted) return null;

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

  const whatsappUrl = getWhatsappUrl(contacts.whatsappPhone, contacts.whatsappMessage);

  return createPortal(
    <div
      className="contact-modal-backdrop fixed inset-0 z-[200] flex items-end justify-center bg-dark-deep/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={closeContactModal}
    >
      <div
        ref={panelRef}
        className="contact-modal-panel relative flex max-h-[92dvh] w-full max-w-[480px] flex-col overflow-hidden rounded-t-[24px] border border-white/10 bg-dark-panel pt-3 shadow-[0_32px_80px_rgba(30,51,64,0.42)] sm:rounded-[24px] sm:pt-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" aria-hidden="true" />

        <button
          type="button"
          onClick={closeContactModal}
          className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-30 flex h-10 w-10 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.08] hover:text-white sm:right-5 sm:top-5"
          aria-label="Закрыть"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 pb-5 pr-16 pt-2 sm:px-7 sm:py-5 sm:pr-7">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
              {t("Бесплатный расчёт", "Тегін есеп")}
            </p>
            <h2
              id={titleId}
              className="font-display text-[clamp(1.25rem,3vw,1.5rem)] font-semibold leading-snug tracking-[-0.02em] text-white"
            >
              {service ? service : t("Оставьте заявку", "Өтінім қалдырыңыз")}
            </h2>
            {service && (
              <p className="mt-1.5 text-[14px] text-white/45">
                {t("Перезвоним и обсудим детали по этому направлению", "Осы бағыт бойынша хабарласып, мәліметтерді нақтылаймыз")}
              </p>
            )}
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-7">
          {submitted ? (
            <ContactSubmitSuccess
              onDismiss={() => {
                setSubmitted(false);
                closeContactModal();
              }}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
              <div>
                <label htmlFor="modal-contact-name" className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  {t("Имя", "Аты")}
                </label>
                <input
                  ref={nameInputRef}
                  id="modal-contact-name"
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
                <label htmlFor="modal-contact-phone" className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  {t("Телефон", "Телефон")}
                </label>
                <input
                  id="modal-contact-phone"
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

              <ServicePicker
                id="modal-contact-service"
                value={service}
                onChange={setService}
              />

              <button
                type="submit"
                disabled={submitting}
                className="!mt-6 w-full rounded-[14px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-[background-color,box-shadow,transform] hover:bg-accent-hover hover:shadow-[0_0_32px_rgba(212,43,43,0.3)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? t("Отправка...", "Жіберілуде...") : t("Отправить", "Жіберу")}
              </button>

              {submitError ? (
                <p className="text-center text-[13px] leading-relaxed text-accent">{submitError}</p>
              ) : null}

              <p className="text-center text-[12px] leading-relaxed text-white/28">
                {t(
                  "Нажимая кнопку, вы отправляете заявку — мы свяжемся с вами в рабочее время",
                  "Батырманы бассаңыз, өтінім жіберіледі — жұмыс уақытында хабарласамыз",
                )}
              </p>
            </form>
          )}
        </div>

        {!submitted && (
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.08] px-6 py-4 text-[13px] sm:px-7">
            <a
              href={contacts.phonePrimaryHref}
              className="font-medium text-white/55 transition-colors hover:text-accent"
            >
              {contacts.phonePrimary}
            </a>
            <span className="hidden text-white/15 sm:inline" aria-hidden="true">
              ·
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-white/55 transition-colors hover:text-white"
            >
              <span className="text-[#25d366]" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
