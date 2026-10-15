# AGENTS.md

## Architecture & conventions

- This is a visual clone of s-h.ru (Строй Хауз). All content data lives in `src/lib/site-data.ts` — routes import from there, no inline data.
- Shared site chrome (header with dropdowns + callback modal, footer) is in `src/components/site-header.tsx` and `site-footer.tsx`, rendered around `<Outlet />` in `src/routes/__root.tsx`.
- Callback form (`src/components/callback-form.tsx`) is a controlled form with local success state (no backend yet); it is reused on home, projects, project detail, company and contacts pages.
- "Заказать звонок" triggers on other pages dispatch a `open-callback-modal` window event that `SiteHeader` listens for and opens its modal.
- Design tokens (olive primary, orange accent, Montserrat font, .btn-primary/.btn-outline/.eyebrow/.section-title/.container-wide helpers) are defined once in `src/styles.css`; components use semantic classes, never hardcoded colors.
- Images cloned from s-h.ru live in `public/images/` (hash names .jpg, gallery, logo/, banner-*); referenced via absolute `/images/...` paths.
- Fonts: free Montserrat via Google Fonts <link> in `src/routes/__root.tsx` (original Gotham Pro is commercial).
- Every route sets `staticData.sitemap`; `/sitemap.xml` (src/routes/sitemap[.]xml.ts) builds from router + projects/articles data, so new pages appear automatically.
