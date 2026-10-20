import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { news, site } from "@/lib/site-data";
import { articleBySlug } from "@/lib/news-articles";

export const Route = createFileRoute("/news/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const found = articleBySlug(params.slug);
    if (!found) throw notFound();
    const [title, article] = found;
    const item = news.find((n) => n.title === title)!;
    return { title, article, item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Статья не найдена" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.title} | Норд Хаус`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.item.excerpt },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.item.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: `${site.url}/news/${loaderData.article.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main className="container-wide pt-40 pb-24">
      <h1 className="section-title">Статья не найдена</h1>
      <Link to="/news" className="btn-primary mt-8 inline-flex">К новостям</Link>
    </main>
  ),
  errorComponent: () => (
    <main className="container-wide pt-40 pb-24"><h1 className="section-title">Ошибка загрузки</h1></main>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { title, article, item } = Route.useLoaderData();
  return (
    <main className="pt-28 pb-20">
      <article className="container-wide max-w-3xl">
        <Link to="/news" className="text-sm text-muted-foreground hover:text-primary">← Все новости</Link>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1 font-semibold uppercase tracking-wide text-primary">{item.tag}</span>
          <span>{item.date}</span>
          <span>· {item.readTime}</span>
        </div>
        <h1 className="mt-5 text-2xl font-bold uppercase leading-tight md:text-4xl">{title}</h1>
        <img src={item.image} alt={title} className="mt-8 aspect-[16/9] w-full rounded-xl object-cover" />
        <p className="mt-8 text-lg leading-relaxed">{item.excerpt}</p>
        {article.sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="text-xl font-bold">{s.h}</h2>
            {s.p.split(/\n+/).map((para, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{para}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
