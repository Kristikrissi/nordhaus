/**
 * Возврат из карточки проекта в тот же список каталога.
 *
 * Позиция прокрутки и выбранный фильтр живут в конкретной записи истории
 * браузера. Поэтому при входе в проект из каталога запоминаем индекс этой
 * записи, а на выходе возвращаемся назад по истории, если пришли именно
 * оттуда: тогда список открывается с тем же фильтром и на том же месте.
 *
 * Если проект открыли не из каталога (прямая ссылка, новая вкладка),
 * возврата по истории нет — остаётся обычная ссылка на /projects.
 */

const STORAGE_KEY = "nordhaus-catalog-entry";

/** Индекс текущей записи истории TanStack Router. */
function currentEntryIndex(): number | undefined {
  const state = window.history.state as { __TSR_index?: number } | null;
  return typeof state?.__TSR_index === "number" ? state.__TSR_index : undefined;
}

/** Вызывается при монтаже каталога: какой записью истории он представлен. */
export function markCatalogEntry(): void {
  const index = currentEntryIndex();
  if (index === undefined) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // приватный режим без sessionStorage — возврат просто пойдёт по ссылке
  }
}

/**
 * True, если текущая страница была открыта переходом сразу после каталога,
 * то есть history.back() вернёт пользователя именно в него.
 */
export function canReturnToCatalog(): boolean {
  const index = currentEntryIndex();
  if (index === undefined) return false;
  let saved: string | null = null;
  try {
    saved = sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
  return saved !== null && Number(saved) === index - 1;
}
