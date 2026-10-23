import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { categories, projects, site, type Project } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { CallbackForm } from "@/components/callback-form";
import { ProjectsGallery } from "@/components/projects-gallery";

function categoryTitleOf(p: Project) {
  return categories.find((c) => p.categories.includes(c.slug))?.title;
}

function pluralFloors(n: number | undefined) {
  if (!n) return "";
  if (n % 10 === 1 && n % 100 !== 11) return `${n} этаж`;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) return `${n} этажа`;
  return `${n} этажей`;
}

function ProjectDetail() {
  const project = Route.useLoaderData();
  const category = categoryTitleOf(project);

  const paragraphs = [
    `Проект «${project.name}»${category ? ` — ${category.toLowerCase()}` : ""}. Габариты сруба по проекту — ${project.size}, площадь застройки ${project.area} м²${project.floors ? `, ${pluralFloors(project.floors)}` : ""}${project.material ? `, материал стен — ${project.material.toLowerCase()}` : ""}.`,
    project.status
      ? `Статус: ${project.status}. Строительством занимается NORDHAUS — дома и бани из бруса и бревна по индивидуальным проектам в Москве и области.`
      : `Сборка выполняется по проекту с учётом усадки деревянного сруба. Строительством занимается NORDHAUS — дома и бани из бруса и бревна по индивидуальным проектам в Москве и области.`,
  ];

  return (
    <main className="pt-28">
      <div className="site-shell pt-6 pb-12">
        <Button variant="link" className="mb-7 p-0" asChild>
          <Link to="/projects">
            <ArrowLeft />
            Каталог проектов
          </Link>
        </Button>

        {category && <p className="section-label">{category}</p>}
        <h1 className="section-title mt-4">{project.name}</h1>
      </div>

      <div className="site-shell pb-20">
        <img src={project.images[0]} alt={project.name} className="detail-cover" />

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-semibold">Фотографии и планировки</h2>
          <ProjectsGallery images={project.images.slice(1)} title={project.name} />
        </div>

        <div className="mb-10 mt-12 border-b border-border py-8">
          <p className="text-sm text-muted-foreground">Размеры дома</p>
          <p className="mt-2 text-2xl">
            {project.size}
            {project.floors ? ` · ${pluralFloors(project.floors)}` : ""}
          </p>
          <p className="project-meta mt-2">
            Площадь застройки {project.area} м²{project.material ? ` · ${project.material}` : ""}
            {project.code ? ` · ${project.code}` : ""}
          </p>
          {project.status && <p className="project-meta mt-2">Статус: {project.status}</p>}
        </div>

        <div className="mb-10 max-w-3xl">
          <div className="content-copy">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {project.specs && (
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold">Комплектность проекта</h2>
            <ul className="max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {project.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <section className="site-shell pb-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Хотите такой же дом?</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Мы перезвоним для уточнения деталей и ваших указаний к предстоящему обсуждению
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
      return { meta: [{ title: "Проект не найден | NORDHAUS" }, { name: "robots", content: "noindex" }] };
    }
    const cat = categoryTitleOf(loaderData)?.toLowerCase() ?? "проект";
    return {
      meta: [
        { title: `${loaderData.name} — ${cat} | NORDHAUS` },
        { name: "description", content: `Проект «${loaderData.name}»: габариты ${loaderData.size}, площадь застройки ${loaderData.area} м². Дома и бани из бруса и бревна от NORDHAUS.` },
        { property: "og:title", content: `${loaderData.name} — ${cat} | NORDHAUS` },
        { property: "og:description", content: `Габариты ${loaderData.size}, площадь застройки ${loaderData.area} м².${loaderData.floors ? ` Этажей: ${loaderData.floors}.` : ""}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `${site.url}/projects/${loaderData.slug}` }],
    };
  },
  component: ProjectDetail,
});
