import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { categories, projects, site } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

function ProjectsPage() {
  const active = Route.useSearch().category ?? null;
  const navigate = useNavigate({ from: "/projects/" });
  const setActive = (slug: string | null) =>
    navigate({ search: slug ? { category: slug } : {}, replace: true, resetScroll: false });
  const visible = active ? projects.filter((p) => p.categories.includes(active)) : projects;
  const category = categories.find((c) => c.slug === active);

  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">Каталог</p>
        <h1 className="section-title mt-3">Проекты</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
              active === null ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-border"
            }`}
          >
            Дома для жизни
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.slug)}
              className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                active === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-border"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
        {category && (
          <div className="mt-10 overflow-hidden rounded-2xl">
            <img src={`/images/banner-projects.jpg`} alt={category.title} className="h-56 w-full object-cover sm:h-72" />
          </div>
        )}
        {!category && (
          <div className="mt-10 overflow-hidden rounded-2xl">
            <img src="/images/banner-projects.jpg" alt="Проекты домов" className="h-56 w-full object-cover sm:h-72" />
          </div>
        )}
      </section>

      <section className="container-wide pt-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                {p.status && (
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                    {p.status}
                  </span>
                )}
                {p.tags?.map((t) => (
                  <span key={t} className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="p-5">
                <p className="text-lg font-bold">{p.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">Площадь, м²: {p.area}{p.floors ? ` · Этажей: ${p.floors}` : ""}</p>
              </div>
            </Link>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">В этой подборке пока нет опубликованных проектов — посмотрите общий каталог.</p>
        )}
      </section>

      <section className="container-wide pt-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Рассчитайте стоимость вашей мечты</h2>
          <p className="mt-4 text-sm text-muted-foreground">Мы перезвоним для уточнения деталей и ваших указаний к предстоящему обсуждению.</p>
          <div className="mt-8">
            <CallbackForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/projects/")({
  staticData: { sitemap: true },
  validateSearch: (s: Record<string, unknown>): { category?: string } =>
    typeof s['category'] === "string" ? { category: s['category'] } : {},
  head: () => ({
    meta: [
      { title: "Проекты домов из клееного бруса и CLT панелей | Компания Норд Хаус" },
      { name: "description", content: "Каталог проектов: дома из клееного бруса, СЛТ (CLT) панелей, фахверк, усадьбы и комплексы, бани и СПА." },
      { property: "og:title", content: "Проекты | Компания Норд Хаус" },
      { property: "og:description", content: "Каталог проектов домов из клееного бруса и СЛТ (CLT) панелей в Москве и области." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/projects` }],
  }),
  component: ProjectsPage,
});
