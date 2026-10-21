import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Отключено намеренно: при scrollRestoration: true повторно открытая
    // статья прокручивается к сохранённой позиции вместо начала.
    // Каждая страница (в т.ч. статьи) всегда открывается сверху.
    scrollRestoration: false,
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
