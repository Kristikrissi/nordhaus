import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    // Vite 8 resolves tsconfig paths natively (@/ alias).
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    // Free SSR hosting: Vercel (Hobby). Switch preset when deploying elsewhere,
    // e.g. "cloudflare-pages" or "node-server".
    //
    // HTTP-заголовки безопасности ставятся в src/server.ts, а не через
    // routeRules/vercel.json: nitro-пресет "vercel" отдаёт платформу через
    // Build Output API, и правила вида "/**" становятся маршрутом без
    // continue — это могло бы перехватить раздачу страниц.
    nitro({ preset: "vercel" }),
  ],
});
