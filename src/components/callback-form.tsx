import { useState } from "react";
import { site } from "@/lib/site-data";

export function CallbackForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  if (sent) {
    return (
      <div className={`rounded-xl bg-secondary p-6 text-center ${compact ? "" : "py-10"}`}>
        <p className="text-lg font-semibold text-foreground">Спасибо! Заявка отправлена.</p>
        <p className="mt-2 text-sm text-muted-foreground">Мы перезвоним вам, чтобы уточнить детали и обсудить ваши пожелания.</p>
      </div>
    );
  }

  const canSubmit = name.trim() && phone.trim() && consent;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={compact ? "space-y-3" : "space-y-4"}
    >
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
      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-muted-foreground">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--primary)]" />
        <span>Я согласен на обработку персональных данных</span>
      </label>
      <button type="submit" disabled={!canSubmit} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
        Отправить
      </button>
    </form>
  );
}
