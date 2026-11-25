import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { OptimizedImg, preloadVariant } from "@/components/optimized-img";

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
 * Кнопка «Смотреть все фото» показывает сразу всю коллекцию сеткой.
 */
export function WorksGallery({ images, title }: { images: string[]; title: string }) {
  const perPage = usePerPage();
  const pages = Math.max(1, Math.ceil(images.length / perPage));
  const [page, setPage] = useState(0);
  // Диалог: открыт обзор всей коллекции или один крупный кадр.
  const [allOpen, setAllOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setPage(0);
  }, [images.length]);

  // Смена числа фото на страницу (поворот экрана) не должна оставлять за границей.
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  // Лайтбокс листается по границам списка, поэтому предзагружаем
  // предыдущий и следующий кадры в полном web-размере.
  useEffect(() => {
    if (selected === null || images.length < 2) return;
    preloadVariant(images[Math.min(selected + 1, images.length - 1)]!, 1280);
    preloadVariant(images[Math.max(selected - 1, 0)]!, 1280);
  }, [selected, images]);

  // Клавиатура в лайтбоксе: ← → листают кадры, Esc закрывает (обрабатывает Dialog).
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      setSelected((cur) => {
        if (cur === null) return cur;
        const next = cur + (e.key === "ArrowRight" ? 1 : -1);
        return next < 0 || next >= images.length ? cur : next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, images.length]);

  const visible = images.slice(page * perPage, page * perPage + perPage);

  // Стрелки по краям сетки листают страницы по кругу.
  const step = (delta: number) => setPage((p) => (p + delta + pages) % pages);
  // Стрелки в лайтбоксе листают все фотографии подряд.
  const pick = (delta: number) =>
    setSelected((cur) => {
      if (cur === null) return cur;
      const next = cur + delta;
      return next < 0 || next >= images.length ? cur : next;
    });

  const openAll = () => {
    setSelected(null);
    setAllOpen(true);
  };
  // Клик по кадру в обзоре открывает его крупно в том же диалоге.
  const openSingle = (n: number) => {
    setSelected(n);
    setAllOpen(true);
  };
  const closeAll = () => {
    // Постраничная сетка встаёт на страницу последнего просмотренного кадра.
    if (selected !== null) setPage(Math.floor(selected / perPage));
    setAllOpen(false);
    setSelected(null);
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Всего {images.length} фото</p>
        <button type="button" onClick={openAll} className="btn-outline">
          <Maximize2 className="size-4" />
          Смотреть все фото
        </button>
      </div>

      <div className="relative">
        {/* Смена страницы: key={page} перезапускает animate-fade-up */}
        <div key={page} className="grid animate-fade-up gap-5 md:grid-cols-3">
          {visible.map((src, i) => {
            const n = page * perPage + i;
            return (
              <button
                type="button"
                key={src}
                onClick={() => openSingle(n)}
                aria-label={`${title} — фото ${n + 1}`}
                className="group cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-secondary transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <OptimizedImg
                  src={src}
                  w={640}
                  alt={`${title} — фото ${n + 1}`}
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

      <Dialog open={allOpen} onOpenChange={(o) => (o ? setAllOpen(true) : closeAll())}>
        <DialogContent className={selected === null ? "max-w-6xl" : "max-w-4xl"}>
          <DialogTitle className="pr-8">
            {selected === null ? `${title} — все фото` : `${title} — фото ${selected + 1}`}
          </DialogTitle>

          {selected === null ? (
            /* Обзор: вся коллекция сразу, прокручивается внутри диалога. */
            <div className="max-h-[68svh] overflow-y-auto overscroll-contain pr-1">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((src, n) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => openSingle(n)}
                    aria-label={`${title} — фото ${n + 1}`}
                    className="group cursor-pointer overflow-hidden rounded-lg border border-border/50 bg-secondary transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <OptimizedImg
                      src={src}
                      w={320}
                      alt={`${title} — фото ${n + 1}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative">
              <OptimizedImg
                key={selected}
                src={images[selected]!}
                w={1280}
                alt={`${title} — фото ${selected + 1}`}
                className="max-h-[70svh] w-full object-contain"
              />
              {/* Переход по стрелкам: соседние кадры уже в кэше. */}
              <button
                type="button"
                aria-label="Предыдущее фото"
                onClick={() => pick(-1)}
                disabled={selected === 0}
                className="absolute left-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30 sm:left-2"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Следующее фото"
                onClick={() => pick(1)}
                disabled={selected === images.length - 1}
                className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-30 sm:right-2"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}

          {selected !== null && (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="size-4" />
                Все фото
              </button>
              <span className="text-sm tabular-nums text-muted-foreground">
                {selected + 1} / {images.length}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
