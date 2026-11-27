import { createFileRoute, Link } from "@tanstack/react-router";
import { offices, privacyPolicy, site } from "@/lib/site-data";
import { breadcrumbJsonLd, jsonLdScript, socialMeta } from "@/lib/seo";

function PrivacyPage() {
  return (
    <main className="pt-28 pb-20">
      <article className="container-wide">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ← На главную
          </Link>
          <p className="eyebrow mt-6">Правовая информация</p>
          <h1 className="section-title mt-3">Политика конфиденциальности</h1>
          <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
            Редакция от {privacyPolicy.updatedAt}
          </p>

          <p className="mt-8 text-sm leading-relaxed text-foreground">{privacyPolicy.intro}</p>

          {privacyPolicy.sections.map((section) => (
            <section key={section.title} className="mt-8">
              <h2 className="text-lg font-bold leading-snug">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.contacts && (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  <li>
                    <span className="text-muted-foreground">Телефон: </span>
                    <a
                      href={site.phoneHref}
                      className="font-semibold transition-colors hover:text-primary"
                    >
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Электронная почта: </span>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-semibold transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </li>
                  {offices.map((office) => (
                    <li key={office.region}>
                      <span className="text-muted-foreground">Адрес: </span>
                      {office.address}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности | NORDHAUS" },
      {
        name: "description",
        content:
          "Политика конфиденциальности сайта NORDHAUS: порядок обработки персональных данных, использования файлов cookie и права пользователей.",
      },
      { property: "og:title", content: "Политика конфиденциальности | NORDHAUS" },
      {
        property: "og:description",
        content:
          "Порядок обработки персональных данных и использования файлов cookie на сайте NORDHAUS.",
      },
      { property: "og:type", content: "website" },
      ...socialMeta("/privacy"),
    ],
    links: [{ rel: "canonical", href: `${site.url}/privacy` }],
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Политика конфиденциальности", path: "/privacy" },
        ]),
      ),
    ],
  }),
  component: PrivacyPage,
});
