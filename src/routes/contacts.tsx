import { createFileRoute } from "@tanstack/react-router";
import { offices, site } from "@/lib/site-data";
import { socialMeta } from "@/lib/seo";
import { YandexMap } from "@/components/yandex-map";
import { CallbackForm } from "@/components/callback-form";
import { MaxLink } from "@/components/max-link";

function ContactsPage() {
  return (
    <main className="pt-28">
      <section className="container-wide">
        <p className="eyebrow">Связаться с нами</p>
        <h1 className="section-title mt-3">Контакты</h1>

        <div className={`mt-10 grid gap-5 ${offices.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {offices.map((o) => (
            <div key={o.region} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid lg:grid-cols-2">
                <div className="p-8">
                  <p className="eyebrow">{o.region}</p>
                  <p className="mt-4 text-lg font-semibold leading-snug">
                    {o.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
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
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">Мессенджер MAX</dt>
                      <dd className="mt-1">
                        <MaxLink />
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
                {/* Интерактивная карта на JS API: без рекламного блока виджета. */}
                <YandexMap
                  center={o.coords}
                  label={o.mapLabel}
                  className="h-full min-h-[320px] w-full overflow-hidden"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide pt-20 pb-20">
        <div className="rounded-2xl bg-secondary p-8 sm:p-12">
          <h2 className="section-title">Остались вопросы по строительству?</h2>
          <p className="mt-4 text-sm text-muted-foreground">Мы ответим на все ваши вопросы и поможем найти подходящее решение</p>
          <div className="mt-8">
            <CallbackForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/contacts")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Контакты компании и адрес офиса в Чухломе | NORDHAUS" },
      { name: "description", content: `Контакты NORDHAUS: офис в Чухломе (Костромская область), телефон ${site.phone}, email ${site.email}.` },
      { property: "og:title", content: "Контакты | NORDHAUS" },
      { property: "og:description", content: `Офис в Чухломе, Костромская область. Телефон ${site.phone}, email ${site.email}.` },
      { property: "og:type", content: "website" },
      ...socialMeta("/contacts"),
    ],
    links: [{ rel: "canonical", href: `${site.url}/contacts` }],
  }),
  component: ContactsPage,
});
