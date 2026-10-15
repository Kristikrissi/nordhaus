import { Link } from "@tanstack/react-router";
import { site, socials, categories, offices } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <img src={site.logoDark} alt="NORDHAUS" className="h-12 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Строим дома премиум-класса из клееного бруса и СЛТ (CLT) панелей по индивидуальным проектам в Москве и области с 2003 года.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Проекты</p>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/projects" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/news" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Новости
              </Link>
            </li>
            <li>
              <Link to="/company" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                О компании
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Контакты</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={site.phoneHref} className="text-sm font-semibold transition-colors hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {site.email}
              </a>
            </li>
            {offices.map((o) => (
              <li key={o.region} className="text-sm text-muted-foreground">
                {o.address}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Мы в соцсетях</p>
          <ul className="mt-4 space-y-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn-primary mt-6" onClick={() => window.dispatchEvent(new CustomEvent("open-callback-modal"))}>
            Заказать звонок
          </button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-wide flex flex-col gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2003–2026 ООО «Норд Хаус» · ИНН 7729780129 · ОГРН 1147746946126</span>
          <span>{offices[0]?.address}</span>
        </div>
      </div>
    </footer>
  );
}
