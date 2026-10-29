# AGENTS.md

## Architecture & conventions

- All content data lives in `src/lib/site-data.ts` — routes import from there, no inline data.
- Shared site chrome (header with dropdowns + callback modal, footer) is in `src/components/site-header.tsx` and `site-footer.tsx`, rendered around `<Outlet />` in `src/routes/__root.tsx`.
- Callback form (`src/components/callback-form.tsx`) is a controlled form with local success state (no backend yet); it is reused on home, projects, project detail, company and contacts pages.
- "Заказать звонок" triggers on other pages dispatch a `open-callback-modal` window event that `SiteHeader` listens for and opens its modal.
- Design tokens (olive primary, orange accent, Montserrat font, .btn-primary/.btn-outline/.eyebrow/.section-title/.container-wide helpers) are defined once in `src/styles.css`; components use semantic classes, never hardcoded colors.
- Изображения лежат в `public/images/` (хэш-имена .jpg, gallery, logo/, banner-*); используются абсолютные пути `/images/...`.
- Fonts: free Montserrat via Google Fonts <link> in `src/routes/__root.tsx` (original Gotham Pro is commercial).
- Every route sets `staticData.sitemap`; `/sitemap.xml` (src/routes/sitemap[.]xml.ts) builds from router + projects/articles data, so new pages appear automatically.
