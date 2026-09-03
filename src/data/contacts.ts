const WHATSAPP_PHONE = "77003997931";
const WHATSAPP_DEFAULT_MESSAGE =
  "Здравствуйте! Хочу получить консультацию по остеклению от ART OFFICE GROUP.";

export type ContactRequestPayload = {
  name: string;
  phone: string;
  service: string;
};

export function buildContactRequestMessage({ name, phone, service }: ContactRequestPayload) {
  return ["Заявка", "", `Имя: ${name.trim()}`, `Телефон: ${phone.trim()}`, `Направление: ${service.trim()}`].join(
    "\n",
  );
}

export function buildWhatsappRequestUrl(payload: ContactRequestPayload) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildContactRequestMessage(payload))}`;
}

export function openWhatsappRequest(payload: ContactRequestPayload) {
  window.open(buildWhatsappRequestUrl(payload), "_blank", "noopener,noreferrer");
}

export const CONTACTS = {
  company: 'ТОО «ART OFFICE GROUP»',
  address: "г. Алматы, ул. Сырбая Мауленова, 111, оф. 2",
  addressMeta: "Алмалинский район, 050012",
  mapCoordinates: {
    lat: 43.246373,
    lng: 76.934786,
  },
  phonePrimary: "+7 (700) 399 79 31",
  phoneSecondary: "+7 (727) 222 33 44",
  phonePrimaryHref: "tel:+77003997931",
  phoneSecondaryHref: "tel:+77272223344",
  email: "info@art-office.kz",
  whatsappPhone: WHATSAPP_PHONE,
  whatsappMessage: WHATSAPP_DEFAULT_MESSAGE,
  whatsapp: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`,
  hours: "Пн–Пт, 9:00–18:00",
} as const;

export function getMapEmbedUrl() {
  const { lat, lng } = CONTACTS.mapCoordinates;
  const point = `${lng}%2C${lat}`;

  return `https://yandex.ru/map-widget/v1/?ll=${point}&z=17&pt=${point}%2Cpm2rdm&lang=ru_RU`;
}

export function getMapSearchUrl() {
  const { lat, lng } = CONTACTS.mapCoordinates;

  return `https://yandex.ru/maps/?pt=${lng}%2C${lat}&z=17&l=map&text=${encodeURIComponent(CONTACTS.address)}`;
}
