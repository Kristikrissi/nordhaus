import { createFileRoute } from "@tanstack/react-router";
import { companyValues, site } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

function CompanyPage() {
  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">О нас</p>
        <h1 className="section-title mt-3">О компании</h1>
        <h2 className="mx-auto mt-8 max-w-3xl text-center text-xl font-bold sm:text-2xl">NORDHAUS — создаём дома на долгие годы</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          С 2014 года мы строим деревянные дома и бани, в которых природная красота дерева сочетается с комфортом, надёжностью и вниманием к деталям.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Для нас каждый проект — это не просто строительство, а создание пространства, где будет приятно жить, отдыхать и проводить время с близкими. Мы тщательно подбираем материалы, продумываем конструктивные решения и следим за качеством на каждом этапе работы.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Мы верим, что хороший деревянный дом — это больше, чем стены и крыша. Это тепло натурального дерева, особая атмосфера и место, куда всегда хочется возвращаться.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm font-semibold leading-relaxed text-foreground sm:text-base">
          NORDHAUS — строим из дерева с заботой о вашем комфорте и будущем.
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

      <section id="vacancy" className="container-wide scroll-mt-32 pt-20 pb-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Вакансии</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Мы всегда рады профессионалам, которые разделяют наш подход к качеству и ответственному строительству. Расскажите о себе — и мы обсудим, как вы можете быть полезны команде NORDHAUS
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
      { title: "О компании | NORDHAUS" },
      { name: "description", content: "NORDHAUS — деревянное домостроение в России. Дома и бани из бруса и бревна." },
      { property: "og:title", content: "О компании | NORDHAUS" },
      { property: "og:description", content: "Мы занимаемся деревянным домостроением на рынке России с 2003 года." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/company` }],
  }),
  component: CompanyPage,
});
