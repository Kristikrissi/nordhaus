import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const PER_PAGE = 3;

/**
 * Постраничная галерея: по три фотографии за раз, все одинакового размера.
 * Клик по фото открывает лайтбокс, в котором листается вся коллекция.
 */
export function WorksGallery({ images, title }: { images: string[]; title: string }) {
  const pages = Math.max(1, Math.ceil(images.length / PER_PAGE));
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setPage(0);
  }, [images.length]);

  const clamp = (n: number) => Math.max(0, Math.min(pages - 1, n));
  const visible = images.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  // Индикатор страниц: крайние + окрестности текущей, разрывы — многоточием.
  const marks: (number | null)[] = [];
  for (let i = 0; i < pages; i++) {
    const show = i === 0 || i === pages - 1 || Math.abs(i - page) <= 1;
    if (show) {
      marks.push(i);
    } else if (marks.length && marks[marks.length - 1] !== null) {
      marks.push(null);
    }
  }

  const step = (delta: number) => {
    if (selected === null) return;
    const next = selected + delta;
    if (next < 0 || next >= images.length) return;
    setSelected(next);
    setPage(Math.floor(next / PER_PAGE));
  };

  return (
    <div className="mt-8">
      {/* Смена страницы: key={page} перезапускает animate-fade-up */}
      <div key={page} className="grid animate-fade-up gap-5 md:grid-cols-3">
        {visible.map((src, i) => {
          const n = page * PER_PAGE + i;
          return (
            <button
              type="button"
              key={src}
              onClick={() => setSelected(n)}
              aria-label={`${title} — фото ${n + 1}`}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-secondary transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <img
                src={src}
                alt={`${title} — фото ${n + 1}`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <button
          type="button"
          aria-label="Предыдущие фото"
          onClick={() => setPage(clamp(page - 1))}
          disabled={page === 0}
          className="grid size-10 place-items-center rounded-full border border-border bg-background text-foreground transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {marks.map((m, i) =>
            m === null ? (
              <span key={`gap-${i}`} className="text-xs text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={m}
                type="button"
                aria-label={`Страница ${m + 1}`}
                aria-current={m === page}
                onClick={() => setPage(m)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  m === page ? "w-8 bg-primary" : "w-3 bg-border hover:bg-primary/50"
                }`}
              />
            )
          )}
        </div>

        <button
          type="button"
          aria-label="Следующие фото"
          onClick={() => setPage(clamp(page + 1))}
          disabled={page === pages - 1}
          className="grid size-10 place-items-center rounded-full border border-border bg-background text-foreground transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>

        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {page + 1} / {pages} · всего {images.length} фото
        </span>
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogTitle>{title}</DialogTitle>
          {selected !== null && (
            <>
              <img
                src={images[selected]}
                alt={`${title} — фото ${selected + 1}`}
                className="max-h-[70svh] w-full object-contain"
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Предыдущее фото"
                  onClick={() => step(-1)}
                  disabled={selected === 0}
                  className="grid size-10 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {selected + 1} / {images.length}
                </span>
                <button
                  type="button"
                  aria-label="Следующее фото"
                  onClick={() => step(1)}
                  disabled={selected === images.length - 1}
                  className="grid size-10 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
