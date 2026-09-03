export type ServiceIconId =
  | "partitions"
  | "doors"
  | "windows"
  | "facades"
  | "railings"
  | "glass"
  | "shower"
  | "design";

export type AdvantageIconId = "turnkey" | "design" | "license" | "measure";

export type HomeSectionId =
  | "services"
  | "advantages"
  | "portfolio"
  | "clients"
  | "partners"
  | "process"
  | "contacts";

export type SiteContent = {
  version: number;
  updatedAt: string;
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    siteUrl: string;
  };
  branding: {
    companyName: string;
    logo: string;
    favicon?: string;
  };
  header: {
    navLinks: { href: string; label: string; page?: boolean }[];
    ctaButton: string;
  };
  hero: {
    enabled: boolean;
    poster: string;
    video: string;
    badge: string;
    title: string;
    titleAccent: string;
    subtitle1: string;
    subtitle2: string;
    ctaPrimary: string;
    yearsCount: string;
    yearsLabel: string;
    scrollHint: string;
  };
  homeSections: {
    order: HomeSectionId[];
    services: {
      enabled: boolean;
      label: string;
      title: string;
      items: {
        id: string;
        title: string;
        description: string;
        icon: ServiceIconId;
        image: string;
      }[];
      extraOption: string;
    };
    advantages: {
      enabled: boolean;
      label: string;
      title: string;
      items: {
        id: string;
        icon: AdvantageIconId;
        title: string;
        shortTitle: string;
        lead: string;
        text: string;
        highlights: string[];
      }[];
    };
    portfolio: {
      enabled: boolean;
      label: string;
      title: string;
      ctaText?: string;
      ctaLink?: string;
      galleryButton: string;
      allProjectsLabel: string;
      items: {
        id: string;
        name: string;
        type: string;
        cover: string;
        gallery: string[];
        showOnHome: boolean;
      }[];
    };
    clients: {
      enabled: boolean;
      label: string;
      title: string;
      ctaText?: string;
      ctaLink?: string;
      items: {
        id: string;
        name: string;
        src: string;
        category: string;
        highlight: string;
      }[];
    };
    partners: {
      enabled: boolean;
      label: string;
      title: string;
      subtitle: string;
      ctaText?: string;
      ctaLink?: string;
      items: { id: string; name: string; src: string }[];
    };
    process: {
      enabled: boolean;
      label: string;
      title: string;
      accent: string;
      items: {
        id: string;
        num: string;
        title: string;
        text: string;
        highlight?: string;
      }[];
    };
    contacts: {
      enabled: boolean;
      label: string;
      title: string;
      formTitle: string;
      formSubtitle: string;
      submitButton: string;
      whatsappButton: string;
    };
  };
  contacts: {
    company: string;
    address: string;
    addressMeta: string;
    mapCoordinates: { lat: number; lng: number };
    phonePrimary: string;
    phoneSecondary: string;
    phonePrimaryHref: string;
    phoneSecondaryHref: string;
    email: string;
    whatsappPhone: string;
    whatsappMessage: string;
    hours: string;
    instagram: string;
  };
  footer: {
    year: number;
    location: string;
    copyrightSuffix: string;
  };
  pages: {
    projects: { title: string; description: string; label: string; heading: string };
    clients: { title: string; description: string; label: string; heading: string };
    partners: { title: string; description: string; label: string; heading: string };
  };
  kz?: KzContent;
};

export type KzContent = {
  header?: {
    navLinks?: { href: string; label: string; page?: boolean }[];
    ctaButton?: string;
  };
  hero?: {
    badge?: string;
    title?: string;
    titleAccent?: string;
    subtitle1?: string;
    subtitle2?: string;
    ctaPrimary?: string;
    yearsLabel?: string;
    scrollHint?: string;
  };
  homeSections?: {
    services?: {
      label?: string;
      title?: string;
      extraOption?: string;
      items?: Partial<{ title: string; description: string }>[];
    };
    advantages?: {
      label?: string;
      title?: string;
      items?: Partial<{ title: string; shortTitle: string; lead: string; text: string; highlights: string[] }>[];
    };
    portfolio?: {
      label?: string;
      title?: string;
      ctaText?: string;
      galleryButton?: string;
      allProjectsLabel?: string;
      items?: Partial<{ name: string; type: string }>[];
    };
    clients?: {
      label?: string;
      title?: string;
      ctaText?: string;
      items?: Partial<{ name: string; category: string; highlight: string }>[];
    };
    partners?: {
      label?: string;
      title?: string;
      subtitle?: string;
      ctaText?: string;
    };
    process?: {
      label?: string;
      title?: string;
      accent?: string;
      items?: Partial<{ title: string; text: string; highlight: string | null }>[];
    };
    contacts?: {
      label?: string;
      title?: string;
      formTitle?: string;
      formSubtitle?: string;
      submitButton?: string;
      whatsappButton?: string;
    };
  };
  contacts?: {
    company?: string;
    address?: string;
    addressMeta?: string;
    hours?: string;
    whatsappMessage?: string;
  };
  footer?: {
    location?: string;
    copyrightSuffix?: string;
  };
  pages?: {
    projects?: Partial<{ title: string; description: string; label: string; heading: string }>;
    clients?: Partial<{ title: string; description: string; label: string; heading: string }>;
    partners?: Partial<{ title: string; description: string; label: string; heading: string }>;
  };
};

export type AdminUser = {
  email: string;
  passwordHash: string;
  name: string;
};

export type ContactRequestPayload = {
  name: string;
  phone: string;
  service: string;
};
