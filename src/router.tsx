import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Сохраняем позицию прокрутки при возврате на страницу (например, из
    // карточки проекта обратно в каталог). Для страниц статей отключено —
    // там всегда открываем начало текста.
    scrollRestoration: ({ location }) => !location.pathname.startsWith("/news/"),
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
