import { useState, useEffect, useId, type FormEvent } from "react";
import { sendCallback } from "@/lib/callback-server";

/**
 * Форма «Заказать звонок» — отправляет заявку на почту через server function.
 * Состояния: idle / loading / sent / error.
 * Honeypot-поле для защиты от ботов.
 */
export function CallbackForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const consentId = useId();

  useEffect(() => {
    // Бот заполнил honeypot — тихо игнорируем.
    if (hp) setSent(true);
  }, [hp]);

  if (sent) {
    return (
      <div className={`rounded-xl bg-secondary p-6 text-center ${compact ? "" : "py-10"}`}>
        <p className="text-lg font-semibold text-foreground">Спасибо! Заявка отправлена.</p>
        <p className="mt-2 text-sm text-muted-foreground">Мы перезвоним вам, чтобы уточнить детали и обсудить ваши пожелания.</p>
      </div>
    );
  }

  const canSubmit = name.trim() && phone.trim() && consent;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await sendCallback({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          source: window.location.href,
        },
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(res.error ?? "Не удалось отправить. Попробуйте позже.");
      }
    } catch {
      setError("Ошибка сети. Проверьте соединение и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
    >
      {/* Honeypot — скрыт от пользователя, доступен ботам в разметке. */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Оставьте это пустым
          <input
            type="text"
            name="website"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-3"}>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Ваше имя *</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">Телефон *</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>
        {!compact && (
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Электронная почта</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </label>
        )}
      </div>
      <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
        <input id={consentId} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--primary)]" />
        <div>
          <label htmlFor={consentId} className="cursor-pointer">Я согласен на обработку персональных данных в соответствии с </label>
          <a
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            политикой конфиденциальности
          </a>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Отправляю…" : "Отправить"}
      </button>
    </form>
  );
}

