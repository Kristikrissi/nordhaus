import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Галерея фотографий проекта с лайтбоксом.
 * По умолчанию первый элемент показывается крупной обложкой, остальные — сеткой.
 * С uniform={true} все фотографии идут одной сеткой одинакового размера.
 * Любая фотография открывается в лайтбоксе, стрелки листают весь массив.
 */
export function ProjectsGallery({
  images,
  title,
  uniform = false,
}: {
  images: string[];
  title: string;
  uniform?: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [cover, ...rest] = images;
  const showCover = !uniform && cover !== undefined;
  const gridImages = showCover ? rest : images;
  const offset = showCover ? 1 : 0;

  return (
    <>
      {showCover && cover && (
        <button
          type="button"
          onClick={() => setSelected(0)}
          aria-label={`${title} — фото 1`}
          className="block w-full cursor-pointer overflow-hidden rounded-lg"
        >
          <img src={cover} alt={title} className="detail-cover" />
        </button>
      )}

      <div className={`${showCover ? "mt-8" : ""} grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
        {gridImages.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setSelected(i + offset)}
            aria-label={`${title} — фото ${i + offset + 1}`}
            className="cursor-pointer overflow-hidden rounded-lg border border-transparent p-0 transition-colors hover:border-primary/40"
          >
            <img
              src={src}
              alt={`${title} — фото ${i + offset + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-5xl">
          <DialogTitle>{title}</DialogTitle>
          {selected !== null && (
            <div className="relative">
              <img src={images[selected]} alt={title} className="max-h-[70svh] w-full object-contain" />
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