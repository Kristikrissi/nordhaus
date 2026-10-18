import { createFileRoute } from "@tanstack/react-router";
import { companyValues, site } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

function CompanyPage() {
  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">О нас</p>
        <h1 className="section-title mt-3">О компании</h1>
        <h2 className="mt-8 max-w-3xl text-xl font-bold sm:text-2xl">Норд Хаус (NORDHAUS) — дома, в которых хочется жить</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Мы занимаемся деревянным домостроением на рынке России с 2003 года и являемся одной из ведущих компаний, которые строят дома из клеёного бруса в премиальном сегменте.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Одной из наших главных особенностей является использование лучших материалов на рынке и лучших решений как авторских, так и обще рыночных. Наше качество не просто слово, а проявление на каждом этапе работы.
        </p>
      </section>

      <section className="container-wide space-y-6 pt-16" id="values">
        {companyValues.map((v, i) => (
          <div key={v.title} className="overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-2">
            <div className={`overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <img src={v.image} alt={v.title} className="h-64 w-full object-cover sm:h-80 lg:h-full" loading="lazy" />
            </div>
            <div className="p-8 sm:p-10">
              <span className="text-4xl font-extrabold text-primary/30">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold leading-snug sm:text-xl">{v.title}</h3>
              {v.text.map((t, j) => (
                <p key={j} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="vacancy" className="container-wide scroll-mt-32 pt-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Вакансии</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Мы всегда рады профессионалам, которые разделяют наш подход к качеству и ответственному строительству. Расскажите о себе — и мы обсудим, как вы можете быть полезны команде Норд Хаус (NORDHAUS).
          </p>
          <div className="mt-8">
            <CallbackForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/company")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "О компании | Компания Норд Хаус" },
      { name: "description", content: "Норд Хаус (NORDHAUS) — деревянное домостроение в России. Дома и бани из бруса и бревна." },
      { property: "og:title", content: "О компании | Компания Норд Хаус" },
      { property: "og:description", content: "Мы занимаемся деревянным домостроением на рынке России с 2003 года." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/company` }],
  }),
  component: CompanyPage,
});
