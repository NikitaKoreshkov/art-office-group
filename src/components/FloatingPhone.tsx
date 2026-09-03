"use client";

import { useMobileMenu } from "@/context/MobileMenuContext";
import { useContacts } from "@/context/ContentContext";

export function FloatingPhone() {
  const { menuOpen } = useMobileMenu();
  const contacts = useContacts();

  if (menuOpen) return null;

  return (
    <a
      href={contacts.phonePrimaryHref}
      aria-label={`Позвонить ${contacts.phonePrimary}`}
      className="group fixed z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_28px_rgba(212,43,43,0.5)] transition-[transform,box-shadow] duration-300 hover:bg-accent-hover hover:shadow-[0_10px_36px_rgba(212,43,43,0.55)] active:scale-95 sm:h-[56px] sm:w-[56px]"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        right: "max(1.25rem, env(safe-area-inset-right))",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  );
}
