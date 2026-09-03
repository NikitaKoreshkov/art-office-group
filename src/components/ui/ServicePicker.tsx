"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHomeSection } from "@/context/ContentContext";
import { useT } from "@/context/LanguageContext";
import { contactFieldClassName } from "@/components/ui/contactFieldStyles";

type ServicePickerProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

export function ServicePicker({
  id,
  label,
  value,
  onChange,
  required = true,
}: ServicePickerProps) {
  const t = useT();
  const servicesSection = useHomeSection("services");
  const serviceOptions = [...servicesSection.items.map((s) => s.title), servicesSection.extraOption];
  const generatedId = useId();
  const pickerId = id ?? generatedId;
  const listboxId = `${pickerId}-listbox`;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const resolvedLabel = label ?? t("Что интересует", "Не қызықтырады");
  const displayValue = value || t("Выберите направление", "Қызметті таңдаңыз");

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (document.getElementById(listboxId)?.contains(target)) return;
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onLayout = () => updateMenuPosition();

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onLayout);
    window.addEventListener("scroll", onLayout, true);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("scroll", onLayout, true);
    };
  }, [open, listboxId]);

  const menu =
    open && menuPos && mounted ? (
      <ul
        id={listboxId}
        role="listbox"
        aria-labelledby={`${pickerId}-label`}
        style={{
          top: menuPos.top,
          left: menuPos.left,
          width: menuPos.width,
        }}
        className="fixed z-[250] max-h-[220px] overflow-y-auto rounded-[14px] border border-white/10 bg-dark-deep p-1 shadow-[0_20px_48px_rgba(30,51,64,0.55)]"
      >
        {serviceOptions.map((option) => {
          const selected = option === value;

          return (
            <li key={option} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-colors ${
                  selected
                    ? "bg-white/[0.08] text-white"
                    : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span>{option}</span>
                {selected && (
                  <span className="text-accent" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div ref={rootRef} className="relative">
      <label
        id={`${pickerId}-label`}
        htmlFor={pickerId}
        className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40"
      >
        {resolvedLabel}
      </label>

      <input type="hidden" name="service" value={value} required={required} suppressHydrationWarning />

      <button
        ref={triggerRef}
        id={pickerId}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-labelledby={`${pickerId}-label`}
        aria-haspopup="listbox"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) requestAnimationFrame(updateMenuPosition);
        }}
        className={`${contactFieldClassName} flex items-center justify-between gap-3 text-left ${
          open ? "border-white/20 bg-dark-deep/60 shadow-[0_0_0_3px_rgba(255,255,255,0.04)]" : ""
        } ${!value ? "text-white/30" : "text-white"}`}
      >
        <span className="truncate">{displayValue}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {menu && createPortal(menu, document.body)}
    </div>
  );
}
