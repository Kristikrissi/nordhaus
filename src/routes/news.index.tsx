import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getArticleSlugs } from "@/lib/news-server";
import { news, site, type NewsItem } from "@/lib/site-data";
import { OptimizedImg } from "@/components/optimized-img";

type Tag = "все" | NewsItem["tag"];
const TAGS: readonly Tag[] = ["все", "новости", "статьи"];

function NewsPage() {
  // Фильтр держим в URL, а не в состоянии: тогда возврат из статьи
  // попадает в ту же вкладку, из которой в неё вошли.
  const tag = Route.useSearch().tag ?? "все";
  const slugs = Route.useLoaderData();
  const navigate = useNavigate({ from: "/news/" });
  const setTag = (t: Tag) =>
    navigate({ search: t === "все" ? {} : { tag: t }, replace: true, resetScroll: false });
  const visible = tag === "все" ? news : news.filter((n) => n.tag === tag);

  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">Блог</p>
        <h1 className="section-title mt-3">Новости</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                tag === t ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-border"
              }`}
            >
              {t === "все" ? "Все новости" : t}
            </button>
          ))}
        </div>
      </section>

      <section className="container-wide pt-12 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((n) => (
            <Link
              key={n.title}
              to="/news/$slug"
              params={{ slug: slugs[n.title]! }}
              search={tag === "все" ? {} : { tag }}
              className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <OptimizedImg src={n.image} w={640} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-3 py-1 font-semibold uppercase tracking-wide text-primary">{n.tag}</span>
                  <span>{n.date}</span>
                </div>
                <h2 className="mt-4 text-base font-bold leading-snug group-hover:text-primary">{n.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {n.readTime} · {n.views}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/news/")({
  staticData: { sitemap: true },
  // На клиент уходят только slug'и, а не тексты всех статей.
  loader: () => getArticleSlugs(),
  validateSearch: (s: Record<string, unknown>): { tag?: Tag } =>
    s["tag"] === "новости" || s["tag"] === "статьи" ? { tag: s["tag"] } : {},
  head: () => ({
    meta: [
      { title: "Новости и статьи о домах и банях из бруса и бревна | NORDHAUS" },
      { name: "description", content: "Новости, статьи и видео о строительстве домов и бань из бруса и бревна." },
      { property: "og:title", content: "Новости | NORDHAUS" },
      { property: "og:description", content: "Новости, статьи и видео о строительстве домов и бань из бруса и бревна." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/news` }],
  }),
  component: NewsPage,
});
