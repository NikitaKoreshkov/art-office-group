"use client";

import { useEffect } from "react";
import { useT } from "@/context/LanguageContext";
import styles from "./contact-submit-success.module.css";

type ContactSubmitSuccessProps = {
  onDismiss: () => void;
  autoDismissMs?: number;
};

export function ContactSubmitSuccess({ onDismiss, autoDismissMs = 3200 }: ContactSubmitSuccessProps) {
  const t = useT();

  useEffect(() => {
    const timer = window.setTimeout(onDismiss, autoDismissMs);
    return () => window.clearTimeout(timer);
  }, [autoDismissMs, onDismiss]);

  return (
    <div className={styles.root} role="status" aria-live="polite">
      <div className={styles.checkWrap} aria-hidden="true">
        <svg className={styles.checkSvg} viewBox="0 0 52 52">
          <circle className={styles.checkCircle} cx="26" cy="26" r="25" fill="none" />
          <path className={styles.checkMark} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <h3 className={styles.title}>{t("Отправилось", "Жіберілді")}</h3>
      <p className={styles.subtitle}>{t("Ожидайте, мы скоро свяжемся с вами", "Күтіңіз, жақын арада хабарласамыз")}</p>
    </div>
  );
}
