import type { SiteContent, KzContent } from "./types";
import { translatePortfolioType } from "./portfolio-type-kz";

function ov(base: string, override: string | undefined): string {
  return override !== undefined ? override : base;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergePartialArray<T>(baseArr: T[], overrideArr: unknown[]): T[] {
  const len = Math.max(baseArr.length, overrideArr.length);
  const result: T[] = [];

  for (let i = 0; i < len; i++) {
    const baseItem = baseArr[i];
    const overrideItem = overrideArr[i];

    if (overrideItem === undefined) {
      if (baseItem !== undefined) result.push(baseItem);
      continue;
    }

    if (isPlainObject(baseItem) && isPlainObject(overrideItem)) {
      result.push({ ...baseItem, ...overrideItem } as T);
    } else {
      result.push(overrideItem as T);
    }
  }

  return result;
}

/** DB may store a partial kz overlay — fill gaps from built-in defaults. */
export function mergeKzContent(base: KzContent, override?: KzContent): KzContent {
  if (!override) return base;

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;

    const baseValue = base[key as keyof KzContent];
    if (Array.isArray(value) && Array.isArray(baseValue)) {
      merged[key] = mergePartialArray(baseValue as unknown[], value);
    } else if (isPlainObject(value) && isPlainObject(baseValue)) {
      merged[key] = mergeKzContent(baseValue as KzContent, value as KzContent);
    } else {
      merged[key] = value;
    }
  }

  return merged as KzContent;
}

function itemId(item: object): string | undefined {
  if (!("id" in item)) return undefined;
  const id = (item as { id?: unknown }).id;
  return typeof id === "string" && id.length > 0 ? id : undefined;
}

function kzItemsById<T extends object>(kzItems: Partial<T>[] | undefined): Map<string, Partial<T>> {
  const map = new Map<string, Partial<T>>();
  if (!kzItems) return map;
  for (const kzItem of kzItems) {
    const id = kzItem ? itemId(kzItem) : undefined;
    if (id) map.set(id, kzItem);
  }
  return map;
}

function mergeItems<T extends object>(
  baseItems: T[],
  kzItems: Partial<T>[] | undefined,
): T[] {
  if (!kzItems) return baseItems;
  const byId = kzItemsById(kzItems);

  return baseItems.map((item, i) => {
    const itemKey = itemId(item);
    const kzItem = (itemKey && byId.get(itemKey)) ?? (kzItems[i] as Partial<T> | undefined);
    if (!kzItem) return item;
    const merged = { ...item } as T;
    for (const key of Object.keys(kzItem) as (keyof T)[]) {
      const val = kzItem[key];
      if (val === null) {
        delete (merged as Record<keyof T, unknown>)[key];
        continue;
      }
      if (val !== undefined) {
        (merged as Record<keyof T, unknown>)[key] = val;
      }
    }
    return merged;
  }) as T[];
}

function localizePortfolioItems(
  items: SiteContent["homeSections"]["portfolio"]["items"],
  kzItems: Partial<SiteContent["homeSections"]["portfolio"]["items"][number]>[] | undefined,
) {
  const byId = kzItemsById(kzItems ?? []);

  return items.map((item, index) => {
    const kzItem = (item.id ? byId.get(item.id) : undefined) ?? kzItems?.[index];
    const manualType =
      kzItem && itemId(kzItem) === item.id && typeof kzItem.type === "string"
        ? kzItem.type.trim()
        : "";
    const type = manualType || translatePortfolioType(item.type) || item.type;

    return { ...item, type };
  });
}

export function applyKzOverlay(content: SiteContent, kz: KzContent): SiteContent {
  const hs = content.homeSections;
  const kzHs = kz.homeSections;

  return {
    ...content,
    contacts: {
      ...content.contacts,
      company: ov(content.contacts.company, kz.contacts?.company),
      address: ov(content.contacts.address, kz.contacts?.address),
      addressMeta: ov(content.contacts.addressMeta, kz.contacts?.addressMeta),
      hours: ov(content.contacts.hours, kz.contacts?.hours),
      whatsappMessage: ov(content.contacts.whatsappMessage, kz.contacts?.whatsappMessage),
    },
    header: {
      ...content.header,
      ctaButton: ov(content.header.ctaButton, kz.header?.ctaButton),
      navLinks: kz.header?.navLinks ?? content.header.navLinks,
    },
    hero: {
      ...content.hero,
      badge: ov(content.hero.badge, kz.hero?.badge),
      title: ov(content.hero.title, kz.hero?.title),
      titleAccent: ov(content.hero.titleAccent, kz.hero?.titleAccent),
      subtitle1: ov(content.hero.subtitle1, kz.hero?.subtitle1),
      subtitle2: ov(content.hero.subtitle2, kz.hero?.subtitle2),
      ctaPrimary: ov(content.hero.ctaPrimary, kz.hero?.ctaPrimary),
      yearsLabel: ov(content.hero.yearsLabel, kz.hero?.yearsLabel),
      scrollHint: ov(content.hero.scrollHint, kz.hero?.scrollHint),
    },
    homeSections: {
      ...hs,
      services: {
        ...hs.services,
        label: ov(hs.services.label, kzHs?.services?.label),
        title: ov(hs.services.title, kzHs?.services?.title),
        extraOption: ov(hs.services.extraOption, kzHs?.services?.extraOption),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: mergeItems(hs.services.items, kzHs?.services?.items as any),
      },
      advantages: {
        ...hs.advantages,
        label: ov(hs.advantages.label, kzHs?.advantages?.label),
        title: ov(hs.advantages.title, kzHs?.advantages?.title),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: mergeItems(hs.advantages.items, kzHs?.advantages?.items as any),
      },
      portfolio: {
        ...hs.portfolio,
        label: ov(hs.portfolio.label, kzHs?.portfolio?.label),
        title: ov(hs.portfolio.title, kzHs?.portfolio?.title),
        ctaText: ov(hs.portfolio.ctaText ?? "", kzHs?.portfolio?.ctaText),
        galleryButton: ov(hs.portfolio.galleryButton, kzHs?.portfolio?.galleryButton),
        allProjectsLabel: ov(hs.portfolio.allProjectsLabel, kzHs?.portfolio?.allProjectsLabel),
        items: localizePortfolioItems(hs.portfolio.items, kzHs?.portfolio?.items),
      },
      clients: {
        ...hs.clients,
        label: ov(hs.clients.label, kzHs?.clients?.label),
        title: ov(hs.clients.title, kzHs?.clients?.title),
        ctaText: ov(hs.clients.ctaText ?? "", kzHs?.clients?.ctaText),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: mergeItems(hs.clients.items, kzHs?.clients?.items as any),
      },
      partners: {
        ...hs.partners,
        label: ov(hs.partners.label, kzHs?.partners?.label),
        title: ov(hs.partners.title, kzHs?.partners?.title),
        subtitle: ov(hs.partners.subtitle, kzHs?.partners?.subtitle),
        ctaText: ov(hs.partners.ctaText ?? "", kzHs?.partners?.ctaText),
      },
      process: {
        ...hs.process,
        label: ov(hs.process.label, kzHs?.process?.label),
        title: ov(hs.process.title, kzHs?.process?.title),
        accent: ov(hs.process.accent, kzHs?.process?.accent),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: mergeItems(hs.process.items, kzHs?.process?.items as any),
      },
      contacts: {
        ...hs.contacts,
        label: ov(hs.contacts.label, kzHs?.contacts?.label),
        title: ov(hs.contacts.title, kzHs?.contacts?.title),
        formTitle: ov(hs.contacts.formTitle, kzHs?.contacts?.formTitle),
        formSubtitle: ov(hs.contacts.formSubtitle, kzHs?.contacts?.formSubtitle),
        submitButton: ov(hs.contacts.submitButton, kzHs?.contacts?.submitButton),
        whatsappButton: ov(hs.contacts.whatsappButton, kzHs?.contacts?.whatsappButton),
      },
    },
    footer: {
      ...content.footer,
      location: ov(content.footer.location, kz.footer?.location),
      copyrightSuffix: ov(content.footer.copyrightSuffix, kz.footer?.copyrightSuffix),
    },
    pages: {
      projects: {
        title: ov(content.pages.projects.title, kz.pages?.projects?.title),
        description: ov(content.pages.projects.description, kz.pages?.projects?.description),
        label: ov(content.pages.projects.label, kz.pages?.projects?.label),
        heading: ov(content.pages.projects.heading, kz.pages?.projects?.heading),
      },
      clients: {
        title: ov(content.pages.clients.title, kz.pages?.clients?.title),
        description: ov(content.pages.clients.description, kz.pages?.clients?.description),
        label: ov(content.pages.clients.label, kz.pages?.clients?.label),
        heading: ov(content.pages.clients.heading, kz.pages?.clients?.heading),
      },
      partners: {
        title: ov(content.pages.partners.title, kz.pages?.partners?.title),
        description: ov(content.pages.partners.description, kz.pages?.partners?.description),
        label: ov(content.pages.partners.label, kz.pages?.partners?.label),
        heading: ov(content.pages.partners.heading, kz.pages?.partners?.heading),
      },
    },
  };
}
