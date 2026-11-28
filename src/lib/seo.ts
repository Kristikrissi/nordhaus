import { site } from "./site-data";

/** Абсолютный URL страницы (домен + путь). */
export function absoluteUrl(path = "") {
  return `${site.url}${path}`;
}

/** Превью по умолчанию для соцсетей — главный кадр с первого экрана. */
export const DEFAULT_OG_IMAGE = "/images/home/hero@1280.jpg";

/**
 * Meta-теги для соцсетей: абсолютные og:url страницы и og:image.
 * Размеры картинки не указываем: кадры в галереях разной пропорции,
 * а неверное соотношение ломает превью в некоторых мессенджерах.
 */
export function socialMeta(pagePath = "", imagePath = DEFAULT_OG_IMAGE) {
  const image = absoluteUrl(imagePath);
  return [
    { property: "og:url", content: absoluteUrl(pagePath) },
    { property: "og:image", content: image },
    { property: "og:image:type", content: "image/jpeg" },
    { name: "twitter:image", content: image },
  ];
}

/* ── JSON-LD: LocalBusiness + WebSite (site-wide) ── */

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#localbusiness`,
  name: site.name,
  description: "Строительство домов и бань из бруса и бревна по индивидуальным проектам в Москве и области.",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  taxID: site.inn,
  logo: `${site.url}/images/__images/logo_nordhaus.svg`,
  image: `${site.url}/images/home/hero@1280.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Семёновская, д. 8",
    addressLocality: "г. Чухлома",
    addressRegion: "Костромская область",
    addressCountry: "RU",
  },
  openingHours: "Mo-Su 09:00-21:00",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "ru",
  publisher: {
    "@id": `${site.url}/#localbusiness`,
  },
};

/* ── JSON-LD для отдельных страниц ── */

/**
 * Карточка проекта дома/бани для поисковиков.
 * Цена берётся из базовой комплектации (брус 145×145); если она
 * «по запросу» — блок offers не выводим, чтобы не публиковать 0 ₽.
 */
export function projectJsonLd(project: {
  slug: string;
  name: string;
  description?: string[];
  highlights?: string[];
  images: string[];
  price145?: number | "on-request";
}) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const description =
    project.highlights?.[0] ??
    project.description?.[0] ??
    `Проект «${project.name}» от ${site.name}: дома и бани из бруса и бревна.`;
  const price = typeof project.price145 === "number" ? project.price145 : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Проект «${project.name}»`,
    description,
    image: project.images[0] ? absoluteUrl(project.images[0]) : undefined,
    url,
    brand: { "@type": "Brand", name: site.name },
    ...(price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: String(price),
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url,
            seller: { "@id": `${site.url}/#localbusiness` },
          },
        }
      : {}),
  };
}

const RU_MONTHS: Record<string, string> = {
  января: "01",
  февраля: "02",
  марта: "03",
  апреля: "04",
  мая: "05",
  июня: "06",
  июля: "07",
  августа: "08",
  сентября: "09",
  октября: "10",
  ноября: "11",
  декабря: "12",
};

/** «4 ноября 2026» → «2026-11-04». Если формат не распознан — null. */
export function ruDateToIso(date: string): string | null {
  const m = date.trim().match(/^(\d{1,2})\s+([а-яё]+)\s+(\d{4})$/i);
  if (!m) return null;
  const day = m[1]!.padStart(2, "0");
  const month = RU_MONTHS[m[2]!.toLowerCase()];
  if (!month) return null;
  return `${m[3]}-${month}-${day}`;
}

/** Разметка статьи для поисковиков и ленты новостей. */
export function articleJsonLd(article: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}) {
  const url = absoluteUrl(`/news/${article.slug}`);
  const iso = ruDateToIso(article.date);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.image),
    url,
    mainEntityOfPage: url,
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${site.url}/#localbusiness` },
    inLanguage: "ru",
  };
}

/** Хлебные крошки: путь «Главная → раздел → страница» для сниппета в поиске. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Генерирует JSON-LD-тег для head. */
export function jsonLdScript(obj: object) {
  return { type: "application/ld+json", children: JSON.stringify(obj).replace(/</g, "\\u003c") };
}
