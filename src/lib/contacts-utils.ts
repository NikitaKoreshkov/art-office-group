import type { ContactRequestPayload } from "@/lib/content/types";

export type { ContactRequestPayload };

export function buildContactRequestMessage(
  { name, phone, service }: ContactRequestPayload,
  lang: "ru" | "kz" = "ru",
) {
  const l =
    lang === "kz"
      ? { title: "Жаңа өтінім", name: "Аты-жөні", phone: "Телефон", direction: "Қызмет бағыты" }
      : { title: "Заявка", name: "Имя", phone: "Телефон", direction: "Направление" };
  return [l.title, "", `${l.name}: ${name.trim()}`, `${l.phone}: ${phone.trim()}`, `${l.direction}: ${service.trim()}`].join(
    "\n",
  );
}

export function buildWhatsappRequestUrl(
  payload: ContactRequestPayload,
  whatsappPhone: string,
  lang: "ru" | "kz" = "ru",
) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(buildContactRequestMessage(payload, lang))}`;
}

export function openWhatsappRequest(
  payload: ContactRequestPayload,
  whatsappPhone: string,
  lang: "ru" | "kz" = "ru",
) {
  window.open(buildWhatsappRequestUrl(payload, whatsappPhone, lang), "_blank", "noopener,noreferrer");
}

export function getMapEmbedUrl(lat: number, lng: number) {
  const point = `${lng}%2C${lat}`;
  return `https://yandex.ru/map-widget/v1/?ll=${point}&z=17&pt=${point}%2Cpm2rdm&lang=ru_RU`;
}

export function getMapSearchUrl(lat: number, lng: number, address: string) {
  return `https://yandex.ru/maps/?pt=${lng}%2C${lat}&z=17&l=map&text=${encodeURIComponent(address)}`;
}

export function getWhatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
