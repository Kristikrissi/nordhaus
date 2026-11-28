import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/lib/site-data";

/**
 * Страница «Спасибо» — техническая точка после отправки заявки.
 * Нужна для цели Яндекс.Метрики/Google Analytics на посещение URL:
 * настраивается как «Посещение страницы /thanks».
 * Из поисковой выдачи исключена (noindex) и не попадает в sitemap.
 */
function ThanksPage() {
  return (
    <main className="container-wide pt-40 pb-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Заявка отправлена</p>
        <h1 className="section-title mt-3">Спасибо! Мы свяжемся с вами</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Заявка получена. Мы перезвоним в рабочее время, чтобы уточнить детали и обсудить ваш проект.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Если вопрос срочный — позвоните нам:{" "}
          <a href={site.phoneHref} className="font-semibold text-primary transition-colors hover:text-primary/80">
            {site.phone}
          </a>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/projects" className="btn-primary">
            Смотреть проекты
          </Link>
          <Link to="/" className="btn-outline">
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/thanks")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Спасибо за заявку | NORDHAUS" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: ThanksPage,
});
