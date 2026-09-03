const serviceImage = (id: string) => `/images/services/${id}.jpg`;

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "partitions" | "doors" | "windows" | "facades" | "railings" | "glass" | "shower" | "design";
  placeholderImage?: string;
};

export const SERVICES: Service[] = [
  {
    id: "partitions",
    title: "Перегородки",
    description: "Стеклянные, алюминиевые, противопожарные, мобильные",
    icon: "partitions",
    placeholderImage: serviceImage("partitions"),
  },
  {
    id: "doors",
    title: "Двери",
    description: "Стеклянные, алюминиевые, металлические, автоматические",
    icon: "doors",
    placeholderImage: serviceImage("doors"),
  },
  {
    id: "windows",
    title: "Окна",
    description: "Алюминиевые окна для жилых и коммерческих объектов",
    icon: "windows",
    placeholderImage: serviceImage("windows"),
  },
  {
    id: "facades",
    title: "Витражи и фасады",
    description: "Фасадное остекление, витражные системы",
    icon: "facades",
    placeholderImage: serviceImage("facades"),
  },
  {
    id: "railings",
    title: "Системы ограждений",
    description: "Стеклянные ограждения для лестниц, балконов, террас",
    icon: "railings",
    placeholderImage: serviceImage("railings"),
  },
  {
    id: "glass",
    title: "Стеклянные козырьки",
    description: "Козырьки, полы, зеркала и другие конструкции",
    icon: "glass",
    placeholderImage: serviceImage("glass"),
  },
  {
    id: "shower",
    title: "Душевые кабины из стекла",
    description: "Индивидуальные душевые кабины, перегородки и ограждения из закалённого стекла",
    icon: "shower",
    placeholderImage: serviceImage("shower"),
  },
  {
    id: "design",
    title: "Проектирование",
    description: "Собственный проектный отдел и партнёрство с заводами-изготовителями",
    icon: "design",
    placeholderImage: serviceImage("design"),
  },
];

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  "Другое",
] as const;
