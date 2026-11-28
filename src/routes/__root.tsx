import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieNotice } from "@/components/cookie-notice";
import { ContentGuard } from "@/components/content-guard";
import { site } from "@/lib/site-data";
import { jsonLdScript, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-32">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">Возможно, страница была перемещена или удалена.</p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-32">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Страница не загрузилась</h1>
        <p className="mt-2 text-sm text-muted-foreground">Что-то пошло не так. Попробуйте обновить страницу или вернуться на главную.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Попробовать снова
          </button>
          <a href="/" className="btn-outline">
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{}>()({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} — строительство домов и бань из бруса и бревна` },
      { name: "description", content: "Строительство домов и бань из бруса и бревна по индивидуальным проектам в Москве и области." },
      { property: "og:title", content: "NORDHAUS" },
      { property: "og:description", content: "Строительство домов и бань из бруса и бревна по индивидуальным проектам в Москве и области." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
      /*
       * noai/noimageai — сигнал краулерам не использовать текст и картинки
       * для обучения моделей. Индексацию в поиске они не отключают, поэтому
       * index/follow указываем явно: без этого парсер, не знающий noai,
       * может трактовать строку как «нет разрешённых директив».
       */
      { name: "robots", content: "index, follow, noai, noimageai" },
      // Подтверждение прав в вебмастерах: тег появляется, когда в
      // site.verification указан код из панели Яндекс.Вебмастера / Search Console.
      ...(site.verification.yandex ? [{ name: "yandex-verification", content: site.verification.yandex }] : []),
      ...(site.verification.google ? [{ name: "google-site-verification", content: site.verification.google }] : []),
    ],
    scripts: [jsonLdScript(localBusinessJsonLd), jsonLdScript(websiteJsonLd)],
    links: [
      // Шрифты локальные: предзагружаем оба подмножества, чтобы текст
      // первого экрана не ждал разбора CSS.
      { rel: "preload", href: "/fonts/montserrat-cyrillic.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/montserrat-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <ContentGuard />
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteFooter />
      <CookieNotice />
    </>
  );
}
