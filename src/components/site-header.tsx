import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Paintbrush } from "lucide-react";
import { site, categories, finishing } from "@/lib/site-data";
import { CallbackForm } from "@/components/callback-form";

const companyMenu = [
  { label: "О компании", to: "/company" as const, hash: undefined },
  { label: "Вакансии", to: "/company" as const, hash: "vacancy" as const },
];

/**
 * Пункт «Внутренняя и внешняя отделка» — это услуга, а не проект дома,
 * поэтому он отделён от категорий и помечен акцентным бейджем.
 */
function FinishingMenuItem({ onClick = () => {} }: { onClick?: () => void }) {
  return (
    <Link
      to="/otdelka"
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors hover:bg-accent/10"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Paintbrush className="size-4" />
      </span>
      <span className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-foreground">{finishing.menuLabel}</span>
        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-foreground">
          Услуги
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener("open-callback-modal", open);
    return () => window.removeEventListener("open-callback-modal", open);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-wide pt-3">
          <div className="flex items-center gap-4 rounded-2xl bg-background/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur sm:px-6">
            <Link to="/" className="shrink-0">
              <img src={site.logoDark} alt="NORDHAUS — дома и бани из дерева" className="h-10 w-auto sm:h-11" />
            </Link>

            <nav className="ml-6 hidden items-center gap-6 lg:flex">
              <div className="group relative">
                <Link
                  to="/projects"
                  className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-foreground transition-colors hover:text-primary"
                >
                  Проекты
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-0.5 opacity-60">
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-96 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-border bg-popover p-2 shadow-xl">
                    <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Проекты из бруса и бревна
                    </p>
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to="/projects"
                        search={{ category: c.slug }}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {c.title}
                      </Link>
                    ))}
                    <div className="my-2 h-px bg-border" />
                    <FinishingMenuItem />
                  </div>
                </div>
              </div>
              <Link
                to="/news"
                className="text-[13px] font-semibold uppercase tracking-[0.06em] text-foreground transition-colors hover:text-primary"
              >
                Новости
              </Link>
              <div className="group relative">
                <Link
                  to="/company"
                  className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-foreground transition-colors hover:text-primary"
                >
                  Компания
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-0.5 opacity-60">
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-56 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-border bg-popover p-2 shadow-xl">
                    {companyMenu.map((m) => (
                      <Link
                        key={m.label}
                        to={m.to}
                        {...(m.hash ? { hash: m.hash } : {})}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                to="/contacts"
                className="text-[13px] font-semibold uppercase tracking-[0.06em] text-foreground transition-colors hover:text-primary"
              >
                Контакты
              </Link>
            </nav>

            <div className="ml-auto flex items-center gap-3 sm:gap-5">
              <a
                href={site.phoneHref}
                className="hidden text-sm font-semibold text-foreground transition-colors hover:text-primary md:block"
              >
                {site.phone}
              </a>
              <button
                type="button"
                aria-label="Поиск по сайту"
                className="hidden text-foreground/70 transition-colors hover:text-primary sm:block"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-primary hidden !px-6 !py-2.5 sm:inline-flex">
                Заказать звонок
              </button>
              <button
                type="button"
                aria-label="Меню"
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  {mobileOpen ? (
                    <path d="M2 2l14 10M16 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  ) : (
                    <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="mt-2 rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur lg:hidden">
              <nav className="flex flex-col gap-1">
                <Link to="/projects" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold uppercase hover:bg-secondary">
                  Проекты
                </Link>
                {categories.map((c) => (
                  <Link key={c.slug} to="/projects" search={{ category: c.slug }} onClick={() => setMobileOpen(false)} className="rounded-lg px-6 py-2 text-sm text-muted-foreground hover:bg-secondary">
                    {c.title}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <FinishingMenuItem onClick={() => setMobileOpen(false)} />
                <Link to="/news" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold uppercase hover:bg-secondary">
                  Новости
                </Link>
                <Link to="/company" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold uppercase hover:bg-secondary">
                  Компания
                </Link>
                <Link to="/contacts" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold uppercase hover:bg-secondary">
                  Контакты
                </Link>
              </nav>
              <a href={site.phoneHref} className="mt-3 block px-3 text-sm font-semibold">
                {site.phone}
              </a>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-primary mt-3 w-full">
                Заказать звонок
              </button>
            </div>
          )}
        </div>
      </header>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase">Заказать звонок</h3>
                <p className="mt-1 text-sm text-muted-foreground">Мы перезвоним вам, чтобы уточнить детали и обсудить ваши пожелания.</p>
              </div>
              <button type="button" aria-label="Закрыть" onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <CallbackForm compact />
          </div>
        </div>
      )}
    </>
  );
}
