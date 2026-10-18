import { createFileRoute } from "@tanstack/react-router";
import { offices, requisites, site, socials } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

function ContactsPage() {
  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">Связаться с нами</p>
        <h1 className="section-title mt-3">Контакты</h1>

        <div className={`mt-10 grid gap-5 ${offices.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {offices.map((o) => (
            <div key={o.region} className="rounded-2xl border border-border bg-card p-8">
              <p className="eyebrow">{o.region}</p>
              <p className="mt-4 text-lg font-semibold leading-snug">{o.address}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Режим работы</dt>
                  <dd className="mt-1">
                    {o.hours.map((h) => (
                      <p key={h}>{h}</p>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Телефон</dt>
                  <dd className="mt-1">
                    <a href={site.phoneHref} className="font-semibold transition-colors hover:text-primary">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="transition-colors hover:text-primary">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <a href={o.mapUrl} target="_blank" rel="noreferrer" className="btn-outline mt-8">
                Построить маршрут в Яндекс.Карты
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide pt-12">
        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Карта офиса Норд Хаус"
            src="https://yandex.ru/map-widget/v1/?ll=42.682000%2C58.762200&z=13&pt=42.682000,58.762200,pm2gnm"
            className="h-[420px] w-full"
            loading="lazy"
          />
        </div>
      </section>

      <section className="container-wide pt-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Написать сообщение</h2>
          <p className="mt-4 text-sm text-muted-foreground">Мы перезвоним для уточнения деталей и ваших указаний к предстоящему обсуждению.</p>
          <div className="mt-8">
            <CallbackForm />
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-primary hover:text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-wide pt-20">
        <h2 className="section-title">Реквизиты компании</h2>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          Ниже приведены реквизиты компании, в случае необходимости получения дополнительных документов: свидетельства о государственной регистрации, идентификационного номера налогоплательщика вы можете обратиться в бухгалтерию предприятия.
        </p>
        <dl className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {requisites.map((r) => (
            <div key={r.label} className="grid gap-1 p-5 sm:grid-cols-[280px_1fr] sm:gap-6">
              <dt className="text-sm font-semibold">{r.label}</dt>
              <dd className="text-sm text-muted-foreground">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/contacts")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Контакты компании и адрес офиса в Чухломе | Компания Норд Хаус" },
      { name: "description", content: "Контакты Норд Хаус: офис в Чухломе (Костромская область), телефон +7 (950) 246-54-77, email n99511285@gmail.com." },
      { property: "og:title", content: "Контакты | Компания Норд Хаус" },
      { property: "og:description", content: "Офис в Чухломе, Костромская область. Телефон +7 (950) 246-54-77, email n99511285@gmail.com." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/contacts` }],
  }),
  component: ContactsPage,
});
