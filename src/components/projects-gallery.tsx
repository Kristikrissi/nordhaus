import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OptimizedImg, preloadVariant } from "@/components/optimized-img";

/**
 * Галерея фотографий проекта с лайтбоксом.
 * Все фотографии идут единой сеткой одного размера, без крупной обложки —
 * так витрина проекта совпадает с сеткой каталога.
 * Любая фотография открывается в лайтбоксе, стрелки листают весь массив.
 */
export function ProjectsGallery({
  images,
  title,
  className = "",
}: {
  images: string[];
  title: string;
  className?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  // Переход по стрелкам в лайтбоксе не должен показывать пустой кадр:
  // соседние фотографии предзагружаются в полном web-размере.
  useEffect(() => {
    if (selected === null || images.length < 2) return;
    preloadVariant(images[(selected + 1) % images.length]!, 1280);
    preloadVariant(images[(selected + images.length - 1) % images.length]!, 1280);
  }, [selected, images]);

  return (
    <>
      <div className={`${className} grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3`.trim()}>
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setSelected(i)}
            aria-label={`${title} — фото ${i + 1}`}
            className="project-link cursor-pointer overflow-hidden rounded-lg border border-transparent p-0 transition-colors hover:border-primary/40"
          >
            <OptimizedImg
              src={src}
              w={640}
              alt={`${title} — фото ${i + 1}`}
              className="project-photo"
            />
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-5xl">
          <DialogTitle>{title}</DialogTitle>
          {selected !== null && (
            <div className="relative">
              <OptimizedImg
                key={selected}
                src={images[selected]!}
                w={1280}
                alt={title}
                className="max-h-[70svh] w-full object-contain"
              />
              <Button
                variant="circle"
                size="icon"
                aria-label="Предыдущее фото"
                onClick={() => setSelected((selected + images.length - 1) % images.length)}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-secondary/90 backdrop-blur sm:left-2"
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="circle"
                size="icon"
                aria-label="Следующее фото"
                onClick={() => setSelected((selected + 1) % images.length)}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-secondary/90 backdrop-blur sm:right-2"
              >
                <ArrowRight />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}