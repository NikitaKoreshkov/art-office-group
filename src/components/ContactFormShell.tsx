"use client";

import { type ReactNode } from "react";
import { ContactFormProvider } from "@/context/ContactFormContext";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { ContactRequestModal } from "@/components/ContactRequestModal";

export function ContactFormShell({ children }: { children: ReactNode }) {
  return (
    <ContactFormProvider>
      <MobileMenuProvider>
        {children}
        <ContactRequestModal />
      </MobileMenuProvider>
    </ContactFormProvider>
  );
}
