import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Camera, Paintbrush } from "lucide-react";
import { finishing, site } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { CallbackForm } from "@/components/callback-form";
import { ProjectsGallery } from "@/components/projects-gallery";

function PriceTable({ title, rows }: { title: string; rows: { work: string; price: string }[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-4 sm:px-6">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Paintbrush className="size-4" />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wide sm:text-[15px]">{title}</h3>
      </div>
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col />
          <col className="w-[38%] sm:w-[34%]" />
        </colgroup>
        <thead className="sr-only">
          <tr>
            <th scope="col">Вид работ</th>
            <th scope="col">Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.work} className={"border-b border-border/60 last:border-b-0" + (i % 2 === 1 ? " bg-secondary/40" : "")}>
              <td className="px-5 py-3.5 pr-3 align-top text-sm leading-snug text-foreground sm:px-6 sm:pr-4">{r.work}</td>
              <td className="px-5 py-3.5 pl-3 align-top text-sm font-semibold text-primary sm:px-6 sm:pl-4 sm:text-right">
                {r.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinishingPage() {
  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="container-wide">
        <Button variant="link" className="mb-6 -ml-2 p-0" asChild>
          <Link to="/projects">
            <ArrowLeft />
            Каталог проектов
          </Link>
        </Button>
        <p className="eyebrow mt-8">{finishing.eyebrow}</p>
        <h1 className="section-title mt-3 break-anywhere">{finishing.title}</h1>
        {finishing.intro.map((p, i) => (
          <p
            key={i}
            className={
              "mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed sm:text-base " +
              (i === finishing.intro.length - 1
                ? "font-semibold text-foreground"
                : "text-muted-foreground")
            }
          >
            {p}
          </p>
        ))}
      </section>

      {/* Прайс */}
      <section id="pricing" className="container-wide scroll-mt-32 pt-20">
        <p className="eyebrow">Что мы делаем и по какой цене</p>
        <h2 className="section-title mt-3">{finishing.pricingTitle}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {finishing.pricing.map((g) => (
            <PriceTable key={g.title} title={g.title} rows={g.rows} />
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
          {finishing.pricingNote}
        </p>
      </section>

      {/* Примеры работ: как только в finishing.works появятся фото — встанет общая галерея с лайтбоксом */}
      <section id="examples" className="container-wide scroll-mt-32 pt-20">
        <p className="eyebrow">Портфолио</p>
        <h2 className="section-title mt-3">Примеры работ</h2>
        {finishing.works.length > 0 ? (
          <div className="mt-8">
            <ProjectsGallery images={finishing.works} title="Примеры работ по отделке" />
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-10 text-center sm:p-14">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Camera className="size-6" />
            </span>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{finishing.galleryNote}</p>
          </div>
        )}
      </section>

      {/* CTA с формой */}
      <section className="container-wide pt-20 pb-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Рассчитаем стоимость отделки</h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
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

export const Route = createFileRoute("/otdelka")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Внутренняя и внешняя отделка домов из дерева | NORDHAUS" },
      {
        name: "description",
        content:
          "Внутренняя и внешняя отделка деревянных домов: шлифовка, покраска, конопатка, полы, потолки, окна и двери. Ориентировочные цены и индивидуальный расчёт от NORDHAUS.",
      },
      { property: "og:title", content: "Внутренняя и внешняя отделка домов | NORDHAUS" },
      { property: "og:description", content: "Отделка деревянного дома — внутри и снаружи. Цены и расчёт по объекту." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/otdelka` }],
  }),
  component: FinishingPage,
});
