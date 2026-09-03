import { partnerLogo } from "@/lib/images";

export type PartnerBrand = {
  name: string;
  src: string;
};

/** Производители и поставщики материалов для главной (12–15 логотипов). */
export const PARTNERS: PartnerBrand[] = [
  { name: "Trimo", src: partnerLogo("trimo.png") },
  { name: "Metso", src: partnerLogo("metso.png") },
  { name: "Eurobak", src: partnerLogo("eurobak.png") },
  { name: "OTC", src: partnerLogo("otc.png") },
  { name: "TRS", src: partnerLogo("trs.png") },
  { name: "Galanz", src: partnerLogo("galanz.png") },
  { name: "BI Group", src: partnerLogo("BI-Grupp-1920x1028.png") },
  { name: "Hyundai", src: partnerLogo("hyundai.png") },
  { name: "Ромфарма", src: partnerLogo("7129-_D1_80_D0_BE_D0%BC_D1_84_D0_B0_D1_80_D0%BC_D0_B0-middle.png") },
  { name: "Astana Motors", src: partnerLogo("Astana_Motors_Logo.svg.png") },
  { name: "Eurasian Foods", src: partnerLogo("eurasian_foods.png") },
  { name: "KTZh", src: partnerLogo("ktzh.png") },
  { name: "Temir Zholy", src: partnerLogo("d926676b238d930654472298b6f02435.png") },
  { name: "Astra Lombard", src: partnerLogo("astra-lombard.png") },
  { name: "Baker Tilly", src: partnerLogo("baker_20tilly.png") },
];
