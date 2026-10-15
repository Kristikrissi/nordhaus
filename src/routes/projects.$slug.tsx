import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { projects, site } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

function ProjectDetail() {
  const project = Route.useLoaderData();

  return (
    <main className="pt-28">
      <section className="container-wide">
        <Link to="/projects" className="text-sm text-muted-foreground transition-colors hover:text-primary">
          ← Все проекты
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="section-title">{project.name}</h1>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span>
                Площадь, м²: <strong className="text-foreground">{project.area}</strong>
              </span>
              {project.floors && (
                <span>
                  Этажей: <strong className="text-foreground">{project.floors}</strong>
                </span>
              )}
              {project.status && (
                <span>
                  Статус: <strong className="text-foreground">{project.status}</strong>
                </span>
              )}
            </div>
          </div>
          <a href={site.phoneHref} className="btn-primary">
            Обсудить проект
          </a>
        </div>
      </section>

      <section className="container-wide pt-10">
        <div className="overflow-hidden rounded-2xl">
          <img src={project.images[0]} alt={project.name} className="max-h-[640px] w-full object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {project.images.slice(1, 5).map((img) => (
            <div key={img} className="overflow-hidden rounded-xl">
              <img src={img} alt={project.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide pt-16">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Хотите такой же дом?</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Мы перезвоним для уточнения деталей и ваших указаний к предстоящему обсуждению.
          </p>
          <div className="mt-8">
            <CallbackForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/projects/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Проект не найден | Компания Норд Хаус" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.name} — проект дома | Компания Норд Хаус` },
        { name: "description", content: `Проект «${loaderData.name}»: площадь ${loaderData.area} м²${loaderData.floors ? `, ${loaderData.floors} этажа` : ""}. Дома из клееного бруса и СЛТ (CLT) панелей от Норд Хаус.` },
        { property: "og:title", content: `${loaderData.name} | Компания Норд Хаус` },
        { property: "og:description", content: `Площадь ${loaderData.area} м²${loaderData.floors ? `, этажей: ${loaderData.floors}` : ""}.` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `${site.url}/projects/${loaderData.slug}` }],
    };
  },
  component: ProjectDetail,
});
