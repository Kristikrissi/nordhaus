import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Галерея фотографий проекта с лайтбоксом.
 * Первый элемент массива показывается крупной обложкой, остальные — сеткой.
 * Обложка тоже открывается в лайтбоксе, стрелки листают все фотографии.
 */
export function ProjectsGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [cover, ...rest] = images;

  return (
    <>
      {cover && (
        <button
          type="button"
          onClick={() => setSelected(0)}
          aria-label={`${title} — фото 1`}
          className="block w-full cursor-pointer overflow-hidden rounded-lg"
        >
          <img src={cover} alt={title} className="detail-cover" />
        </button>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setSelected(i + 1)}
            aria-label={`${title} — фото ${i + 2}`}
            className="cursor-pointer overflow-hidden rounded-lg border border-transparent p-0 transition-colors hover:border-primary/40"
          >
            <img
              src={src}
              alt={`${title} — фото ${i + 2}`}
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
            <>
              <img src={images[selected]} alt={title} className="max-h-[70svh] w-full object-contain" />
              <div className="flex items-center justify-between">
                <Button variant="circle" size="icon" aria-label="Предыдущее фото" onClick={() => setSelected((selected + images.length - 1) % images.length)}>
                  <ArrowLeft />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {selected + 1} / {images.length}
                </span>
                <Button variant="circle" size="icon" aria-label="Следующее фото" onClick={() => setSelected((selected + 1) % images.length)}>
                  <ArrowRight />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}