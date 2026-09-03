import { clientLogo } from "@/lib/images";

export type ClientBrand = {
  name: string;
  src: string;
  category: string;
  highlight: string;
};

export const CLIENTS: ClientBrand[] = [
  {
    name: "BMW",
    src: clientLogo("bmw.png"),
    category: "Автомобильный сектор",
    highlight: "Остекление и фасады для премиального дилерского центра",
  },
  {
    name: "Burger King",
    src: clientLogo("burger-king.png"),
    category: "HoReCa",
    highlight: "Стеклянные решения для ресторанов быстрого питания",
  },
  {
    name: "Lukoil",
    src: clientLogo("lukoil.png"),
    category: "Нефть и энергетика",
    highlight: "Конструкции для объектов топливно-энергетического сектора",
  },
  {
    name: "MEGA",
    src: clientLogo("mega.png"),
    category: "Торговый центр",
    highlight: "Витражи и фасадное остекление торговых комплексов",
  },
  {
    name: "Rixos",
    src: clientLogo("rixos.png"),
    category: "Отельный бизнес",
    highlight: "Панорамное остекление и перегородки для отелей класса люкс",
  },
  {
    name: "MINI",
    src: clientLogo("mini.png"),
    category: "Автомобильный сектор",
    highlight: "Архитектурное остекление автосалона",
  },
  {
    name: "Volvo",
    src: clientLogo("volvo.png"),
    category: "Автомобильный сектор",
    highlight: "Стеклянные фасады и входные группы",
  },
  {
    name: "Rahat Palace",
    src: clientLogo("rahat-palace.png"),
    category: "Отельный бизнес",
    highlight: "Индивидуальные конструкции для гостиничного комплекса",
  },
  {
    name: "Aport",
    src: clientLogo("aport.png"),
    category: "Торговый центр",
    highlight: "Остекление и металлоконструкции торгового объекта",
  },
  {
    name: "Indesit",
    src: clientLogo("indesit.png"),
    category: "Ритейл",
    highlight: "Стеклянные перегородки и витрины для брендовой зоны",
  },
  {
    name: "Kumho",
    src: clientLogo("kumho.png"),
    category: "Автомобильный сектор",
    highlight: "Фасадные и интерьерные стеклянные системы",
  },
  {
    name: "Rolls-Royce",
    src: clientLogo("rolls-royce.png"),
    category: "Автомобильный сектор",
    highlight: "Премиальное остекление для представительского салона",
  },
];
