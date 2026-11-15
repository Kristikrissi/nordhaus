import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * Базовые HTTP-заголовки безопасности для всех SSR-ответов.
 *
 * Ставятся здесь, а не в vercel.json/routeRules: nitro-пресет "vercel"
 * собирает деплой через Build Output API, и правило "/**" превращается в
 * маршрут без `continue`, который способен перехватить отдачу страниц.
 *
 * X-Frame-Options не мешает встроенной Яндекс.Карте: она ограничивает
 * встраивание ОТВЕТОВ яндекса, а запросы к yandex.ru идут с нашего origin.
 */
const SECURITY_HEADERS = {
  // Страницу нельзя встроить в чужой iframe — защита от clickjacking
  "X-Frame-Options": "DENY",
  // Браузер не должен угадывать MIME-тип ответа вместо указанного
  "X-Content-Type-Options": "nosniff",
  // Полный referrer уходит только внутри своего origin, наружу — только origin
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Чужим origin-ам недоступны камера, микрофон, геолокация и FLEDGE-аукционы
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  // Картинки и шрифты разрешено подключать только с этого же origin
  "Cross-Origin-Resource-Policy": "same-origin",
} as const;

function withSecurityHeaders(response: Response): Response {
  try {
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      if (!response.headers.has(name)) response.headers.set(name, value);
    }
    return response;
  } catch {
    // У ответа из Response.redirect() headers immutable — пересобираем его.
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      if (!headers.has(name)) headers.set(name, value);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
