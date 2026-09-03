"use client";

import dynamic from "next/dynamic";
import { useSiteContent } from "@/context/ContentContext";
import { Advantages } from "@/components/Advantages";
import { Services } from "@/components/Services";
import type { HomeSectionId } from "@/lib/content/types";

const Portfolio = dynamic(
  () => import("@/components/Portfolio").then((m) => ({ default: m.Portfolio })),
  { ssr: true },
);
const Clients = dynamic(
  () => import("@/components/Clients").then((m) => ({ default: m.Clients })),
  { ssr: true },
);
const Partners = dynamic(
  () => import("@/components/Partners").then((m) => ({ default: m.Partners })),
  { ssr: true },
);
const Process = dynamic(
  () => import("@/components/Process").then((m) => ({ default: m.Process })),
  { ssr: true },
);
const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((m) => ({ default: m.ContactForm })),
  { ssr: true },
);
const ContactFooterRegion = dynamic(
  () => import("@/components/ContactFooterRegion").then((m) => ({ default: m.ContactFooterRegion })),
  { ssr: true },
);
const FooterSection = dynamic(
  () => import("@/components/FooterSection").then((m) => ({ default: m.FooterSection })),
  { ssr: true },
);

const SECTION_MAP: Record<HomeSectionId, React.ComponentType> = {
  services: Services,
  advantages: Advantages,
  portfolio: Portfolio,
  clients: Clients,
  partners: Partners,
  process: Process,
  contacts: ContactForm,
};

export function SiteContent() {
  const { content } = useSiteContent();
  const { order } = content.homeSections;

  return (
    <div
      id="site-content"
      className="relative z-20 bg-light motion-reduce:transform-none"
    >
      {order.map((sectionId) => {
        const section = content.homeSections[sectionId];
        if (!section.enabled) return null;

        const Component = SECTION_MAP[sectionId];
        if (!Component) return null;

        if (sectionId === "contacts") {
          return (
            <ContactFooterRegion key={sectionId}>
              <ContactForm />
              <FooterSection embedded />
            </ContactFooterRegion>
          );
        }

        return <Component key={sectionId} />;
      })}
    </div>
  );
}
