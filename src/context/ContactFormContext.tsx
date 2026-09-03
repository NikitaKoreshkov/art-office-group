"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "art-office-contact-draft";

type Draft = {
  name: string;
  phone: string;
};

type ContactFormContextValue = {
  service: string;
  setService: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  modalOpen: boolean;
  requestService: (service: string) => void;
  openContactModal: (service?: string) => void;
  closeContactModal: () => void;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

function readDraft(): Draft {
  if (typeof window === "undefined") return { name: "", phone: "" };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { name: "", phone: "" };
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
    };
  } catch {
    return { name: "", phone: "" };
  }
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState("");
  const [name, setNameState] = useState("");
  const [phone, setPhoneState] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [draftReady, setDraftReady] = useState(false);

  useEffect(() => {
    const draft = readDraft();
    setNameState(draft.name);
    setPhoneState(draft.phone);
    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, phone }));
  }, [name, phone, draftReady]);

  const setName = useCallback((value: string) => {
    setNameState(value);
  }, []);

  const setPhone = useCallback((value: string) => {
    setPhoneState(value);
  }, []);

  const openContactModal = useCallback((nextService?: string) => {
    if (nextService) setService(nextService);
    setModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const requestService = useCallback((nextService: string) => {
    setService(nextService);
    setModalOpen(true);
  }, []);

  return (
    <ContactFormContext.Provider
      value={{
        service,
        setService,
        name,
        setName,
        phone,
        setPhone,
        modalOpen,
        requestService,
        openContactModal,
        closeContactModal,
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return ctx;
}
