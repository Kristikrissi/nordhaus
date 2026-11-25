import { createServerFn } from "@tanstack/react-start";
import { articleBySlug, articles } from "./news-articles";

/**
 * Тексты статей весят ~243 КБ исходников. Держим их на сервере и отдаём
 * по требованию: страница новостей получает только пары «заголовок → slug»,
 * страница статьи — одну статью. В клиентский бандл тексты не попадают.
 */
export const getArticleSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const slugs: Record<string, string> = {};
  for (const [title, article] of Object.entries(articles)) slugs[title] = article.slug;
  return slugs;
});

export const getArticleBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => articleBySlug(slug));
