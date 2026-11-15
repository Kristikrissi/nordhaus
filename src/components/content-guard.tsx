import { useEffect } from "react";

/**
 * Защита контента от механического копирования: правый клик, выделение
 * текста, перетаскивание картинок.
 *
 * Границы защиты: HTML, CSS и картинки всё равно уходят в браузер, поэтому
 * их можно сохранить через «Сохранить страницу», DevTools или с отключённым
 * JavaScript. Это барьер против случайного копирования, а не абсолютная
 * защита. Против массового сбора контента работают robots.txt с блокировкой
 * AI-краулеров и HTTP-заголовки.
 *
 * Намеренно НЕ блокируем F12 / Ctrl+Shift+I / Ctrl+U / Ctrl+S / Ctrl+P:
 * они обходятся меню браузера за два клика, но ломают отладку и мешают
 * обычным посетителям.
 *
 * Исключения: в полях ввода и в <code>/<pre> правый клик и выделение
 * работают как обычно. Телефон и почта — кликабельные tel:/mailto: ссылки,
 * выделять их не нужно.
 */
export function ContentGuard() {
  useEffect(() => {
    /** Поля ввода и программный текст должны вести себя стандартно. */
    const isEditable = (node: EventTarget | null) =>
      node instanceof HTMLElement &&
      node.closest("input, textarea, [contenteditable='true'], code, pre") !== null;

    const onContextMenu = (e: MouseEvent) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };

    const onSelectStart = (e: Event) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
