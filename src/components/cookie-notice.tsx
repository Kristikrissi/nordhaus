import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

/** Ключ согласия: плашка показывается, пока пользователь не нажал «Принять». */
const STORAGE_KEY = "nordhaus-cookie-consent";

/**
 * Уведомление об использовании файлов cookie.
 * Рендерится только после монтирования, чтобы серверная и клиентская
 * разметка совпадали и плашка не мигала при гидратации.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Хранилище недоступно (приватный режим) — показываем уведомление,
      // но выбор запомнить не сможем.
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Игнорируем: главное — скрыть плашку в текущей сессии.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4"
      role="region"
      aria-label="Уведомление об использовании файлов cookie"
    >
      <div className="container-wide">
        <div className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Мы используем файлы cookie и локальное хранилище, чтобы сайт работал корректно.
            Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <Link
              to="/privacy"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              политикой конфиденциальности
            </Link>
            .
          </p>
          <button type="button" onClick={accept} className="btn-primary shrink-0 !px-6 !py-2.5">
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
