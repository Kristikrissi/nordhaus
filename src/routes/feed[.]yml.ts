import { createFileRoute } from "@tanstack/react-router";
import { categories, projects, site, type Project } from "@/lib/site-data";
import { webVariant } from "@/components/optimized-img";

/**
 * YML-фид каталога для «Яндекс Бизнеса» → «Товары и услуги».
 * Адрес фида: /feed.yml — его указывают в кабинете Яндекса как ссылку
 * на прайс-лист, и Яндекс сам подтягивает проекты и цены.
 *
 * В фид попадают проекты из бруса (дома и бани): у каждого проекта
 * до двух предложений — комплектация 145 × 145 и 195 × 145.
 * Если цена «по запросу», предложение не выводим: Яндекс не принимает
 * пустую цену, а 0 ₽ выглядел бы как бесплатный дом.
 */
const BRUS_CATEGORIES = ["doma-iz-brusa", "bani-iz-brusa"] as const;

/** Экранирование текста для XML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Короткое описание проекта для карточки в Яндексе. */
function projectDescription(p: Project): string {
  const parts = [
    p.highlights?.[0] ?? p.description?.[0],
    `Габариты ${p.size}, площадь застройки ${p.area} м².`,
    p.floors ? `Этажей: ${p.floors}.` : "",
    p.material ? `Материал: ${p.material.toLowerCase()}.` : "",
    "Сборка сруба под усадку, доставка по Московской области.",
  ].filter(Boolean);
  return parts.join(" ");
}

function buildFeed(): string {
  const categoryIds = new Map<string, number>();
  const categoryLines: string[] = [];
  for (const c of categories) {
    if (!(BRUS_CATEGORIES as readonly string[]).includes(c.slug)) continue;
    const id = categoryLines.length + 1;
    categoryIds.set(c.slug, id);
    categoryLines.push(`      <category id="${id}">${esc(c.title)}</category>`);
  }

  const offers: string[] = [];
  for (const p of projects) {
    const catSlug = p.categories.find((c) => (BRUS_CATEGORIES as readonly string[]).includes(c));
    if (!catSlug) continue;
    const categoryId = categoryIds.get(catSlug)!;
    const kind = catSlug.startsWith("bani") ? "баня" : "дом";
    const url = `${site.url}/projects/${p.slug}`;
    const picture = p.images[0] ? `${site.url}${webVariant(p.images[0], 640)}` : "";
    const description = projectDescription(p);

    const variants: { suffix: string; price: number }[] = [];
    if (typeof p.price145 === "number") {
      variants.push({ suffix: "брус 145 × 145 мм", price: p.price145 });
    }
    if (typeof p.price195 === "number") {
      variants.push({ suffix: "брус 195 × 145 мм", price: p.price195 });
    }

    for (const v of variants) {
      const id = `${p.slug}-${v.suffix.includes("195") ? "195" : "145"}`;
      const name = `Проект «${p.name}» — ${kind} из бруса, ${p.size}, ${v.suffix}`;
      offers.push(
        [
          `      <offer id="${esc(id)}" available="true">`,
          `        <url>${esc(url)}</url>`,
          `        <price>${v.price}</price>`,
          `        <currencyId>RUR</currencyId>`,
          `        <categoryId>${categoryId}</categoryId>`,
          picture ? `        <picture>${esc(picture)}</picture>` : "",
          `        <name>${esc(name)}</name>`,
          `        <description>${esc(description)}</description>`,
          `        <param name="Габариты">${esc(p.size)}</param>`,
          `        <param name="Площадь застройки">${p.area} м²</param>`,
          `        <param name="Комплектация">${esc(v.suffix)}</param>`,
          `      </offer>`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
  }

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<yml_catalog date="${new Date().toISOString().slice(0, 19)}">`,
    `  <shop>`,
    `    <name>${esc(site.name)}</name>`,
    `    <company>${esc(site.name)}</company>`,
    `    <url>${esc(site.url)}</url>`,
    `    <currencies>`,
    `      <currency id="RUR" rate="1"/>`,
    `    </currencies>`,
    `    <categories>`,
    ...categoryLines,
    `    </categories>`,
    `    <offers>`,
    ...offers,
    `    </offers>`,
    `  </shop>`,
    `</yml_catalog>`,
  ].join("\n");
}

export const Route = createFileRoute("/feed.yml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: () =>
        new Response(buildFeed(), {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        }),
    },
  },
});
