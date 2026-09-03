/** Локальные фото: реальные проекты — с art-office.kz, доп. — тематические с Unsplash */
const img = (file: string) => `/images/portfolio/${file}`;

export type PortfolioProject = {
  id: string;
  name: string;
  type: string;
  cover: string;
  gallery: string[];
};

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: "bmw",
    name: "BMW Lifestyle",
    type: "Шоурум",
    cover: img("bmw-cover.jpg"),
    gallery: [img("bmw-cover.jpg"), img("bmw-1.jpg")],
  },
  {
    id: "maqan",
    name: "Maqan Hotel Almaty",
    type: "Отель",
    cover: img("maqan-cover.jpg"),
    gallery: [img("maqan-cover.jpg"), img("maqan-1.jpg"), img("maqan-2.jpg")],
  },
  {
    id: "galleria",
    name: "ТК «Galleria»",
    type: "Торговый комплекс",
    cover: img("galleria-cover.jpg"),
    gallery: [img("galleria-cover.jpg"), img("galleria-1.jpg"), img("galleria-2.jpg")],
  },
  {
    id: "talgar",
    name: "Комплекс в г. Талгар",
    type: "Комплекс",
    cover: img("talgar-cover.jpg"),
    gallery: [img("talgar-cover.jpg"), img("talgar-1.jpg"), img("talgar-2.jpg")],
  },
  {
    id: "burger-king",
    name: "Burger King",
    type: "Ресторан",
    cover: img("burger-king-cover.jpg"),
    gallery: [img("burger-king-cover.jpg"), img("burger-king-1.jpg"), img("burger-king-2.jpg")],
  },
  {
    id: "china-restaurant",
    name: "China Restaurant",
    type: "Ресторан",
    cover: img("china-cover.jpg"),
    gallery: [img("china-cover.jpg"), img("china-1.jpg"), img("china-2.jpg"), img("china-3.jpg")],
  },
];

export const PORTFOLIO_EXTENDED: PortfolioProject[] = [
  {
    id: "extra-1",
    name: "Бизнес-центр «Almaty Tower»",
    type: "Офисный центр",
    cover: img("extra-1-cover.jpg"),
    gallery: [img("extra-1-cover.jpg")],
  },
  {
    id: "extra-2",
    name: "ЖК «Glass House»",
    type: "Жилой комплекс",
    cover: img("extra-2-cover.jpg"),
    gallery: [img("extra-2-cover.jpg")],
  },
  {
    id: "extra-3",
    name: "Торговый центр «Grand Mall»",
    type: "Торговый центр",
    cover: img("extra-3-cover.jpg"),
    gallery: [img("extra-3-cover.jpg")],
  },
  {
    id: "extra-4",
    name: "Офис «TechPark»",
    type: "Офис",
    cover: img("extra-4-cover.jpg"),
    gallery: [img("extra-4-cover.jpg")],
  },
  {
    id: "extra-5",
    name: "Ресторан «Crystal»",
    type: "Ресторан",
    cover: img("extra-5-cover.jpg"),
    gallery: [img("extra-5-cover.jpg")],
  },
  {
    id: "extra-6",
    name: "Гостиница «View Hotel»",
    type: "Отель",
    cover: img("extra-6-cover.jpg"),
    gallery: [img("extra-6-cover.jpg")],
  },
  {
    id: "extra-7",
    name: "Медицинский центр «MedCity»",
    type: "Медицинский центр",
    cover: img("extra-7-cover.jpg"),
    gallery: [img("extra-7-cover.jpg")],
  },
  {
    id: "extra-8",
    name: "Банк «FinanceGroup»",
    type: "Банк",
    cover: img("extra-8-cover.jpg"),
    gallery: [img("extra-8-cover.jpg")],
  },
  {
    id: "extra-9",
    name: "Спортивный комплекс «Arena»",
    type: "Спортивный объект",
    cover: img("extra-9-cover.jpg"),
    gallery: [img("extra-9-cover.jpg")],
  },
  {
    id: "extra-10",
    name: "Жилой дом «Emerald»",
    type: "Жилой дом",
    cover: img("extra-10-cover.jpg"),
    gallery: [img("extra-10-cover.jpg")],
  },
  {
    id: "extra-11",
    name: "Салон красоты «Luxe»",
    type: "Салон",
    cover: img("extra-11-cover.jpg"),
    gallery: [img("extra-11-cover.jpg")],
  },
  {
    id: "extra-12",
    name: "Школа «International Academy»",
    type: "Образование",
    cover: img("extra-12-cover.jpg"),
    gallery: [img("extra-12-cover.jpg")],
  },
];

export const ALL_PROJECTS: PortfolioProject[] = [...PORTFOLIO, ...PORTFOLIO_EXTENDED];

export type PortfolioPhoto = {
  id: string;
  src: string;
};

export const ALL_PORTFOLIO_PHOTOS: PortfolioPhoto[] = (() => {
  const seen = new Set<string>();
  const photos: PortfolioPhoto[] = [];

  for (const project of ALL_PROJECTS) {
    for (const src of project.gallery) {
      if (seen.has(src)) continue;
      seen.add(src);
      photos.push({ id: `${project.id}-${photos.length}`, src });
    }
  }

  return photos;
})();
