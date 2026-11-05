import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const PER_PAGE_DESKTOP = 3;
const PER_PAGE_MOBILE = 1;
// Брейкпоинт Tailwind md — при ширине меньше одна фотография за раз.
const DESKTOP_QUERY = "(min-width: 768px)";

/** Сколько фотографий показывать за раз: зависит от ширины окна. */
function usePerPage() {
  // Начальное значение как при SSR, чтобы не было mismatch при гидратации.
  const [perPage, setPerPage] = useState(PER_PAGE_DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setPerPage(mq.matches ? PER_PAGE_DESKTOP : PER_PAGE_MOBILE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return perPage;
}

/**
 * Постраничная галерея: три фотографии за раз на десктопе, одна на мобильном,
 * все одинакового размера. Стрелки — по краям фотографий.
 * Клик по фото открывает лайтбокс, в котором листается вся коллекция.
 */
export function WorksGallery({ images, title }: { images: string[]; title: string }) {
  const perPage = usePerPage();
  const pages = Math.max(1, Math.ceil(images.length / perPage));
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setPage(0);
  }, [images.length]);

  // Смена числа фото на страницу (поворот экрана) не должна оставлять за границей.
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  const visible = images.slice(page * perPage, page * perPage + perPage);

  // Стрелки по краям сетки листают страницы по кругу.
  const step = (delta: number) => setPage((p) => (p + delta + pages) % pages);
  // Стрелки в лайтбоксе листают все фотографии подряд.
  const pick = (n: number) => {
    if (selected === null) return;
    const next = selected + n;
    if (next < 0 || next >= images.length) return;
    setSelected(next);
    setPage(Math.floor(next / perPage));
  };

  return (
    <div className="mt-8">
      <div className="relative">
        {/* Смена страницы: key={page} перезапускает animate-fade-up */}
        <div key={page} className="grid animate-fade-up gap-5 md:grid-cols-3">
          {visible.map((src, i) => {
            const n = page * perPage + i;
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

        {/* Стрелки — по краям фотографий */}
        <button
          type="button"
          aria-label="Предыдущие фото"
          onClick={() => step(-1)}
          className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border-0 bg-background/85 text-foreground shadow-lg backdrop-blur transition-all hover:bg-background hover:text-primary sm:left-3 sm:size-12"
        >
          <ChevronLeft className="size-5 sm:size-6" />
        </button>
        <button
          type="button"
          aria-label="Следующие фото"
          onClick={() => step(1)}
          className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border-0 bg-background/85 text-foreground shadow-lg backdrop-blur transition-all hover:bg-background hover:text-primary sm:right-3 sm:size-12"
        >
          <ChevronRight className="size-5 sm:size-6" />
        </button>
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
                  onClick={() => pick(-1)}
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
                  onClick={() => pick(1)}
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
