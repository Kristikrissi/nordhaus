import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Ключ восстановления позиции по умолчанию — __TSR_key, уникальный для
    // каждой записи истории. Возврат по <Link> создаёт новую запись, поэтому
    // сохранённая позиция страницы не находилась и скролл уезжал в начало.
    //
    // Списки и каталоги привязаны к pathname: позиция восстанавливается при
    // любом возврате на страницу, в том числе когда адрес возврата отличается
    // по query (из карточки проекта подставляется его категория).
    //
    // Статьи остаются на __TSR_key: каждый заход по ссылке — новая запись
    // истории, позиции в кэше нет, поэтому статья всегда открывается сверху.
    scrollRestoration: true,
    getScrollRestorationKey: (location) =>
      /^\/news\/.+/.test(location.pathname) ? (location.state.__TSR_key ?? location.pathname) : location.pathname,
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
