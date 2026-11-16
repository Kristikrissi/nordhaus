import { projectsIntro } from "@/lib/site-data";

/**
 * Вводный блок об индивидуальном проектировании.
 * Оформлен как примечание внизу раздела «Наши объекты» — те же рамки,
 * фон и типографика, чтобы оба пояснения читались одинаково.
 * Показывается сверху в каталоге и на странице проекта, поэтому вынесен
 * в компонент — правки не приходится дублировать.
 */
export function ProjectsIntro() {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-5 sm:p-6">
      {projectsIntro.paragraphs.map((p, i) => (
        <p key={i} className={`text-sm leading-relaxed text-muted-foreground${i ? " mt-3" : ""}`}>
          {p}
        </p>
      ))}
    </div>
  );
}
