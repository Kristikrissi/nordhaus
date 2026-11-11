import { site } from "@/lib/site-data";

/** Знак MAX: буква M в скруглённой рамке, наследует currentColor. */
export function MaxIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.6 17V7.8l5.4 5.4 5.4-5.4V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type MaxLinkProps = {
  /** Дополнительные классы — оформление (цвет) берётся от места использования. */
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
      className={`inline-flex items-center transition-colors hover:text-primary ${className}`}
    >
      <MaxIcon className="size-6" />
    </a>
  );
}
