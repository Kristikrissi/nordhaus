import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    // Позиция прокрутки сохраняется для каждой записи истории (ключ __TSR_key).
    // Возврат из карточки проекта в каталог делается через history.back()
    // (см. src/lib/scroll-return.ts), поэтому позиция и выбранный фильтр
    // восстанавливаются ровно те, что были при уходе.
    // Обычный переход по ссылке — новая запись истории, позиции в кэше нет,
    // поэтому любая страница (в т.ч. статья) открывается сверху.
    scrollRestoration: true,
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
