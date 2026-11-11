import { site } from "@/lib/site-data";

/**
 * Фирменный знак MAX — официальный цветной логотип из брендбука
 * (go.max.ru/brandbook), голубой градиент. Цвет не наследуется,
 * поэтому знак одинаково читается и на светлом, и на тёмном фоне.
 */
export function MaxIcon({ className = "size-6" }: { className?: string }) {
  return (
    <img
      src="/images/__images/max.svg"
      alt="MAX"
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      className={`shrink-0 ${className}`}
    />
  );
}

type MaxLinkProps = {
  /** Дополнительные классы — размер и отступы задаёт место использования. */
  className?: string;
};

/**
 * Значок мессенджера MAX: клик открывает чат с компанией.
 * Адрес — ссылка профиля из `site.maxChat`.
 */
export function MaxLink({ className = "" }: MaxLinkProps) {
  return (
    <a
      href={site.maxChat}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в мессенджер MAX"
      title="Написать в MAX"
      className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
    >
      <MaxIcon />
    </a>
  );
}
