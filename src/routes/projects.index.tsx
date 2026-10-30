import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Paintbrush } from "lucide-react";
import { categories, projects, site, finishing, type Project } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { CallbackForm } from "@/components/callback-form";

function categoryTitleOf(p: Project) {
  return categories.find((c) => p.categories.includes(c.slug))?.title;
}

function ProjectsPage() {
  const active = Route.useSearch().category ?? null;
  const navigate = useNavigate({ from: "/projects/" });
  const setActive = (slug: string | null) =>
    navigate({ search: slug ? { category: slug } : {}, replace: true, resetScroll: false });
  const visible = active ? projects.filter((p) => p.categories.includes(active)) : projects;

  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">Дома и бани из бруса и бревна</p>
        <h1 className="section-title mt-3">Каталог проектов</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant={!active ? "pill" : "outline"} onClick={() => setActive(null)}>
            Все проекты
          </Button>
          {categories.map((c) => (
            <Button key={c.slug} variant={active === c.slug ? "pill" : "outline"} onClick={() => setActive(c.slug)}>
              {c.title}
            </Button>
          ))}
        </div>
      </section>

      <section className="container-wide pt-12">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="project-link">
              <div className="overflow-hidden rounded-lg">
                <img src={p.images[0]} alt={p.name} loading="lazy" className="project-photo" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">{p.name}</h2>
                  <p className="project-meta mt-2">
                    {categoryTitleOf(p)}
                    {p.size ? ` · ${p.size}` : ""}
                    {p.area ? ` · застройка ${p.area} м²` : ""}
                  </p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-primary" />
              </div>
            </Link>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            В этой категории нет доступных проектов — посмотрите общий каталог.
          </p>
        )}
      </section>

      {/* Не проект, а услуга — поэтому блок идёт отдельно от сетки и оформлен иначе. */}
      <section className="container-wide pt-14">
        <Link
          to="/otdelka"
          className="group block rounded-2xl border border-primary/30 bg-primary/5 p-7 transition-colors hover:border-primary sm:p-9"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Paintbrush className="size-5" />
                </span>
                <h2 className="text-base font-bold uppercase sm:text-lg">{finishing.menuLabel}</h2>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-foreground">
                  Услуги
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Отдельное направление: прайс на отделочные работы и расчёт по конкретному объекту.
              </p>
            </div>
            <ArrowUpRight className="size-6 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </section>

      <section className="container-wide pt-20 pb-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Рассчитайте стоимость дома вашей мечты</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Мы перезвоним вам, чтобы уточнить детали и обсудить ваши пожелания
          </p>
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
      { title: "Проекты домов и бань из бруса и бревна | NORDHAUS" },
      { name: "description", content: "Каталог проектов: дома из бруса, дома из бревна, бани из бруса и бани из бревна." },
      { property: "og:title", content: "Проекты | NORDHAUS" },
      { property: "og:description", content: "Каталог проектов домов и бань из бруса и бревна в Москве и области." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/projects` }],
  }),
  component: ProjectsPage,
});
