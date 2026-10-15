import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, isSitemapRouteIncluded, type SitemapEntry } from "@/lib/sitemap";
import { projects, site } from "@/lib/site-data";
import { articles } from "@/lib/news-articles";

const BASE_URL = site.url;

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        if (isSitemapRouteIncluded(router.routesById["/projects/$slug"])) {
          for (const p of projects) {
            const loc = router.buildLocation({ to: "/projects/$slug", params: { slug: p.slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, loc, "/projects/$slug");
            if (path) entries.push({ path });
          }
        }
        if (isSitemapRouteIncluded(router.routesById["/news/$slug"])) {
          for (const a of Object.values(articles)) {
            const loc = router.buildLocation({ to: "/news/$slug", params: { slug: a.slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, loc, "/news/$slug");
            if (path) entries.push({ path });
          }
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
