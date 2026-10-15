import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      // nitro/vite builds from this
      // Free SSR hosting: Vercel (Hobby). Switch preset when deploying elsewhere,
      // e.g. "cloudflare-pages" or "node-server".
      server: { entry: "server", preset: "vercel" },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
