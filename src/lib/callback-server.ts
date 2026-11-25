import { createServerFn } from "@tanstack/react-start";

/**
 * Заявки с форм «Заказать звонок» уходят на почту через Resend HTTP API.
 * Env на Vercel:
 *   RESEND_API_KEY — ключ Resend (обязателен);
 *   MAIL_TO        — получатель, по умолчанию onboarding@resend.dev;
 *   MAIL_FROM      — отправитель, по умолчанию NORDHAUS <onboarding@resend.dev>
 *                    (свой домен подключается в Resend после верификации).
 */
export const sendCallback = createServerFn({ method: "POST" })
  .validator((d: { name: string; phone: string; email: string; source: string }) => d)
  .handler(async ({ data }) => {
    const key = process.env["RESEND_API_KEY"];
    if (!key) {
      return { ok: false as const, error: "Почта не настроена. Позвоните нам — телефон в шапке сайта." };
    }

    const to = process.env["MAIL_TO"] ?? "onboarding@resend.dev";
    const from = process.env["MAIL_FROM"] ?? "NORDHAUS <onboarding@resend.dev>";
    const body = [
      `Имя: ${data.name}`,
      `Телефон: ${data.phone}`,
      `Почта: ${data.email || "—"}`,
      `Страница: ${data.source}`,
      `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК`,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Заявка с сайта: ${data.name} — ${data.phone}`,
        text: body,
      }),
    });

    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return { ok: false as const, error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам." };
    }
    return { ok: true as const };
  });
