import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/news-articles";
import { news, site, type NewsItem } from "@/lib/site-data";

function NewsPage() {
  const [tag, setTag] = useState<"все" | NewsItem["tag"]>("все");
  const visible = tag === "все" ? news : news.filter((n) => n.tag === tag);

  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">Блог</p>
        <h1 className="section-title mt-3">Новости</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {(["все", "новости", "статьи"] as const).map((t) => (
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
            <Link key={n.title} to="/news/$slug" params={{ slug: articles[n.title]!.slug }} className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.image} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
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
  head: () => ({
    meta: [
      { title: "Новости и статьи о домах и банях из бруса и бревна | Компания Норд Хаус" },
      { name: "description", content: "Новости, статьи и видео о строительстве домов и бань из бруса и бревна." },
      { property: "og:title", content: "Новости | Компания Норд Хаус" },
      { property: "og:description", content: "Новости, статьи и видео о строительстве домов и бань из бруса и бревна." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/news` }],
  }),
  component: NewsPage,
});
