const CLIENT_LEGACY_FILES: Record<string, string> = {
  "175x77-1424170775_bmv.e28.jpg": "/images/clients/bmw.png",
  "175x77-1424168096_baker.978.jpg": "/images/clients/burger-king.png",
  "175x77-1424165914_lukoil.978.jpg": "/images/clients/lukoil.png",
  "175x77-1424166674_mega.978.jpg": "/images/clients/mega.png",
  "175x77-1424167345_rixos.978.jpg": "/images/clients/rixos.png",
  "175x77-1424167219_mini.978.jpg": "/images/clients/mini.png",
  "175x77-volvo-44.ff3.jpg": "/images/clients/volvo.png",
  "175x77-logo-rahat-palace.606.gif": "/images/clients/rahat-palace.png",
  "175x77-1424170449_aport.e28.jpg": "/images/clients/aport.png",
  "175x77-1424169945_indesit.e28.jpg": "/images/clients/indesit.png",
  "175x77-1424169662_kumho.e28.jpg": "/images/clients/kumho.png",
  "175x77-1424168805_rollce.e28.jpg": "/images/clients/rolls-royce.png",
};

const PARTNER_LEGACY_FILES: Record<string, string> = {
  "r1k14scoh6eptvwu4ky4m0icl.png": "/images/partners/trimo.png",
  "png-transparent-metso-industry-company-mineral-mining-forest-gump-text-trademark-logo-thumbnail.png":
    "/images/partners/metso.png",
  "eurobak.png": "/images/partners/eurobak.png",
  "otc.png": "/images/partners/otc.png",
  "trs.png": "/images/partners/trs.png",
  "galanz.png": "/images/partners/galanz.png",
  "BI-Grupp-1920x1028.png": "/images/partners/BI-Grupp-1920x1028.png",
  "hyundai.png": "/images/partners/hyundai.png",
  "7129-%D1%80%D0%BE%D0%BC%D1%84%D0%B0%D1%80%D0%BC%D0%B0-middle.png":
    "/images/partners/7129-_D1_80_D0_BE_D0%BC_D1_84_D0_B0_D1_80_D0%BC_D0_B0-middle.png",
  "Astana_Motors_Logo.svg.png": "/images/partners/Astana_Motors_Logo.svg.png",
  "eurasian_foods.png": "/images/partners/eurasian_foods.png",
  "ktzh.png": "/images/partners/ktzh.png",
  "d926676b238d930654472298b6f02435.png": "/images/partners/d926676b238d930654472298b6f02435.png",
  "astra-lombard.png": "/images/partners/astra-lombard.png",
  "baker%20tilly.png": "/images/partners/baker_20tilly.png",
};

function decodeFileName(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function mapLegacyFile(file: string, table: Record<string, string>): string | null {
  const decoded = decodeFileName(file);
  return table[file] ?? table[decoded] ?? null;
}

/** Локальные файлы из public/images — оптимизируются через next/image (AVIF/WebP). */
export function isLocalAsset(src: string): boolean {
  return src.startsWith("/images/");
}

export function isApiMedia(src: string): boolean {
  return src.startsWith("/api/media/");
}

/** Переписывает старые URL art-office.kz/assets/... на локальные /images/... */
export function resolveImageSrc(src: string | undefined | null): string | null {
  if (!src) return null;
  const trimmed = src.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/images/") || trimmed.startsWith("/api/media/")) {
    return trimmed;
  }

  const galleriesMatch = trimmed.match(/galleries\/63\/([^/?#]+)/i);
  if (galleriesMatch) {
    return mapLegacyFile(galleriesMatch[1], CLIENT_LEGACY_FILES);
  }

  const partnersMatch = trimmed.match(/logo-partners\/([^/?#]+)/i);
  if (partnersMatch) {
    return mapLegacyFile(partnersMatch[1], PARTNER_LEGACY_FILES);
  }

  if (/^https?:\/\/(?:www\.)?art-office\.kz\//i.test(trimmed)) {
    return null;
  }

  if (trimmed.startsWith("/")) return trimmed;
  return trimmed;
}

export const clientLogo = (file: string) => `/images/clients/${file}`;
export const partnerLogo = (file: string) => `/images/partners/${file}`;
